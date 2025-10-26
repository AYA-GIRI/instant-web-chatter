import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Download, ExternalLink, BookOpen, Zap, Cpu, Network, Lightbulb, BarChart3, Code, Database, Layers, Target, TrendingUp, Brain, FileText, Key, Shield } from "lucide-react";

type MethodCard = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  icon: React.ComponentType<{ className?: string }>;
  level: "beginner" | "intermediate" | "advanced";
  direction: "ai" | "ml" | "neural" | "prompting";
};

const methods: MethodCard[] = [
  {
    id: "1",
    title: "Определение ИИ и машинного обучения",
    description: "Введение в основы искусственного интеллекта и машинного обучения для начинающих специалистов.",
    tags: ["Введение в ИИ", "Основы ML"],
    icon: BookOpen,
    level: "beginner",
    direction: "ai",
  },
  {
    id: "2",
    title: "Сферы машинного обучения",
    description: "Обзор различных областей применения технологий машинного обучения в современном мире.",
    tags: ["Для начинающих"],
    icon: Zap,
    level: "beginner",
    direction: "ml",
  },
  {
    id: "3",
    title: "Искусство промтинга: как общаться с ИИ",
    description: "Подробное руководство по эффективному взаимодействию с AI-моделями через промты.",
    tags: ["Промтинг"],
    icon: Lightbulb,
    level: "beginner",
    direction: "prompting",
  },
  {
    id: "4",
    title: "Виды нейросетей",
    description: "Классификация и особенности различных типов нейронных сетей и их архитектур.",
    tags: ["Нейросети"],
    icon: Network,
    level: "intermediate",
    direction: "neural",
  },
  {
    id: "5",
    title: "Нейросети и языковые модели",
    description: "Углубленное изучение языковых моделей и их применение в современных AI-системах.",
    tags: ["Нейросети", "Языковые модели"],
    icon: Cpu,
    level: "intermediate",
    direction: "neural",
  },
  {
    id: "6",
    title: "Данные для обучения моделей",
    description: "Создание и подготовка датасетов для эффективного обучения AI-моделей.",
    tags: ["Датасеты", "Подготовка данных"],
    icon: Database,
    level: "intermediate",
    direction: "ml",
  },
  {
    id: "7",
    title: "Алгоритмы глубокого обучения",
    description: "Погружение в архитектуры глубоких нейронных сетей и методы их обучения.",
    tags: ["Deep Learning", "Алгоритмы"],
    icon: Layers,
    level: "advanced",
    direction: "neural",
  },
  {
    id: "8",
    title: "Оценка качества моделей",
    description: "Метрики и методы оценки производительности машинного обучения.",
    tags: ["Метрики", "Оценка"],
    icon: BarChart3,
    level: "intermediate",
    direction: "ml",
  },
  {
    id: "9",
    title: "Практика промтинга с GPT",
    description: "Практические примеры и техники промтинга для различных задач.",
    tags: ["Промтинг", "GPT", "Практика"],
    icon: Key,
    level: "beginner",
    direction: "prompting",
  },
  {
    id: "10",
    title: "Computer Vision: основы",
    description: "Обработка и анализ изображений с помощью компьютерного зрения.",
    tags: ["Computer Vision", "Обработка изображений"],
    icon: Target,
    level: "intermediate",
    direction: "ai",
  },
  {
    id: "11",
    title: "Этика в искусственном интеллекте",
    description: "Этические вопросы, bias и ответственность в разработке AI-систем.",
    tags: ["Этика", "AI Ethics"],
    icon: Shield,
    level: "intermediate",
    direction: "ai",
  },
  {
    id: "12",
    title: "Transformer архитектура",
    description: "Deep Dive в архитектуру Transformer и её применение в NLP.",
    tags: ["Transformers", "NLP"],
    icon: Brain,
    level: "advanced",
    direction: "neural",
  },
  {
    id: "13",
    title: "Градиентный спуск и оптимизация",
    description: "Теория и практика алгоритмов оптимизации в машинном обучении.",
    tags: ["Оптимизация", "Gradient Descent"],
    icon: TrendingUp,
    level: "intermediate",
    direction: "ml",
  },
  {
    id: "14",
    title: "MLOps: практика развертывания",
    description: "DevOps для машинного обучения: от обучения до production.",
    tags: ["MLOps", "Deployment"],
    icon: Code,
    level: "advanced",
    direction: "ml",
  },
  {
    id: "15",
    title: "Создание документации для AI проектов",
    description: "Лучшие практики ведения документации в проектах машинного обучения.",
    tags: ["Документация", "Best Practices"],
    icon: FileText,
    level: "beginner",
    direction: "ai",
  },
];

const Methods = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDirection, setSelectedDirection] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedFormat, setSelectedFormat] = useState("all");

  const filteredMethods = methods.filter((method) => {
    const matchesSearch = method.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      method.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDirection = selectedDirection === "all" || method.direction === selectedDirection;
    const matchesLevel = selectedLevel === "all" || method.level === selectedLevel;
    return matchesSearch && matchesDirection && matchesLevel;
  });

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-success text-success-foreground";
      case "intermediate":
        return "bg-primary text-primary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground font-heading">
              Методички и обучающие материалы
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-sans">
              Подберите нужное руководство или инструкцию для вашего направления стажировки
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Поиск по названию или теме"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select value={selectedDirection} onValueChange={setSelectedDirection}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Направление" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все направления</SelectItem>
                  <SelectItem value="ai">ИИ</SelectItem>
                  <SelectItem value="ml">Машинное обучение</SelectItem>
                  <SelectItem value="neural">Нейросети</SelectItem>
                  <SelectItem value="prompting">Промтинг</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Формат" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все форматы</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="video">Видео</SelectItem>
                  <SelectItem value="interactive">Интерактивный</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Уровень" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все уровни</SelectItem>
                  <SelectItem value="beginner">Для начинающих</SelectItem>
                  <SelectItem value="intermediate">Для продолжающих</SelectItem>
                  <SelectItem value="advanced">Продвинутый</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Methods Grid */}
      <section className="pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredMethods.map((method) => {
              const Icon = method.icon;
              return (
                <Card key={method.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-gradient-primary text-primary-foreground">
                        <Icon className="h-8 w-8" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2 font-heading">{method.title}</CardTitle>
                        <CardDescription className="text-sm font-sans">
                          {method.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {method.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="bg-success/10 text-success hover:bg-success/20"
                          >
                            {tag}
                          </Badge>
                        ))}
                        <Badge className={getLevelBadgeColor(method.level)}>
                          {method.level === "beginner" && "Для начинающих"}
                          {method.level === "intermediate" && "Для продолжающих"}
                          {method.level === "advanced" && "Продвинутый"}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Скачать
                        </Button>
                        <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Открыть
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredMethods.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">Ничего не найдено по вашему запросу</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Methods;

