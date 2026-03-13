import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, Clock, ArrowRight, Loader2, Star } from "lucide-react";
import { usePracticumCourses, useCommonBaseStatus, type PracticumCourse } from "@/hooks/usePracticum";
import { getIconByName } from "@/utils/methods";
import { useAuth } from "@/contexts/AuthContext";
import { specialtyRecommendations, specialtyRoleTitles } from "@/config/specialtyRecommendations";
import { useToast } from "@/hooks/use-toast";

const Practicum = () => {
  const { courses, loading, error } = usePracticumCourses();
  const { profile, user } = useAuth();
  const { toast } = useToast();
  const { baseCourse, isBaseCompleted, loading: baseLoading } = useCommonBaseStatus(user?.id);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500/10 text-green-600 border-green-500/30";
      case "medium":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/30";
      case "hard":
        return "bg-red-500/10 text-red-600 border-red-500/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "Начальный";
      case "medium":
        return "Средний";
      case "hard":
        return "Продвинутый";
      default:
        return difficulty;
    }
  };

  const getIsLockedByBase = (courseId: string) => {
    if (baseLoading) return false;
    if (!baseCourse) return false;
    if (isBaseCompleted) return false;
    return courseId !== baseCourse.id;
  };

  const sortCoursesWithRecommendations = (items: PracticumCourse[]) => {
    const recommendedSlugs =
      profile?.specialty_role ? specialtyRecommendations[profile.specialty_role] || [] : [];
    return [...items].sort((a, b) => {
      const aRec = recommendedSlugs.includes(a.slug);
      const bRec = recommendedSlugs.includes(b.slug);
      if (aRec === bRec) return 0;
      return aRec ? -1 : 1;
    });
  };

  const renderCourseGrid = (items: PracticumCourse[]) => {
    const sortedCourses = sortCoursesWithRecommendations(items);

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {sortedCourses.map((course) => {
          const Icon = getIconByName(course.icon_name);
          const isRecommended =
            profile?.specialty_role &&
            (specialtyRecommendations[profile.specialty_role] || []).includes(course.slug);
          const isLockedByBase = getIsLockedByBase(course.id);

          const handleLockedClick = () => {
            if (!baseCourse) return;
            toast({
              title: "Сначала общий базовый курс",
              description:
                "Завершите обязательный базовый модуль, затем переходите к ролевым практикумам.",
            });
          };

          const categoryLabel =
            course.course_category === "common_base"
              ? "Базовый модуль"
              : course.course_category === "role_track"
              ? "Ролевой трек"
              : course.course_category === "optional"
              ? "Опциональный модуль"
              : null;

          return (
            <Card
              key={course.id}
              className={`glass-panel transition-all border-white/40 hover:border-primary hover:shadow-lg flex flex-col ${
                isLockedByBase ? "opacity-70" : "cursor-pointer"
              }`}
            >
              <CardHeader className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="h-14 w-14 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: course.color + "20" }}
                  >
                    <Icon className="h-7 w-7" style={{ color: course.color }} />
                  </div>
                </div>
                <CardTitle className="text-xl font-heading leading-tight break-words min-h-[3.5rem]">
                  {course.title}
                </CardTitle>
                <CardDescription className="text-sm mt-2 line-clamp-3 min-h-[3.75rem]">
                  {course.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge className={getDifficultyColor(course.difficulty)}>
                      {getDifficultyLabel(course.difficulty)}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {course.estimated_duration}
                    </Badge>
                    <Badge variant="outline">{course.lessons_count} уроков</Badge>
                    {categoryLabel && (
                      <Badge variant="outline" className="text-xs">
                        {categoryLabel}
                      </Badge>
                    )}
                    {isRecommended && (
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1 border-primary/60 text-primary"
                      >
                        <Star className="h-3 w-3 fill-primary" />
                        Рекомендовано для вашей роли
                      </Badge>
                    )}
                    {isLockedByBase && baseCourse && course.id !== baseCourse.id && (
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1 border-amber-500/60 text-amber-600"
                      >
                        Сначала завершите базовый курс
                      </Badge>
                    )}
                  </div>

                  {isLockedByBase && baseCourse && course.id !== baseCourse.id ? (
                    <Button className="w-full" variant="outline" onClick={handleLockedClick}>
                      Доступен после базового курса
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Link to={`/practicum/${course.slug}`}>
                      <Button className="w-full bg-primary hover:bg-primary/90">
                        Начать практикум
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-transparent">
      <Navigation />

      {/* Hero Section */}
          <section className="pt-32 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-12">
            <div className="inline-flex h-16 w-16 rounded-2xl bg-gradient-primary items-center justify-center shadow-lg">
              <Target className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground font-heading">
              Практикум
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-sans">
              Практические задания для развития навыков работы с AI и машинным обучением
            </p>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
          <section className="pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Блок про профессиональную роль и общий базовый курс */}
          {profile?.specialty_role && (
            <div className="mb-8">
              <Card className="glass-panel border-dashed border-primary/40">
                <CardContent className="py-4 px-6 space-y-3">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Ваша профессиональная роль</p>
                      <p className="text-lg font-semibold">
                        {specialtyRoleTitles[profile.specialty_role]}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground max-w-xl">
                      Практикумы ниже помогают отработать применение AI именно в этой роли. Сначала
                      пройдите общий базовый модуль, затем переходите к ролевым трекам; опциональные
                      модули можно проходить дополнительно по желанию.
                    </p>
                  </div>

                  {!baseLoading && baseCourse && (
                    <div className="mt-2 rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium text-primary">
                          Сначала общий базовый курс
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Все студенты сначала проходят общий модуль по базовым приёмам работы с AI,
                          затем переходят к практикам по своей роли.
                        </p>
                      </div>
                      <div className="flex flex-col items-start md:items-end gap-1">
                        <p className="text-sm font-medium">
                          Базовый курс:{" "}
                          <span className="underline underline-offset-2">
                            {baseCourse.title}
                          </span>
                        </p>
                        {!isBaseCompleted && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="mt-1"
                            onClick={() => {
                              window.location.href = `/practicum/${baseCourse.slug}`;
                            }}
                          >
                            Перейти к базовому курсу
                          </Button>
                        )}
                        {isBaseCompleted && (
                          <span className="text-xs text-muted-foreground">
                            Базовый курс завершён — ролевые практикумы разблокированы
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {loading && (
            <div className="text-center py-12">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary mb-4" />
              <p className="text-muted-foreground text-lg">Загрузка курсов...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-destructive text-lg">Ошибка загрузки: {error.message}</p>
            </div>
          )}

          {!loading && !error && (
            <>
              {courses.some((c) => c.course_category === "common_base") && (
                <div className="mb-10">
                  <h2 className="text-xl font-semibold mb-4">Общий базовый модуль</h2>
                  {renderCourseGrid(courses.filter((c) => c.course_category === "common_base"))}
                </div>
              )}

              {courses.some((c) => c.course_category === "role_track") && (
                <div className="mb-10">
                  <h2 className="text-xl font-semibold mb-4">Ролевые треки</h2>
                  {renderCourseGrid(courses.filter((c) => c.course_category === "role_track"))}
                </div>
              )}

              {courses.some(
                (c) => c.course_category === "optional" || c.course_category == null
              ) && (
                <div className="mb-4">
                  <h2 className="text-xl font-semibold mb-4">Опциональные модули</h2>
                  {renderCourseGrid(
                    courses.filter(
                      (c) => c.course_category === "optional" || c.course_category == null
                    )
                  )}
                </div>
              )}
            </>
          )}

          {!loading && !error && courses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">Пока нет доступных курсов</p>
            </div>
          )}

          {/* Info block */}
          <div className="mt-12 text-center">
            <Card className="glass-panel border-white/40 inline-block max-w-2xl">
              <CardContent className="py-6">
                <p className="text-muted-foreground">
                  Практикумы разрабатываются совместно с экспертами Texel и включают
                  реальные задачи из проектов компании. Новые модули добавляются регулярно.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Practicum;
