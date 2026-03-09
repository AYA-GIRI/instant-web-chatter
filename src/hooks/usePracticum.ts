import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type PracticumCourse = Tables<"practicum_courses">;
export type PracticumLesson = Tables<"practicum_lessons">;
export type PracticumStep = Tables<"practicum_steps">;

export type LessonWithSteps = PracticumLesson & {
  steps: PracticumStep[];
};

export type CourseWithLessons = PracticumCourse & {
  lessons: PracticumLesson[];
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
