import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  GraduationCap,
  BookOpen,
  Plus,
  Pencil,
  Trash2,
  Check,
  X,
  Loader2,
  ChevronUp,
  ChevronDown,
  Info,
  HelpCircle,
  PenTool,
  ArrowLeft,
  AlertTriangle,
  Lightbulb,
  FileText,
  MessageSquare,
  Eye,
  EyeOff,
} from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

// ============================================================
// Types
// ============================================================

type Course = Tables<"practicum_courses">;
type Lesson = Tables<"practicum_lessons">;
type Step = Tables<"practicum_steps">;

type ViewLevel = "courses" | "lessons" | "steps";

type CourseFormData = {
  title: string;
  slug: string;
  description: string;
  icon_name: string;
  color: string;
  difficulty: string;
  estimated_duration: string;
  lessons_count: number;
  sort_order: number;
  is_published: boolean;
  course_category: "" | "common_base" | "role_track" | "optional";
};

type LessonFormData = {
  title: string;
  slug: string;
  description: string;
  sort_order: number;
  is_published: boolean;
};

type StepFormData = {
  step_type: string;
  title: string;
  content: string;
  task_description: string;
  task_example: string;
  task_hint: string;
  task_difficulty: string;
  task_success_criteria: string[];
  quiz_question: string;
  quiz_options: string[];
  quiz_correct_index: number;
  info_style: string;
};

type DeleteTarget = {
  type: "course" | "lesson" | "step";
  id: string;
  name: string;
};

// ============================================================
// Helpers
// ============================================================

const TRANSLITERATION: Record<string, string> = {
  "a": "a", "b": "b", "v": "v", "g": "g", "d": "d", "e": "e",
  "\u0451": "yo", "\u0436": "zh", "\u0437": "z", "\u0438": "i",
  "\u0439": "y", "\u043a": "k", "\u043b": "l", "\u043c": "m",
  "\u043d": "n", "\u043e": "o", "\u043f": "p", "\u0440": "r",
  "\u0441": "s", "\u0442": "t", "\u0443": "u", "\u0444": "f",
  "\u0445": "kh", "\u0446": "ts", "\u0447": "ch", "\u0448": "sh",
  "\u0449": "shch", "\u044a": "", "\u044b": "y", "\u044c": "",
  "\u044d": "e", "\u044e": "yu", "\u044f": "ya",
  "\u0430": "a", "\u0431": "b", "\u0432": "v", "\u0433": "g",
  "\u0434": "d", "\u0435": "e",
};

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .split("")
    .map((c) => TRANSLITERATION[c] ?? c)
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getStepTypeIcon(type: string) {
  switch (type) {
    case "theory": return BookOpen;
    case "task": return PenTool;
    case "quiz": return HelpCircle;
    case "info": return Info;
    default: return FileText;
  }
}

function getStepTypeLabel(type: string) {
  switch (type) {
    case "theory": return "Теория";
    case "task": return "Задание";
    case "quiz": return "Квиз";
    case "info": return "Инфо-блок";
    default: return type;
  }
}

function getStepTypeColor(type: string) {
  switch (type) {
    case "theory": return "bg-blue-500/10 text-blue-600 border-blue-500/30";
    case "task": return "bg-green-500/10 text-green-600 border-green-500/30";
    case "quiz": return "bg-purple-500/10 text-purple-600 border-purple-500/30";
    case "info": return "bg-amber-500/10 text-amber-600 border-amber-500/30";
    default: return "bg-muted text-muted-foreground";
  }
}

function getInfoStyleIcon(style: string | null) {
  switch (style) {
    case "tip": return Lightbulb;
    case "warning": return AlertTriangle;
    case "example": return FileText;
    case "note": return MessageSquare;
    default: return Info;
  }
}

function getInfoStyleLabel(style: string) {
  switch (style) {
    case "tip": return "Совет";
    case "warning": return "Предупреждение";
    case "example": return "Пример";
    case "note": return "Заметка";
    default: return style;
  }
}

const EMPTY_COURSE: CourseFormData = {
  title: "",
  slug: "",
  description: "",
  icon_name: "BookOpen",
  color: "#6366f1",
  difficulty: "easy",
  estimated_duration: "30 мин",
  lessons_count: 0,
  sort_order: 0,
  is_published: false,
  course_category: "",
};

const EMPTY_LESSON: LessonFormData = {
  title: "",
  slug: "",
  description: "",
  sort_order: 0,
  is_published: false,
};

const EMPTY_STEP: StepFormData = {
  step_type: "theory",
  title: "",
  content: "",
  task_description: "",
  task_example: "",
  task_hint: "",
  task_difficulty: "medium",
  task_success_criteria: [],
  quiz_question: "",
  quiz_options: ["", ""],
  quiz_correct_index: 0,
  info_style: "tip",
};

const ICON_OPTIONS = [
  { value: "BookOpen", label: "Книга" },
  { value: "MessageSquare", label: "Сообщение" },
  { value: "Brain", label: "Мозг" },
  { value: "Cpu", label: "Процессор" },
  { value: "Code", label: "Код" },
  { value: "Lightbulb", label: "Лампочка" },
  { value: "Target", label: "Цель" },
  { value: "Layers", label: "Слои" },
  { value: "TrendingUp", label: "Рост" },
  { value: "Zap", label: "Молния" },
  { value: "Shield", label: "Щит" },
];

// ============================================================
// Component
// ============================================================

