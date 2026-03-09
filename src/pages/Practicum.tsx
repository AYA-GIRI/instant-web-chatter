import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, Clock, ArrowRight, Loader2 } from "lucide-react";
import { usePracticumCourses } from "@/hooks/usePracticum";
import { getIconByName } from "@/utils/methods";

const Practicum = () => {
  const { courses, loading, error } = usePracticumCourses();

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {courses.map((course) => {
                const Icon = getIconByName(course.icon_name);

                return (
                  <Card
                    key={course.id}
                    className="glass-panel transition-all border-white/40 hover:border-primary hover:shadow-lg cursor-pointer flex flex-col"
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
                          <Badge variant="outline">
                            {course.lessons_count} уроков
                          </Badge>
                        </div>

                        <Link to={`/practicum/${course.slug}`}>
                          <Button className="w-full bg-primary hover:bg-primary/90">
                            Начать практикум
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
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
