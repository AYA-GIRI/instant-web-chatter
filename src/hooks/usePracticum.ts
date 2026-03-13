import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type PracticumCourse = Tables<"practicum_courses">;
export type PracticumLesson = Tables<"practicum_lessons">;
export type PracticumStep = Tables<"practicum_steps">;

export type CourseCategory = "common_base" | "role_track" | "optional";

export type LessonWithSteps = PracticumLesson & {
  steps: PracticumStep[];
};

export type CourseWithLessons = PracticumCourse & {
  lessons: PracticumLesson[];
};

export type CommonBaseStatus = {
  baseCourse: PracticumCourse | null;
  isBaseCompleted: boolean;
  loading: boolean;
};

// -- Загрузка списка всех курсов --
export function usePracticumCourses() {
  const [courses, setCourses] = useState<PracticumCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data, error: fetchErr } = await supabase
          .from("practicum_courses")
          .select("*")
          .order("sort_order", { ascending: true });

        if (fetchErr) throw new Error(fetchErr.message);
        setCourses(data || []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return { courses, loading, error };
}

// -- Загрузка одного курса с уроками по slug --
export function useCourseBySlug(slug: string | undefined) {
  const [course, setCourse] = useState<CourseWithLessons | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    const fetchCourse = async () => {
      try {
        const { data: courseData, error: courseErr } = await supabase
          .from("practicum_courses")
          .select("*")
          .eq("slug", slug)
          .single();

        if (courseErr) throw new Error(courseErr.message);

        const { data: lessonsData, error: lessonsErr } = await supabase
          .from("practicum_lessons")
          .select("*")
          .eq("course_id", courseData.id)
          .order("sort_order", { ascending: true });

        if (lessonsErr) throw new Error(lessonsErr.message);

        setCourse({ ...courseData, lessons: lessonsData || [] });
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [slug]);

  return { course, loading, error };
}

// -- Загрузка урока со всеми шагами (и шагами всех уроков курса для прогресса) --
export function useLessonWithSteps(courseSlug: string | undefined, lessonSlug: string | undefined) {
  const [lesson, setLesson] = useState<LessonWithSteps | null>(null);
  const [course, setCourse] = useState<PracticumCourse | null>(null);
  const [allLessons, setAllLessons] = useState<LessonWithSteps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const reload = useCallback(async () => {
    if (!courseSlug || !lessonSlug) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const { data: courseData, error: courseErr } = await supabase
        .from("practicum_courses")
        .select("*")
        .eq("slug", courseSlug)
        .single();

      if (courseErr) throw new Error(courseErr.message);
      setCourse(courseData);

      const { data: lessonsData, error: lessonsErr } = await supabase
        .from("practicum_lessons")
        .select("*")
        .eq("course_id", courseData.id)
        .order("sort_order", { ascending: true });

      if (lessonsErr) throw new Error(lessonsErr.message);

      const lessonIds = (lessonsData || []).map((l) => l.id);

      // Load steps for ALL lessons in one query so we can track cross-lesson progress
      const { data: allStepsData, error: stepsErr } = await supabase
        .from("practicum_steps")
        .select("*")
        .in("lesson_id", lessonIds)
        .order("sort_order", { ascending: true });

      if (stepsErr) throw new Error(stepsErr.message);

      const stepsByLesson = new Map<string, PracticumStep[]>();
      (allStepsData || []).forEach((step) => {
        const arr = stepsByLesson.get(step.lesson_id) || [];
        arr.push(step);
        stepsByLesson.set(step.lesson_id, arr);
      });

      const lessonsWithSteps: LessonWithSteps[] = (lessonsData || []).map((l) => ({
        ...l,
        steps: stepsByLesson.get(l.id) || [],
      }));

      setAllLessons(lessonsWithSteps);

      const currentLesson = lessonsWithSteps.find((l) => l.slug === lessonSlug);
      if (!currentLesson) throw new Error("Lesson not found");

      setLesson(currentLesson);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, [courseSlug, lessonSlug]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { lesson, course, allLessons, loading, error, reload };
}

// -- Общий статус обязательного базового курса --
export function useCommonBaseStatus(userId: string | null | undefined): CommonBaseStatus {
  const [baseCourse, setBaseCourse] = useState<PracticumCourse | null>(null);
  const [isBaseCompleted, setIsBaseCompleted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let cancelled = false;

    const loadStatus = async () => {
      setLoading(true);
      try {
        // Ищем опубликованный курс, помеченный как базовый
        const { data: courses, error: baseErr } = await supabase
          .from("practicum_courses")
          .select("*")
          .eq("is_published", true)
          .eq("is_common_base", true)
          .order("sort_order", { ascending: true })
          .limit(1);

        if (baseErr) throw baseErr;

        const base = (courses && courses[0]) || null;

        // Если базовый курс не найден — fail open: не блокируем доступ
        if (!base) {
          if (!cancelled) {
            setBaseCourse(null);
            setIsBaseCompleted(true);
            setLoading(false);
          }
          return;
        }

        // Если нет пользователя (теоретически не должно случаться из-за ProtectedRoute),
        // считаем, что статус неизвестен и не блокируем.
        if (!userId) {
          if (!cancelled) {
            setBaseCourse(base);
            setIsBaseCompleted(true);
            setLoading(false);
          }
          return;
        }

        // Загружаем опубликованные уроки базового курса
        const { data: lessons, error: lessonsErr } = await supabase
          .from("practicum_lessons")
          .select("*")
          .eq("course_id", base.id)
          .eq("is_published", true)
          .order("sort_order", { ascending: true });

        if (lessonsErr) throw lessonsErr;

        const lessonIds = (lessons || []).map((l) => l.id);

        if (lessonIds.length === 0) {
          // Нет опубликованных уроков — трактуем как завершённый, чтобы не блокировать
          if (!cancelled) {
            setBaseCourse(base);
            setIsBaseCompleted(true);
            setLoading(false);
          }
          return;
        }

        // Загружаем шаги всех уроков базового курса
        const { data: steps, error: stepsErr } = await supabase
          .from("practicum_steps")
          .select("*")
          .in("lesson_id", lessonIds)
          .order("sort_order", { ascending: true });

        if (stepsErr) throw stepsErr;

        const interactiveSteps = (steps || []).filter(
          (s) => s.step_type === "task" || s.step_type === "quiz"
        );

        // Если в базе нет интерактивных шагов — считаем курс завершённым
        if (interactiveSteps.length === 0) {
          if (!cancelled) {
            setBaseCourse(base);
            setIsBaseCompleted(true);
            setLoading(false);
          }
          return;
        }

        // Загружаем прогресс пользователя только по шагам практикума
        const { data: progress, error: progressErr } = await supabase
          .from("user_progress")
          .select("task_id, completed")
          .eq("user_id", userId)
          .like("task_id", "step_%");

        if (progressErr) throw progressErr;

        const completedStepIds = new Set<string>();
        (progress || []).forEach((p) => {
          if (p.completed) {
            const stepId = p.task_id.replace("step_", "");
            completedStepIds.add(stepId);
          }
        });

        const allCompleted = interactiveSteps.every((s) => completedStepIds.has(s.id));

        if (!cancelled) {
          setBaseCourse(base);
          setIsBaseCompleted(allCompleted);
          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to load common base status:", err);
        if (!cancelled) {
          // В случае ошибки не блокируем пользователя
          setBaseCourse(null);
          setIsBaseCompleted(true);
          setLoading(false);
        }
      }
    };

    loadStatus();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  return { baseCourse, isBaseCompleted, loading };
}

