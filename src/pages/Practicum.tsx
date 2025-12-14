import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Code, Brain, Lock, Target, Clock, ArrowRight } from "lucide-react";

// Типы для практикумов
type PracticumItem = {
  id: string;
  title: string;
  description: string;
  icon: typeof MessageSquare;
  difficulty: "easy" | "medium" | "hard";
  duration: string;
  tasksCount: number;
  isAvailable: boolean;
  href?: string;
  comingSoon?: string;
};

// Список практикумов
const practicums: PracticumItem[] = [
  {
    id: "prompts",
    title: "Написание промптов",
    description: "Научитесь создавать эффективные промпты для ChatGPT и других LLM. Освойте техники few-shot learning, chain-of-thought и структурирования запросов.",
    icon: MessageSquare,
    difficulty: "easy",
    duration: "30 мин",
    tasksCount: 4,
    isAvailable: true,
    href: "/practicum/prompts",
  },
  {
    id: "python-ai",
    title: "Python для работы с AI API",
    description: "Изучите работу с OpenAI API, создание чат-ботов и интеграцию AI в Python-приложения. Практика работы с библиотеками requests и openai.",
    icon: Code,
    difficulty: "medium",
    duration: "1 час",
    tasksCount: 6,
    isAvailable: false,
    comingSoon: "Январь 2025",
  },
  {
    id: "agents",
    title: "Мультиагентные системы",
    description: "Погрузитесь в создание AI-агентов, оркестрацию задач и построение сложных workflow с использованием LangChain и AutoGPT.",
    icon: Brain,
    difficulty: "hard",
    duration: "2 часа",
    tasksCount: 8,
    isAvailable: false,
    comingSoon: "Февраль 2025",
  },
];

const Practicum = () => {
  // Цвета для уровней сложности
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

      {/* Practicums Grid */}
      <section className="pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {practicums.map((practicum) => {
              const Icon = practicum.icon;

              return (
                <Card
                  key={practicum.id}
                  className={`glass-panel transition-all border-white/40 ${
                    practicum.isAvailable
                      ? "hover:border-primary hover:shadow-lg cursor-pointer"
                      : "opacity-75"
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`h-14 w-14 rounded-xl flex items-center justify-center ${
                          practicum.isAvailable
                            ? "bg-primary/10"
                            : "bg-muted"
                        }`}
                      >
                        {practicum.isAvailable ? (
                          <Icon className="h-7 w-7 text-primary" />
                        ) : (
                          <Lock className="h-6 w-6 text-muted-foreground" />
                        )}
                      </div>
                      {!practicum.isAvailable && practicum.comingSoon && (
                        <Badge variant="secondary" className="text-xs">
                          {practicum.comingSoon}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl font-heading">
                      {practicum.title}
                    </CardTitle>
                    <CardDescription className="text-sm mt-2">
                      {practicum.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Метаданные */}
                      <div className="flex flex-wrap gap-2">
                        <Badge className={getDifficultyColor(practicum.difficulty)}>
                          {getDifficultyLabel(practicum.difficulty)}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {practicum.duration}
                        </Badge>
                        <Badge variant="outline">
                          {practicum.tasksCount} заданий
                        </Badge>
                      </div>

                      {/* Кнопка действия */}
                      {practicum.isAvailable ? (
                        <Link to={practicum.href || "#"}>
                          <Button className="w-full bg-primary hover:bg-primary/90">
                            Начать практикум
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      ) : (
                        <Button
                          className="w-full"
                          variant="secondary"
                          disabled
                        >
                          <Lock className="mr-2 h-4 w-4" />
                          Скоро
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Информационный блок */}
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
