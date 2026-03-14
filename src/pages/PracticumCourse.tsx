import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Loader2, BookOpen, Clock, CheckCircle2, Lock } from "lucide-react";
import { useCourseBySlug, useCommonBaseStatus, type PracticumStep } from "@/hooks/usePracticum";
import { getIconByName } from "@/utils/methods";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

function getDifficultyColor(d: string) {
  switch (d) {
    case "easy":
      return "bg-green-500/10 text-green-600 border-green-500/30";
    case "medium":
      return "bg-yellow-500/10 text-yellow-600 border-yellow-500/30";
    case "hard":
      return "bg-red-500/10 text-red-600 border-red-500/30";
    default:
      return "bg-muted text-muted-foreground";
  }
}

function getDifficultyLabel(d: string) {
  switch (d) {
    case "easy":
      return "Начальный";
    case "medium":
      return "Средний";
    case "hard":
      return "Продвинутый";
    default:
      return d;
  }
}

const PracticumCoursePage = () => {
  const { courseSlug } = useParams<{ courseSlug: string }>();
  const navigate = useNavigate();
  const { course, loading, error } = useCourseBySlug(courseSlug);
  const { user } = useAuth();
  const { toast } = useToast();
  const { baseCourse, isBaseCompleted, loading: baseLoading } = useCommonBaseStatus(user?.id);

  // Steps for all lessons + user progress for lesson locking
  const [stepsByLesson, setStepsByLesson] = useState<Map<string, PracticumStep[]>>(new Map());
  const [completedStepIds, setCompletedStepIds] = useState<Set<string>>(new Set());
  const [progressLoaded, setProgressLoaded] = useState(false);

  const loadStepsAndProgress = useCallback(async () => {
    if (!course || course.lessons.length === 0) {
      setProgressLoaded(true);
      return;
    }

    try {
      const lessonIds = course.lessons.map((l) => l.id);
      const { data: stepsData } = await supabase
        .from("practicum_steps")
        .select("*")
        .in("lesson_id", lessonIds)
        .order("sort_order", { ascending: true });

      const map = new Map<string, PracticumStep[]>();
      (stepsData || []).forEach((step) => {
        const arr = map.get(step.lesson_id) || [];
        arr.push(step);
        map.set(step.lesson_id, arr);
      });
      setStepsByLesson(map);

      if (user) {
        const { data: progressData } = await supabase
          .from("user_progress")
          .select("task_id, completed")
          .eq("user_id", user.id)
          .like("task_id", "step_%");

        const completed = new Set<string>();
        (progressData || []).forEach((r) => {
          if (r.completed) {
            const stepId = r.task_id.replace("step_", "");
            completed.add(stepId);
          }
        });
        setCompletedStepIds(completed);
      }
    } catch (err) {
      console.error("Failed to load course progress:", err);
    } finally {
      setProgressLoaded(true);
    }
  }, [course, user]);

  useEffect(() => {
    if (course) loadStepsAndProgress();
  }, [course, loadStepsAndProgress]);

  const isLessonCompleted = useCallback(
    (lessonId: string) => {
      const steps = stepsByLesson.get(lessonId) || [];
      const interactive = steps.filter((s) => s.step_type === "task" || s.step_type === "quiz");
      if (interactive.length === 0) return true;
      return interactive.every((s) => completedStepIds.has(s.id));
    },
    [stepsByLesson, completedStepIds]
  );

  const unlockedLessonIds = useMemo(() => {
    if (!course) return new Set<string>();
    const ids = new Set<string>();
    for (const l of course.lessons) {
      ids.add(l.id);
      if (!isLessonCompleted(l.id)) break;
    }
    return ids;
  }, [course, isLessonCompleted]);

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

  if (loading || !progressLoaded || baseLoading) {
    return (
      <div className="min-h-screen bg-transparent">
        <Navigation />
        <section className="pt-24 pb-12 px-4">
          <div className="container mx-auto max-w-4xl flex items-center justify-center min-h-[50vh]">
            <div className="text-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
              <p className="text-muted-foreground">Загрузка курса...</p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-transparent">
        <Navigation />
        <section className="pt-24 pb-12 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <p className="text-destructive text-lg mb-4">
              {error?.message || "Курс не найден"}
            </p>
            <Link to="/practicum">
              <Button>Вернуться к практикумам</Button>
            </Link>
          </div>
        </section>
      </div>
    );
  }

  const Icon = getIconByName(course.icon_name);
  const firstLesson = course.lessons.length > 0 ? course.lessons[0] : null;
  const allLessonsCompleted =
    course.lessons.length > 0 && course.lessons.every((l) => isLessonCompleted(l.id));
  const anyLessonCompleted =
    course.lessons.length > 0 && course.lessons.some((l) => isLessonCompleted(l.id));
  const nextLessonToOpen =
    course.lessons.find((l) => !isLessonCompleted(l.id) && unlockedLessonIds.has(l.id)) ||
    firstLesson;

  return (
    <div className="min-h-screen bg-transparent">
      <Navigation />

      <section className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link
            to="/practicum"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Назад к практикумам
          </Link>

          <div className="text-center space-y-4 mb-12">
            <div
              className="inline-flex h-16 w-16 rounded-2xl items-center justify-center shadow-lg"
              style={{ backgroundColor: course.color + "20" }}
            >
              <Icon className="h-8 w-8" style={{ color: course.color }} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground font-heading">
              {course.title}
            </h1>
            {course.description && (
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {course.description}
              </p>
            )}
            <div className="flex items-center justify-center gap-3 pt-2">
              <Badge className={getDifficultyColor(course.difficulty)}>
                {getDifficultyLabel(course.difficulty)}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {course.estimated_duration}
              </Badge>
              <Badge variant="outline">
                {course.lessons.length} уроков
              </Badge>
            </div>
          </div>

          <div className="space-y-4">
            {course.lessons.map((lesson, idx) => {
              const isUnlocked = unlockedLessonIds.has(lesson.id);
              const completed = isLessonCompleted(lesson.id);

              if (!isUnlocked) {
                return (
                  <Card
                    key={lesson.id}
                    className="glass-panel border-white/40 opacity-60 cursor-not-allowed"
                  >
                    <CardContent className="py-5 px-6">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                          <Lock className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-muted-foreground font-heading">
                            {lesson.title}
                          </h3>
                          <p className="text-sm text-muted-foreground/60 mt-1">
                            Завершите предыдущий урок
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              }

              return (
                <Link key={lesson.id} to={`/practicum/${courseSlug}/${lesson.slug}`}>
                  <Card
                    className={`glass-panel transition-all cursor-pointer ${
                      completed
                        ? "border-green-500 bg-green-500/10 hover:bg-green-500/15 hover:border-green-500 hover:shadow-lg"
                        : "border-white/40 hover:border-primary hover:shadow-lg"
                    }`}
                  >
                    <CardContent className="py-5 px-6">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          {completed ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          ) : (
                            <span className="text-sm font-bold text-primary">{idx + 1}</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground font-heading">{lesson.title}</h3>
                          {lesson.description && (
                            <p className="text-sm text-muted-foreground mt-1 truncate">
                              {lesson.description}
                            </p>
                          )}
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          {nextLessonToOpen && (
            <div className="text-center mt-8">
              <Link to={`/practicum/${courseSlug}/${nextLessonToOpen.slug}`}>
                <Button size="lg" className="gap-2">
                  <BookOpen className="h-5 w-5" />
                  {allLessonsCompleted
                    ? "Просмотреть курс"
                    : anyLessonCompleted
                    ? "Продолжить курс"
                    : "Начать курс"}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default PracticumCoursePage;
