import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, Lock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useAiProvider } from "@/hooks/useAiProvider";
import { AiProviderSelect } from "@/components/AiProviderSelect";
import {
  useLessonWithSteps,
  useCommonBaseStatus,
  type PracticumStep,
  type LessonWithSteps,
} from "@/hooks/usePracticum";
import { TheoryStep } from "@/components/practicum/TheoryStep";
import { InfoStep } from "@/components/practicum/InfoStep";
import { QuizStep } from "@/components/practicum/QuizStep";
import { TaskStep } from "@/components/practicum/TaskStep";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type StepProgress = {
  completed: boolean;
  notes: string;
};

const PracticumLessonPage = () => {
  const { courseSlug, lessonSlug } = useParams<{ courseSlug: string; lessonSlug: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { provider, setProvider } = useAiProvider();
  const { toast } = useToast();
  const { lesson, course, allLessons, loading, error } = useLessonWithSteps(courseSlug, lessonSlug);
  const { baseCourse, isBaseCompleted, loading: baseLoading } = useCommonBaseStatus(user?.id);

  const [stepProgress, setStepProgress] = useState<Record<string, StepProgress>>({});
  const [progressLoading, setProgressLoading] = useState(true);

  const loadProgress = useCallback(async () => {
    if (!user || !lesson) {
      setProgressLoading(false);
      return;
    }

    try {
      const { data, error: fetchErr } = await supabase
        .from("user_progress")
        .select("task_id, completed, notes")
        .eq("user_id", user.id)
        .like("task_id", `step_%`);

      if (fetchErr) throw fetchErr;

      const progress: Record<string, StepProgress> = {};
      (data || []).forEach((record) => {
        progress[record.task_id] = {
          completed: record.completed || false,
          notes: record.notes || "",
        };
      });
      setStepProgress(progress);
    } catch (err) {
      console.error("Failed to load step progress:", err);
    } finally {
      setProgressLoading(false);
    }
  }, [user, lesson]);

  useEffect(() => {
    if (lesson) loadProgress();
  }, [lesson, loadProgress]);

  const saveStepProgress = useCallback(
    async (stepId: string, notes: string, completed: boolean) => {
      if (!user) return;

      const taskId = `step_${stepId}`;
      setStepProgress((prev) => ({
        ...prev,
        [taskId]: { completed, notes },
      }));

      try {
        const { error: upsertErr } = await supabase
          .from("user_progress")
          .upsert(
            { user_id: user.id, task_id: taskId, notes, completed },
            { onConflict: "user_id,task_id" }
          );

        if (upsertErr) throw upsertErr;
      } catch (err) {
        console.error("Failed to save step progress:", err);
        toast({
          title: "Ошибка сохранения",
          description: "Не удалось сохранить прогресс",
          variant: "destructive",
        });
      }
    },
    [user, toast]
  );

  const isStepCompleted = (stepId: string) => stepProgress[`step_${stepId}`]?.completed || false;
  const getStepNotes = (stepId: string) => stepProgress[`step_${stepId}`]?.notes || "";

  // Check if a lesson has all its interactive steps completed
  const isLessonCompleted = useCallback(
    (lessonData: LessonWithSteps) => {
      const interactive = lessonData.steps.filter(
        (s) => s.step_type === "task" || s.step_type === "quiz"
      );
      if (interactive.length === 0) return true;
      return interactive.every((s) => isStepCompleted(s.id));
    },
    [stepProgress]
  );

  // Determine which lessons are unlocked (sequential gating)
  const unlockedLessonIds = useMemo(() => {
    const ids = new Set<string>();
    for (const l of allLessons) {
      ids.add(l.id);
      if (!isLessonCompleted(l)) break;
    }
    return ids;
  }, [allLessons, isLessonCompleted]);

  const currentLessonIndex = allLessons.findIndex((l) => l.slug === lessonSlug);
  const prevLesson = currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;
  const nextLesson =
    currentLessonIndex < allLessons.length - 1 ? allLessons[currentLessonIndex + 1] : null;

  const interactiveSteps =
    lesson?.steps.filter((s) => s.step_type === "task" || s.step_type === "quiz") || [];
  const completedCount = interactiveSteps.filter((s) => isStepCompleted(s.id)).length;
  const totalInteractive = interactiveSteps.length;

  // Progressive disclosure within current lesson
  const unlockedStepIds = useMemo(() => {
    if (!lesson) return new Set<string>();
    const unlocked = new Set<string>();
    for (const step of lesson.steps) {
      unlocked.add(step.id);
      const isInteractive = step.step_type === "task" || step.step_type === "quiz";
      if (isInteractive && !isStepCompleted(step.id)) break;
    }
    return unlocked;
  }, [lesson, stepProgress]);

  // Redirect to first unlocked lesson if this one is locked
  useEffect(() => {
    if (!progressLoading && lesson && !unlockedLessonIds.has(lesson.id)) {
      const firstUnlocked = allLessons.find((l) => unlockedLessonIds.has(l.id));
      if (firstUnlocked && courseSlug) {
        toast({
          title: "Урок заблокирован",
          description: "Завершите предыдущие уроки, чтобы продолжить",
        });
        navigate(`/practicum/${courseSlug}/${firstUnlocked.slug}`, { replace: true });
      }
    }
  }, [progressLoading, lesson, unlockedLessonIds, allLessons, courseSlug, navigate, toast]);

  // Глобальный gating по общему базовому курсу
  useEffect(() => {
    if (!course || !courseSlug || baseLoading) return;
    if (!baseCourse || isBaseCompleted) return;
    if (course.id === baseCourse.id) return;

    toast({
      title: "Сначала общий базовый курс",
      description: "Вы будете перенаправлены на обязательный базовый курс.",
    });
    navigate(`/practicum/${baseCourse.slug}`, { replace: true });
  }, [course, courseSlug, baseCourse, isBaseCompleted, baseLoading, navigate, toast]);

  const renderStep = (step: PracticumStep) => {
    switch (step.step_type) {
      case "theory":
        return <TheoryStep key={step.id} step={step} />;
      case "info":
        return <InfoStep key={step.id} step={step} />;
      case "quiz":
        return (
          <QuizStep
            key={step.id}
            step={step}
            isCompleted={isStepCompleted(step.id)}
            onComplete={() => saveStepProgress(step.id, "", true)}
          />
        );
      case "task":
        return (
          <TaskStep
            key={step.id}
            step={step}
            isCompleted={isStepCompleted(step.id)}
            savedNotes={getStepNotes(step.id)}
            onComplete={(notes) => saveStepProgress(step.id, notes, true)}
          />
        );
      default:
        return null;
    }
  };

  if (loading || progressLoading || baseLoading) {
    return (
      <div className="min-h-screen bg-transparent">
        <Navigation />
        <section className="pt-24 pb-12 px-4">
          <div className="container mx-auto max-w-4xl flex items-center justify-center min-h-[50vh]">
            <div className="text-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
              <p className="text-muted-foreground">Загрузка урока...</p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (error || !lesson || !course) {
    return (
      <div className="min-h-screen bg-transparent">
        <Navigation />
        <section className="pt-24 pb-12 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <p className="text-destructive text-lg mb-4">
              {error?.message || "Урок не найден"}
            </p>
            <Link to="/practicum">
              <Button>Вернуться к практикумам</Button>
            </Link>
          </div>
        </section>
      </div>
    );
  }

  const lockedCount = lesson.steps.length - unlockedStepIds.size;

  return (
    <div className="min-h-screen bg-transparent">
      <Navigation />

      {/* Sticky progress bar */}
      {totalInteractive > 0 && (
        <div className="fixed top-16 left-0 right-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="container mx-auto max-w-5xl px-4 py-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground truncate mr-4">
                {course.title} / {lesson.title}
              </span>
              <span className="text-xs text-muted-foreground flex-shrink-0">
                {completedCount} / {totalInteractive}
              </span>
            </div>
            <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all duration-500"
                style={{ width: `${(completedCount / totalInteractive) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      <section className={`pb-12 px-4 ${totalInteractive > 0 ? "pt-32" : "pt-24"}`}>
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="lg:sticky lg:top-32 space-y-4">
                <Link
                  to={`/practicum/${courseSlug}`}
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {course.title}
                </Link>

                <nav className="space-y-1">
                  {allLessons.map((l, idx) => {
                    const isCurrent = l.slug === lessonSlug;
                    const completed = isLessonCompleted(l);
                    const isUnlocked = unlockedLessonIds.has(l.id);

                    if (!isUnlocked) {
                      return (
                        <div
                          key={l.id}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground/50 cursor-not-allowed"
                        >
                          <span className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-border/50 flex items-center justify-center text-xs">
                            <Lock className="h-3 w-3" />
                          </span>
                          <span className="truncate">{l.title}</span>
                        </div>
                      );
                    }

                    return (
                      <Link
                        key={l.id}
                        to={`/practicum/${courseSlug}/${l.slug}`}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                          isCurrent
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                        }`}
                      >
                        <span className="flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs">
                          {completed ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          ) : (
                            idx + 1
                          )}
                        </span>
                        <span className="truncate">{l.title}</span>
                      </Link>
                    );
                  })}
                </nav>

                <div className="pt-4 border-t border-border">
                  <span className="text-xs text-muted-foreground block mb-2">AI-провайдер:</span>
                  <AiProviderSelect value={provider} onChange={setProvider} compact />
                </div>
              </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 min-w-0">
              {!user && (
                <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <p className="text-sm text-yellow-700 dark:text-yellow-400">
                    Вы не авторизованы. Ваш прогресс не будет сохранен.{" "}
                    <Link to="/login" className="underline hover:no-underline font-medium">
                      Войдите
                    </Link>
                    , чтобы сохранять результаты.
                  </p>
                </div>
              )}

              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-6 flex-wrap">
                <Link to="/practicum" className="hover:text-foreground transition-colors">
                  Практикум
                </Link>
                <ChevronRight className="h-4 w-4 flex-shrink-0" />
                <Link
                  to={`/practicum/${courseSlug}`}
                  className="hover:text-foreground transition-colors"
                >
                  {course.title}
                </Link>
                <ChevronRight className="h-4 w-4 flex-shrink-0" />
                <span className="text-foreground font-medium">{lesson.title}</span>
              </div>

              <div className="space-y-2">
                {lesson.steps.map((step) => {
                  if (unlockedStepIds.has(step.id)) {
                    return renderStep(step);
                  }
                  return null;
                })}
              </div>

              {lockedCount > 0 && (
                <div className="mt-8 p-6 border border-dashed border-border rounded-xl text-center">
                  <Lock className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground font-medium">
                    Выполните задание выше, чтобы продолжить
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Ещё {lockedCount} {lockedCount === 1 ? "блок" : lockedCount < 5 ? "блока" : "блоков"} впереди
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between mt-12 pt-6 border-t border-border">
                {prevLesson && unlockedLessonIds.has(prevLesson.id) ? (
                  <Link to={`/practicum/${courseSlug}/${prevLesson.slug}`}>
                    <Button variant="outline" className="gap-2">
                      <ArrowLeft className="h-4 w-4" />
                      <span className="hidden sm:inline">{prevLesson.title}</span>
                      <span className="sm:hidden">Назад</span>
                    </Button>
                  </Link>
                ) : (
                  <div />
                )}
                {nextLesson && unlockedLessonIds.has(nextLesson.id) ? (
                  <Link to={`/practicum/${courseSlug}/${nextLesson.slug}`}>
                    <Button className="gap-2">
                      <span className="hidden sm:inline">{nextLesson.title}</span>
                      <span className="sm:hidden">Далее</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                ) : !nextLesson ? (
                  <Link to={`/practicum/${courseSlug}`}>
                    <Button className="gap-2">
                      Завершить курс
                      <CheckCircle2 className="h-4 w-4" />
                    </Button>
                  </Link>
                ) : (
                  <Button className="gap-2" disabled>
                    <Lock className="h-4 w-4" />
                    {nextLesson.title}
                  </Button>
                )}
              </div>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PracticumLessonPage;