export function PracticumBuilder() {
  const { toast } = useToast();

  // Navigation
  const [view, setView] = useState<ViewLevel>("courses");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  // Data
  const [courses, setCourses] = useState<Course[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [steps, setSteps] = useState<Step[]>([]);
  const [loading, setLoading] = useState(false);

  // Course dialog
  const [courseDialogOpen, setCourseDialogOpen] = useState(false);
  const [courseDialogMode, setCourseDialogMode] = useState<"create" | "edit">("create");
  const [courseForm, setCourseForm] = useState<CourseFormData>(EMPTY_COURSE);
  const [courseSlugEdited, setCourseSlugEdited] = useState(false);

  // Lesson dialog
  const [lessonDialogOpen, setLessonDialogOpen] = useState(false);
  const [lessonDialogMode, setLessonDialogMode] = useState<"create" | "edit">("create");
  const [lessonForm, setLessonForm] = useState<LessonFormData>(EMPTY_LESSON);
  const [lessonSlugEdited, setLessonSlugEdited] = useState(false);

  // Step dialog
  const [stepDialogOpen, setStepDialogOpen] = useState(false);
  const [stepDialogMode, setStepDialogMode] = useState<"create" | "edit">("create");
  const [stepForm, setStepForm] = useState<StepFormData>(EMPTY_STEP);
  const [editingStepId, setEditingStepId] = useState<string | null>(null);

  // Step type picker (shown before creating a new step)
  const [typePickerOpen, setTypePickerOpen] = useState(false);

  // Delete confirmation
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);
  const [saving, setSaving] = useState(false);

  // --------------------------------------------------------
  // Data fetching
  // --------------------------------------------------------

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("practicum_courses")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      setCourses(data || []);
    } catch (err) {
      console.error(err);
      toast({ title: "Ошибка", description: "Не удалось загрузить курсы", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const fetchLessons = useCallback(async (courseId: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("practicum_lessons")
        .select("*")
        .eq("course_id", courseId)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      setLessons(data || []);
    } catch (err) {
      console.error(err);
      toast({ title: "Ошибка", description: "Не удалось загрузить уроки", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const fetchSteps = useCallback(async (lessonId: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("practicum_steps")
        .select("*")
        .eq("lesson_id", lessonId)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      setSteps(data || []);
    } catch (err) {
      console.error(err);
      toast({ title: "Ошибка", description: "Не удалось загрузить шаги", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  // --------------------------------------------------------
  // Navigation
  // --------------------------------------------------------

  const openCourse = (course: Course) => {
    setSelectedCourse(course);
    setView("lessons");
    fetchLessons(course.id);
  };

  const openLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setView("steps");
    fetchSteps(lesson.id);
  };

  const goBack = () => {
    if (view === "steps") {
      setView("lessons");
      setSelectedLesson(null);
      if (selectedCourse) fetchLessons(selectedCourse.id);
    } else if (view === "lessons") {
      setView("courses");
      setSelectedCourse(null);
      fetchCourses();
    }
  };

  // --------------------------------------------------------
  // Course CRUD
  // --------------------------------------------------------

  const openCreateCourse = () => {
    setCourseDialogMode("create");
    setCourseForm({ ...EMPTY_COURSE, sort_order: courses.length + 1 });
    setCourseSlugEdited(false);
    setCourseDialogOpen(true);
  };

  const openEditCourse = (course: Course) => {
    setCourseDialogMode("edit");
    setCourseForm({
      title: course.title,
      slug: course.slug,
      description: course.description || "",
      icon_name: course.icon_name,
      color: course.color,
      difficulty: course.difficulty,
      estimated_duration: course.estimated_duration,
      lessons_count: course.lessons_count,
      sort_order: course.sort_order,
      is_published: course.is_published,
      course_category:
        (course.course_category as CourseFormData["course_category"]) ??
        (course.is_common_base ? "common_base" : ""),
    });
    setCourseSlugEdited(true);
    setCourseDialogOpen(true);
  };

  const handleCourseTitleChange = (title: string) => {
    setCourseForm((prev) => ({
      ...prev,
      title,
      slug: courseSlugEdited ? prev.slug : generateSlug(title),
    }));
  };

  const saveCourse = async () => {
    if (!courseForm.title.trim()) {
      toast({ title: "Ошибка", description: "Введите название курса", variant: "destructive" });
      return;
    }
    if (!courseForm.slug.trim()) {
      toast({ title: "Ошибка", description: "Введите slug курса", variant: "destructive" });
      return;
    }

    setSaving(true);
    try {
      const isCommonBase = courseForm.course_category === "common_base";
      const payload = {
        title: courseForm.title.trim(),
        slug: courseForm.slug.trim(),
        description: courseForm.description.trim() || null,
        icon_name: courseForm.icon_name,
        color: courseForm.color,
        difficulty: courseForm.difficulty,
        estimated_duration: courseForm.estimated_duration,
        lessons_count: courseForm.lessons_count,
        sort_order: courseForm.sort_order,
        is_published: courseForm.is_published,
        is_common_base: isCommonBase,
        course_category: courseForm.course_category || null,
      };

      if (courseDialogMode === "create") {
        const { error } = await supabase.from("practicum_courses").insert(payload);
        if (error) throw error;
        toast({ title: "Курс создан" });
      } else if (selectedCourse) {
        const { error } = await supabase.from("practicum_courses").update(payload).eq("id", selectedCourse.id);
        if (error) throw error;
        toast({ title: "Курс обновлён" });
      }
      setCourseDialogOpen(false);
      fetchCourses();
    } catch (err: unknown) {
      console.error(err);
      const msg = err instanceof Error ? err.message : "Не удалось сохранить";
      toast({ title: "Ошибка", description: msg, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const toggleCoursePublished = async (course: Course) => {
    try {
      const { error } = await supabase
        .from("practicum_courses")
        .update({ is_published: !course.is_published })
        .eq("id", course.id);
      if (error) throw error;
      toast({ title: course.is_published ? "Курс скрыт" : "Курс опубликован" });
      fetchCourses();
    } catch (err) {
      console.error(err);
      toast({ title: "Ошибка", variant: "destructive" });
    }
  };

  // --------------------------------------------------------
  // Lesson CRUD
  // --------------------------------------------------------

  const openCreateLesson = () => {
    setLessonDialogMode("create");
    setLessonForm({ ...EMPTY_LESSON, sort_order: lessons.length + 1 });
    setLessonSlugEdited(false);
    setLessonDialogOpen(true);
  };

  const openEditLesson = (lesson: Lesson) => {
    setLessonDialogMode("edit");
    setLessonForm({
      title: lesson.title,
      slug: lesson.slug,
      description: lesson.description || "",
      sort_order: lesson.sort_order,
      is_published: lesson.is_published,
    });
    setLessonSlugEdited(true);
    setLessonDialogOpen(true);
    setSelectedLesson(lesson);
  };

  const handleLessonTitleChange = (title: string) => {
    setLessonForm((prev) => ({
      ...prev,
      title,
      slug: lessonSlugEdited ? prev.slug : generateSlug(title),
    }));
  };

  const saveLesson = async () => {
    if (!selectedCourse) return;
    if (!lessonForm.title.trim()) {
      toast({ title: "Ошибка", description: "Введите название урока", variant: "destructive" });
      return;
    }
    if (!lessonForm.slug.trim()) {
      toast({ title: "Ошибка", description: "Введите slug урока", variant: "destructive" });
      return;
    }

    setSaving(true);
    try {
      const payload = {
        course_id: selectedCourse.id,
        title: lessonForm.title.trim(),
        slug: lessonForm.slug.trim(),
        description: lessonForm.description.trim() || null,
        sort_order: lessonForm.sort_order,
        is_published: lessonForm.is_published,
      };

      if (lessonDialogMode === "create") {
        const { error } = await supabase.from("practicum_lessons").insert(payload);
        if (error) throw error;
        toast({ title: "Урок создан" });
        // Update lessons_count in course
        await supabase
          .from("practicum_courses")
          .update({ lessons_count: lessons.length + 1 })
          .eq("id", selectedCourse.id);
      } else if (selectedLesson) {
        const { error } = await supabase.from("practicum_lessons").update(payload).eq("id", selectedLesson.id);
        if (error) throw error;
        toast({ title: "Урок обновлён" });
      }
      setLessonDialogOpen(false);
      fetchLessons(selectedCourse.id);
    } catch (err: unknown) {
      console.error(err);
      const msg = err instanceof Error ? err.message : "Не удалось сохранить";
      toast({ title: "Ошибка", description: msg, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const toggleLessonPublished = async (lesson: Lesson) => {
    if (!selectedCourse) return;
    try {
      const { error } = await supabase
        .from("practicum_lessons")
        .update({ is_published: !lesson.is_published })
        .eq("id", lesson.id);
      if (error) throw error;
      toast({ title: lesson.is_published ? "Урок скрыт" : "Урок опубликован" });
      fetchLessons(selectedCourse.id);
    } catch (err) {
      console.error(err);
      toast({ title: "Ошибка", variant: "destructive" });
    }
  };

  const reorderLesson = async (lesson: Lesson, direction: "up" | "down") => {
    if (!selectedCourse) return;
    const idx = lessons.findIndex((l) => l.id === lesson.id);
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= lessons.length) return;

    const other = lessons[swapIdx];
    try {
      await Promise.all([
        supabase.from("practicum_lessons").update({ sort_order: other.sort_order }).eq("id", lesson.id),
        supabase.from("practicum_lessons").update({ sort_order: lesson.sort_order }).eq("id", other.id),
      ]);
      fetchLessons(selectedCourse.id);
    } catch (err) {
      console.error(err);
      toast({ title: "Ошибка сортировки", variant: "destructive" });
    }
  };

  // --------------------------------------------------------
  // Step CRUD
  // --------------------------------------------------------

  const openTypePicker = () => {
    setTypePickerOpen(true);
  };

  const selectStepType = (type: string) => {
    setTypePickerOpen(false);
    setStepDialogMode("create");
    setEditingStepId(null);
    setStepForm({
      ...EMPTY_STEP,
      step_type: type,
    });
    setStepDialogOpen(true);
  };

  const openEditStep = (step: Step) => {
    setStepDialogMode("edit");
    setEditingStepId(step.id);
    setStepForm({
      step_type: step.step_type,
      title: step.title || "",
      content: step.content || "",
      task_description: step.task_description || "",
      task_example: step.task_example || "",
      task_hint: step.task_hint || "",
      task_difficulty: step.task_difficulty || "medium",
      task_success_criteria: step.task_success_criteria || [],
      quiz_question: step.quiz_question || "",
      quiz_options: Array.isArray(step.quiz_options) ? (step.quiz_options as string[]) : ["", ""],
      quiz_correct_index: step.quiz_correct_index ?? 0,
      info_style: step.info_style || "tip",
    });
    setStepDialogOpen(true);
  };

  const saveStep = async () => {
    if (!selectedLesson) return;

    setSaving(true);
    try {
      const base: Record<string, string | string[] | number | null> = {
        lesson_id: selectedLesson.id,
        step_type: stepForm.step_type,
        title: stepForm.title.trim() || null,
      };

      if (stepForm.step_type === "theory") {
        base.content = stepForm.content || null;
      } else if (stepForm.step_type === "info") {
        base.content = stepForm.content || null;
        base.info_style = stepForm.info_style;
      } else if (stepForm.step_type === "quiz") {
        if (!stepForm.quiz_question.trim()) {
          toast({ title: "Ошибка", description: "Введите вопрос квиза", variant: "destructive" });
          setSaving(false);
          return;
        }
        const validOptions = stepForm.quiz_options.filter((o) => o.trim());
        if (validOptions.length < 2) {
          toast({ title: "Ошибка", description: "Минимум 2 варианта ответа", variant: "destructive" });
          setSaving(false);
          return;
        }
        base.quiz_question = stepForm.quiz_question.trim();
        base.quiz_options = validOptions;
        base.quiz_correct_index = Math.min(stepForm.quiz_correct_index, validOptions.length - 1);
      } else if (stepForm.step_type === "task") {
        if (!stepForm.task_description.trim()) {
          toast({ title: "Ошибка", description: "Введите описание задания", variant: "destructive" });
          setSaving(false);
          return;
        }
        base.task_description = stepForm.task_description.trim();
        base.task_example = stepForm.task_example.trim() || null;
        base.task_hint = stepForm.task_hint.trim() || null;
        base.task_difficulty = stepForm.task_difficulty;
        const criteria = stepForm.task_success_criteria.filter((c) => c.trim());
        base.task_success_criteria = criteria.length > 0 ? criteria : null;
      }

      if (stepDialogMode === "create") {
        base.sort_order = steps.length + 1;
        const { error } = await supabase.from("practicum_steps").insert(base);
        if (error) throw error;
        toast({ title: "Блок добавлен" });
      } else if (editingStepId) {
        const { error } = await supabase.from("practicum_steps").update(base).eq("id", editingStepId);
        if (error) throw error;
        toast({ title: "Блок обновлён" });
      }

      setStepDialogOpen(false);
      fetchSteps(selectedLesson.id);
    } catch (err: unknown) {
      console.error(err);
      const msg = err instanceof Error ? err.message : "Не удалось сохранить";
      toast({ title: "Ошибка", description: msg, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const reorderStep = async (step: Step, direction: "up" | "down") => {
    if (!selectedLesson) return;
    const idx = steps.findIndex((s) => s.id === step.id);
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= steps.length) return;

    const other = steps[swapIdx];
    try {
      await Promise.all([
        supabase.from("practicum_steps").update({ sort_order: other.sort_order }).eq("id", step.id),
        supabase.from("practicum_steps").update({ sort_order: step.sort_order }).eq("id", other.id),
      ]);
      fetchSteps(selectedLesson.id);
    } catch (err) {
      console.error(err);
      toast({ title: "Ошибка сортировки", variant: "destructive" });
    }
  };

  // --------------------------------------------------------
  // Delete
  // --------------------------------------------------------

  const confirmDelete = (target: DeleteTarget) => {
    setDeleteTarget(target);
    setDeleteDialogOpen(true);
  };

  const executeDelete = async () => {
    if (!deleteTarget) return;

    setSaving(true);
    try {
      const table =
        deleteTarget.type === "course"
          ? "practicum_courses"
          : deleteTarget.type === "lesson"
          ? "practicum_lessons"
          : "practicum_steps";

      const { error } = await supabase.from(table).delete().eq("id", deleteTarget.id);
      if (error) throw error;

      toast({ title: `${deleteTarget.type === "course" ? "Курс" : deleteTarget.type === "lesson" ? "Урок" : "Блок"} удалён` });
      setDeleteDialogOpen(false);
      setDeleteTarget(null);

      if (deleteTarget.type === "course") fetchCourses();
      else if (deleteTarget.type === "lesson" && selectedCourse) {
        fetchLessons(selectedCourse.id);
        // Update lessons_count
        const newCount = lessons.filter((l) => l.id !== deleteTarget.id).length;
        await supabase.from("practicum_courses").update({ lessons_count: newCount }).eq("id", selectedCourse.id);
      }
      else if (deleteTarget.type === "step" && selectedLesson) fetchSteps(selectedLesson.id);
    } catch (err: unknown) {
      console.error(err);
      const msg = err instanceof Error ? err.message : "Не удалось удалить";
      toast({ title: "Ошибка", description: msg, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  // --------------------------------------------------------
  // Step form helpers (dynamic arrays)
  // --------------------------------------------------------

  const addQuizOption = () => {
    setStepForm((prev) => ({ ...prev, quiz_options: [...prev.quiz_options, ""] }));
  };

  const removeQuizOption = (idx: number) => {
    setStepForm((prev) => {
      const opts = prev.quiz_options.filter((_, i) => i !== idx);
      const correctIdx = prev.quiz_correct_index >= opts.length ? 0 : prev.quiz_correct_index;
      return { ...prev, quiz_options: opts, quiz_correct_index: correctIdx };
    });
  };

  const updateQuizOption = (idx: number, value: string) => {
    setStepForm((prev) => {
      const opts = [...prev.quiz_options];
      opts[idx] = value;
      return { ...prev, quiz_options: opts };
    });
  };

  const addCriteria = () => {
    setStepForm((prev) => ({ ...prev, task_success_criteria: [...prev.task_success_criteria, ""] }));
  };

  const removeCriteria = (idx: number) => {
    setStepForm((prev) => ({
      ...prev,
      task_success_criteria: prev.task_success_criteria.filter((_, i) => i !== idx),
    }));
  };

  const updateCriteria = (idx: number, value: string) => {
    setStepForm((prev) => {
      const arr = [...prev.task_success_criteria];
      arr[idx] = value;
      return { ...prev, task_success_criteria: arr };
    });
  };

  // --------------------------------------------------------
  // Preview helpers
  // --------------------------------------------------------

  function getStepPreview(step: Step): string {
    switch (step.step_type) {
      case "theory":
        return (step.content || "").slice(0, 120).replace(/[#*_]/g, "") + (step.content && step.content.length > 120 ? "..." : "");
      case "info":
        return (step.content || "").slice(0, 100) + (step.content && step.content.length > 100 ? "..." : "");
      case "quiz":
        return step.quiz_question || "";
      case "task":
        return (step.task_description || "").slice(0, 100) + (step.task_description && step.task_description.length > 100 ? "..." : "");
      default:
        return "";
    }
  }

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="space-y-6">
      {/* Breadcrumb + back navigation */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <button
          onClick={() => { setView("courses"); setSelectedCourse(null); setSelectedLesson(null); fetchCourses(); }}
          className={`hover:text-foreground transition-colors ${view === "courses" ? "text-foreground font-medium" : ""}`}
        >
          <GraduationCap className="h-4 w-4 inline mr-1" />
          Курсы
        </button>
        {selectedCourse && (
          <>
            <span>/</span>
            <button
              onClick={() => { setView("lessons"); setSelectedLesson(null); fetchLessons(selectedCourse.id); }}
              className={`hover:text-foreground transition-colors ${view === "lessons" ? "text-foreground font-medium" : ""}`}
            >
              {selectedCourse.title}
            </button>
          </>
        )}
        {selectedLesson && (
          <>
            <span>/</span>
            <span className="text-foreground font-medium">{selectedLesson.title}</span>
          </>
        )}
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {/* ============================== */}
      {/* COURSES VIEW */}
      {/* ============================== */}
      {!loading && view === "courses" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Курсы практикума ({courses.length})</h3>
            <Button onClick={openCreateCourse} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Новый курс
            </Button>
          </div>

          {courses.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <GraduationCap className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Курсов пока нет</p>
              <Button className="mt-4" onClick={openCreateCourse}>
                <Plus className="h-4 w-4 mr-2" />
                Создать первый курс
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              {courses.map((course) => (
                <Card
                  key={course.id}
                  className="glass-panel border-white/40 hover:border-primary/50 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between p-4">
                    <div
                      className="flex items-center gap-4 flex-1 min-w-0"
                      onClick={() => openCourse(course)}
                    >
                      <div
                        className="h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: course.color + "20" }}
                      >
                        <GraduationCap className="h-5 w-5" style={{ color: course.color }} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium truncate">{course.title}</span>
                          {!course.is_published && (
                            <Badge variant="outline" className="text-xs flex-shrink-0">
                              <EyeOff className="h-3 w-3 mr-1" />
                              Скрыт
                            </Badge>
                          )}
                          {course.course_category === "common_base" || course.is_common_base ? (
                            <Badge
                              variant="outline"
                              className="text-xs flex-shrink-0 border-amber-500/60 text-amber-600"
                            >
                              Базовый курс
                            </Badge>
                          ) : course.course_category === "role_track" ? (
                            <Badge variant="outline" className="text-xs flex-shrink-0">
                              Ролевой трек
                            </Badge>
                          ) : course.course_category === "optional" ? (
                            <Badge variant="outline" className="text-xs flex-shrink-0">
                              Опциональный
                            </Badge>
                          ) : null}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">{course.slug}</Badge>
                          <Badge variant="outline" className="text-xs">{course.lessons_count} уроков</Badge>
                          <Badge variant="outline" className="text-xs">{course.estimated_duration}</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 flex-shrink-0 ml-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => { e.stopPropagation(); toggleCoursePublished(course); }}
                        title={course.is_published ? "Скрыть" : "Опубликовать"}
                      >
                        {course.is_published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => { e.stopPropagation(); setSelectedCourse(course); openEditCourse(course); }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={(e) => { e.stopPropagation(); confirmDelete({ type: "course", id: course.id, name: course.title }); }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ============================== */}
      {/* LESSONS VIEW */}
      {/* ============================== */}
      {!loading && view === "lessons" && selectedCourse && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={goBack}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h3 className="text-lg font-semibold">Уроки ({lessons.length})</h3>
            </div>
            <Button onClick={openCreateLesson} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Новый урок
            </Button>
          </div>

          {lessons.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Уроков пока нет</p>
              <Button className="mt-4" onClick={openCreateLesson}>
                <Plus className="h-4 w-4 mr-2" />
                Добавить первый урок
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              {lessons.map((lesson, idx) => (
                <Card
                  key={lesson.id}
                  className="glass-panel border-white/40 hover:border-primary/50 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between p-4">
                    <div
                      className="flex items-center gap-4 flex-1 min-w-0"
                      onClick={() => openLesson(lesson)}
                    >
                      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-primary">{idx + 1}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium truncate">{lesson.title}</span>
                          {!lesson.is_published && (
                            <Badge variant="outline" className="text-xs flex-shrink-0">
                              <EyeOff className="h-3 w-3 mr-1" />
                              Скрыт
                            </Badge>
                          )}
                        </div>
                        {lesson.description && (
                          <p className="text-sm text-muted-foreground truncate mt-0.5">{lesson.description}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 flex-shrink-0 ml-4">
                      <Button
                        variant="ghost" size="icon" className="h-8 w-8"
                        disabled={idx === 0}
                        onClick={(e) => { e.stopPropagation(); reorderLesson(lesson, "up"); }}
                      >
                        <ChevronUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost" size="icon" className="h-8 w-8"
                        disabled={idx === lessons.length - 1}
                        onClick={(e) => { e.stopPropagation(); reorderLesson(lesson, "down"); }}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost" size="sm"
                        onClick={(e) => { e.stopPropagation(); toggleLessonPublished(lesson); }}
                      >
                        {lesson.is_published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="ghost" size="sm"
                        onClick={(e) => { e.stopPropagation(); openEditLesson(lesson); }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost" size="sm" className="text-destructive hover:text-destructive"
                        onClick={(e) => { e.stopPropagation(); confirmDelete({ type: "lesson", id: lesson.id, name: lesson.title }); }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ============================== */}
      {/* STEPS / BLOCK EDITOR VIEW */}
      {/* ============================== */}
      {!loading && view === "steps" && selectedLesson && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={goBack}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h3 className="text-lg font-semibold">Блоки контента ({steps.length})</h3>
            </div>
            <Button onClick={openTypePicker} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Добавить блок
            </Button>
          </div>

          {steps.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Блоков пока нет</p>
              <Button className="mt-4" onClick={openTypePicker}>
                <Plus className="h-4 w-4 mr-2" />
                Добавить первый блок
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {steps.map((step, idx) => {
                const TypeIcon = getStepTypeIcon(step.step_type);
                const InfoIcon = step.step_type === "info" ? getInfoStyleIcon(step.info_style) : null;
                return (
                  <Card key={step.id} className="glass-panel border-white/40">
                    <div className="flex items-start gap-4 p-4">
                      {/* Reorder buttons */}
                      <div className="flex flex-col gap-1 flex-shrink-0 pt-1">
                        <Button
                          variant="ghost" size="icon" className="h-6 w-6"
                          disabled={idx === 0}
                          onClick={() => reorderStep(step, "up")}
                        >
                          <ChevronUp className="h-3 w-3" />
                        </Button>
                        <div className="text-center text-xs text-muted-foreground font-medium">{idx + 1}</div>
                        <Button
                          variant="ghost" size="icon" className="h-6 w-6"
                          disabled={idx === steps.length - 1}
                          onClick={() => reorderStep(step, "down")}
                        >
                          <ChevronDown className="h-3 w-3" />
                        </Button>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={getStepTypeColor(step.step_type)}>
                            <TypeIcon className="h-3 w-3 mr-1" />
                            {getStepTypeLabel(step.step_type)}
                          </Badge>
                          {step.step_type === "info" && InfoIcon && (
                            <Badge variant="outline" className="text-xs">
                              <InfoIcon className="h-3 w-3 mr-1" />
                              {getInfoStyleLabel(step.info_style || "tip")}
                            </Badge>
                          )}
                          {step.step_type === "task" && step.task_difficulty && (
                            <Badge variant="outline" className="text-xs">
                              {step.task_difficulty === "easy" ? "Легко" : step.task_difficulty === "medium" ? "Средне" : "Сложно"}
                            </Badge>
                          )}
                        </div>
                        {step.title && (
                          <p className="font-medium text-sm text-foreground">{step.title}</p>
                        )}
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {getStepPreview(step)}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Button variant="ghost" size="sm" onClick={() => openEditStep(step)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost" size="sm" className="text-destructive hover:text-destructive"
                          onClick={() => confirmDelete({ type: "step", id: step.id, name: step.title || getStepTypeLabel(step.step_type) })}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}

              {/* Inline add button at bottom */}
              <button
                onClick={openTypePicker}
                className="w-full border-2 border-dashed border-border hover:border-primary/50 rounded-xl py-4 flex items-center justify-center gap-2 text-muted-foreground hover:text-primary transition-all"
              >
                <Plus className="h-5 w-5" />
                <span className="text-sm font-medium">Добавить блок</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* ============================== */}
      {/* DIALOGS */}
      {/* ============================== */}

      {/* --- Course Dialog --- */}
      <Dialog open={courseDialogOpen} onOpenChange={setCourseDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{courseDialogMode === "create" ? "Новый курс" : "Редактирование курса"}</DialogTitle>
            <DialogDescription>
              {courseDialogMode === "create" ? "Заполните данные нового курса" : "Измените данные курса"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Название *</Label>
              <Input
                value={courseForm.title}
                onChange={(e) => handleCourseTitleChange(e.target.value)}
                placeholder="Искусство промтинга"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Slug (URL) *</Label>
              <Input
                value={courseForm.slug}
                onChange={(e) => { setCourseSlugEdited(true); setCourseForm((p) => ({ ...p, slug: e.target.value })); }}
                placeholder="prompting"
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">URL: /practicum/{courseForm.slug || "..."}</p>
            </div>
            <div>
              <Label>Описание</Label>
              <Textarea
                value={courseForm.description}
                onChange={(e) => setCourseForm((p) => ({ ...p, description: e.target.value }))}
                placeholder="Краткое описание курса..."
                className="mt-1"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Сложность</Label>
                <Select value={courseForm.difficulty} onValueChange={(v) => setCourseForm((p) => ({ ...p, difficulty: v }))}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Начальный</SelectItem>
                    <SelectItem value="medium">Средний</SelectItem>
                    <SelectItem value="hard">Продвинутый</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Длительность</Label>
                <Input
                  value={courseForm.estimated_duration}
                  onChange={(e) => setCourseForm((p) => ({ ...p, estimated_duration: e.target.value }))}
                  placeholder="45 мин"
                  className="mt-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Иконка</Label>
                <Select value={courseForm.icon_name} onValueChange={(v) => setCourseForm((p) => ({ ...p, icon_name: v }))}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {ICON_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Цвет</Label>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="color"
                    value={courseForm.color}
                    onChange={(e) => setCourseForm((p) => ({ ...p, color: e.target.value }))}
                    className="h-9 w-12 rounded cursor-pointer border border-input"
                  />
                  <Input
                    value={courseForm.color}
                    onChange={(e) => setCourseForm((p) => ({ ...p, color: e.target.value }))}
                    placeholder="#6366f1"
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Кол-во уроков</Label>
                <Input
                  type="number" min={0}
                  value={courseForm.lessons_count}
                  onChange={(e) => setCourseForm((p) => ({ ...p, lessons_count: parseInt(e.target.value) || 0 }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Порядок сортировки</Label>
                <Input
                  type="number" min={0}
                  value={courseForm.sort_order}
                  onChange={(e) => setCourseForm((p) => ({ ...p, sort_order: parseInt(e.target.value) || 0 }))}
                  className="mt-1"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Опубликован</Label>
                  <p className="text-sm text-muted-foreground">Курс будет виден студентам</p>
                </div>
                <Switch
                  checked={courseForm.is_published}
                  onCheckedChange={(checked) => setCourseForm((p) => ({ ...p, is_published: checked }))}
                />
              </div>
              <div>
                <Label>Тип курса</Label>
                <p className="text-xs text-muted-foreground mb-1">
                  Определяет место курса в структуре: общий базовый модуль, ролевой трек или опциональный модуль.
                </p>
                <Select
                  value={courseForm.course_category}
                  onValueChange={(value) =>
                    setCourseForm((p) => ({
                      ...p,
                      course_category: value as CourseFormData["course_category"],
                    }))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Выберите тип курса" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="common_base">
                      Общий базовый модуль (для всех ролей)
                    </SelectItem>
                    <SelectItem value="role_track">
                      Ролевой трек (для конкретной специальности)
                    </SelectItem>
                    <SelectItem value="optional">
                      Опциональный/углубляющий модуль
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCourseDialogOpen(false)}>Отмена</Button>
            <Button onClick={saveCourse} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Check className="h-4 w-4 mr-2" />}
              {courseDialogMode === "create" ? "Создать" : "Сохранить"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* --- Lesson Dialog --- */}
      <Dialog open={lessonDialogOpen} onOpenChange={setLessonDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{lessonDialogMode === "create" ? "Новый урок" : "Редактирование урока"}</DialogTitle>
            <DialogDescription>
              {lessonDialogMode === "create" ? "Добавьте урок в курс" : "Измените данные урока"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Название *</Label>
              <Input
                value={lessonForm.title}
                onChange={(e) => handleLessonTitleChange(e.target.value)}
                placeholder="Что такое промпт"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Slug *</Label>
              <Input
                value={lessonForm.slug}
                onChange={(e) => { setLessonSlugEdited(true); setLessonForm((p) => ({ ...p, slug: e.target.value })); }}
                placeholder="what-is-prompt"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Описание</Label>
              <Textarea
                value={lessonForm.description}
                onChange={(e) => setLessonForm((p) => ({ ...p, description: e.target.value }))}
                placeholder="Описание урока..."
                className="mt-1"
                rows={3}
              />
            </div>
            <div>
              <Label>Порядок сортировки</Label>
              <Input
                type="number" min={0}
                value={lessonForm.sort_order}
                onChange={(e) => setLessonForm((p) => ({ ...p, sort_order: parseInt(e.target.value) || 0 }))}
                className="mt-1"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Опубликован</Label>
                <p className="text-sm text-muted-foreground">Урок будет виден студентам</p>
              </div>
              <Switch
                checked={lessonForm.is_published}
                onCheckedChange={(checked) => setLessonForm((p) => ({ ...p, is_published: checked }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setLessonDialogOpen(false)}>Отмена</Button>
            <Button onClick={saveLesson} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Check className="h-4 w-4 mr-2" />}
              {lessonDialogMode === "create" ? "Создать" : "Сохранить"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* --- Step Type Picker Dialog --- */}
      <Dialog open={typePickerOpen} onOpenChange={setTypePickerOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Выберите тип блока</DialogTitle>
            <DialogDescription>Каждый тип отвечает за свой вид контента</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3">
            {[
              { type: "theory", icon: BookOpen, title: "Теория", desc: "Текст с markdown и ссылками на методички", color: "hover:border-blue-500/50" },
              { type: "quiz", icon: HelpCircle, title: "Квиз", desc: "Вопрос с вариантами ответа", color: "hover:border-purple-500/50" },
              { type: "task", icon: PenTool, title: "Задание", desc: "Задание с AI-проверкой промпта", color: "hover:border-green-500/50" },
              { type: "info", icon: Info, title: "Инфо-блок", desc: "Совет, пример или предупреждение", color: "hover:border-amber-500/50" },
            ].map((item) => (
              <button
                key={item.type}
                onClick={() => selectStepType(item.type)}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-border transition-all text-center ${item.color} hover:shadow-md`}
              >
                <item.icon className="h-8 w-8 text-foreground" />
                <span className="font-medium text-sm">{item.title}</span>
                <span className="text-xs text-muted-foreground">{item.desc}</span>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* --- Step Edit Dialog --- */}
      <Dialog open={stepDialogOpen} onOpenChange={setStepDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {(() => { const Icon = getStepTypeIcon(stepForm.step_type); return <Icon className="h-5 w-5" />; })()}
              {stepDialogMode === "create" ? "Новый блок" : "Редактирование блока"}: {getStepTypeLabel(stepForm.step_type)}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Title -- common for all types */}
            <div>
              <Label>Заголовок</Label>
              <Input
                value={stepForm.title}
                onChange={(e) => setStepForm((p) => ({ ...p, title: e.target.value }))}
                placeholder="Заголовок блока (необязательно)"
                className="mt-1"
              />
            </div>

            {/* THEORY FORM */}
            {stepForm.step_type === "theory" && (
              <div>
                <Label>Контент (Markdown)</Label>
                <Textarea
                  value={stepForm.content}
                  onChange={(e) => setStepForm((p) => ({ ...p, content: e.target.value }))}
                  placeholder={"# Заголовок\n\nТекст с **жирным** и ссылками на методичку: {{термин|поисковый запрос}}\n\n- Список\n- Пунктов"}
                  className="mt-1 font-mono text-sm"
                  rows={12}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Поддерживается Markdown. Глоссарные ссылки: {"{{термин|запрос}}"}
                </p>
              </div>
            )}

            {/* INFO FORM */}
            {stepForm.step_type === "info" && (
              <>
                <div>
                  <Label>Стиль</Label>
                  <Select value={stepForm.info_style} onValueChange={(v) => setStepForm((p) => ({ ...p, info_style: v }))}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tip">Совет</SelectItem>
                      <SelectItem value="warning">Предупреждение</SelectItem>
                      <SelectItem value="example">Пример</SelectItem>
                      <SelectItem value="note">Заметка</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Контент</Label>
                  <Textarea
                    value={stepForm.content}
                    onChange={(e) => setStepForm((p) => ({ ...p, content: e.target.value }))}
                    placeholder="Текст инфо-блока..."
                    className="mt-1"
                    rows={4}
                  />
                </div>
              </>
            )}

            {/* QUIZ FORM */}
            {stepForm.step_type === "quiz" && (
              <>
                <div>
                  <Label>Вопрос *</Label>
                  <Input
                    value={stepForm.quiz_question}
                    onChange={(e) => setStepForm((p) => ({ ...p, quiz_question: e.target.value }))}
                    placeholder="Какой элемент промпта задаёт формат ответа?"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Варианты ответа *</Label>
                  <div className="space-y-2 mt-1">
                    {stepForm.quiz_options.map((opt, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <button
                          onClick={() => setStepForm((p) => ({ ...p, quiz_correct_index: idx }))}
                          className={`h-8 w-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                            stepForm.quiz_correct_index === idx
                              ? "bg-green-500 border-green-500 text-white"
                              : "border-border hover:border-primary"
                          }`}
                          title="Отметить как правильный"
                        >
                          {stepForm.quiz_correct_index === idx && <Check className="h-4 w-4" />}
                        </button>
                        <Input
                          value={opt}
                          onChange={(e) => updateQuizOption(idx, e.target.value)}
                          placeholder={`Вариант ${idx + 1}`}
                          className="flex-1"
                        />
                        {stepForm.quiz_options.length > 2 && (
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeQuizOption(idx)}>
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={addQuizOption}>
                      <Plus className="h-4 w-4 mr-1" />
                      Добавить вариант
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Нажмите на кружок слева, чтобы отметить правильный ответ
                  </p>
                </div>
              </>
            )}

            {/* TASK FORM */}
            {stepForm.step_type === "task" && (
              <>
                <div>
                  <Label>Описание задания *</Label>
                  <Textarea
                    value={stepForm.task_description}
                    onChange={(e) => setStepForm((p) => ({ ...p, task_description: e.target.value }))}
                    placeholder="Напишите промпт, который..."
                    className="mt-1"
                    rows={4}
                  />
                </div>
                <div>
                  <Label>Пример</Label>
                  <Textarea
                    value={stepForm.task_example}
                    onChange={(e) => setStepForm((p) => ({ ...p, task_example: e.target.value }))}
                    placeholder="Пример структуры ответа..."
                    className="mt-1"
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Подсказка</Label>
                  <Textarea
                    value={stepForm.task_hint}
                    onChange={(e) => setStepForm((p) => ({ ...p, task_hint: e.target.value }))}
                    placeholder="Подсказка для студента..."
                    className="mt-1"
                    rows={2}
                  />
                </div>
                <div>
                  <Label>Сложность</Label>
                  <Select value={stepForm.task_difficulty} onValueChange={(v) => setStepForm((p) => ({ ...p, task_difficulty: v }))}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Легко</SelectItem>
                      <SelectItem value="medium">Средне</SelectItem>
                      <SelectItem value="hard">Сложно</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Критерии успеха</Label>
                  <div className="space-y-2 mt-1">
                    {stepForm.task_success_criteria.map((crit, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Input
                          value={crit}
                          onChange={(e) => updateCriteria(idx, e.target.value)}
                          placeholder={`Критерий ${idx + 1}`}
                          className="flex-1"
                        />
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeCriteria(idx)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={addCriteria}>
                      <Plus className="h-4 w-4 mr-1" />
                      Добавить критерий
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    AI будет проверять ответ по этим критериям
                  </p>
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setStepDialogOpen(false)}>Отмена</Button>
            <Button onClick={saveStep} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Check className="h-4 w-4 mr-2" />}
              {stepDialogMode === "create" ? "Добавить" : "Сохранить"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* --- Delete Confirmation Dialog --- */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Подтвердите удаление</DialogTitle>
            <DialogDescription>
              Вы уверены, что хотите удалить {deleteTarget?.type === "course" ? "курс" : deleteTarget?.type === "lesson" ? "урок" : "блок"}{" "}
              &laquo;{deleteTarget?.name}&raquo;?
              {deleteTarget?.type === "course" && " Все уроки и блоки курса будут удалены."}
              {deleteTarget?.type === "lesson" && " Все блоки урока будут удалены."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Отмена</Button>
            <Button variant="destructive" onClick={executeDelete} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Trash2 className="h-4 w-4 mr-2" />}
              Удалить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
