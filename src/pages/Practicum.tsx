import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, TrendingUp, BookOpen, Code, Zap, Target, Sparkles, Circle } from "lucide-react";

type Task = {
  id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  category: "python" | "ml" | "data" | "ai";
  duration: string;
  status: "completed" | "in-progress" | "todo";
  tags: string[];
};

const tasks: Task[] = [];

const Practicum = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const filteredTasks = tasks.filter((task) => {
    const matchesCategory = selectedCategory === "all" || task.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "all" || task.difficulty === selectedDifficulty;
    const matchesStatus = selectedStatus === "all" || task.status === selectedStatus;
    return matchesCategory && matchesDifficulty && matchesStatus;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-success text-success-foreground";
      case "medium":
        return "bg-primary text-primary-foreground";
      case "hard":
        return "bg-accent text-accent-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-success" />;
      case "in-progress":
        return <Clock className="h-5 w-5 text-primary" />;
      default:
        return <Circle className="h-5 w-5 text-muted-foreground" />;
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
              Практические задания и задачи для развития навыков в области AI и машинного обучения
            </p>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-border rounded-lg bg-card text-foreground"
            >
              <option value="all">Все категории</option>
              <option value="python">Python</option>
              <option value="data">Data Science</option>
              <option value="ml">Machine Learning</option>
              <option value="ai">AI</option>
            </select>

            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-4 py-2 border border-border rounded-lg bg-card text-foreground"
            >
              <option value="all">Все уровни</option>
              <option value="easy">Легкий</option>
              <option value="medium">Средний</option>
              <option value="hard">Сложный</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-border rounded-lg bg-card text-foreground"
            >
              <option value="all">Все статусы</option>
              <option value="todo">К выполнению</option>
              <option value="in-progress">В процессе</option>
              <option value="completed">Завершено</option>
            </select>
          </div>
        </div>
      </section>

      {/* Tasks Grid */}
      <section className="pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex h-16 w-16 rounded-2xl bg-secondary items-center justify-center mb-6">
                <BookOpen className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Задания появятся здесь
              </h3>
              <p className="text-muted-foreground">
                Практические задания будут добавлены в ближайшее время
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTasks.map((task) => {
                const DifficultyIcon =
                  task.difficulty === "easy"
                    ? CheckCircle2
                    : task.difficulty === "medium"
                      ? TrendingUp
                      : Zap;
                const CategoryIcon =
                  task.category === "python"
                    ? Code
                    : task.category === "data"
                      ? TrendingUp
                      : task.category === "ml"
                        ? Target
                        : Sparkles;

                return (
                  <Card
                    key={task.id}
                    className="glass-panel hover:border-primary transition-all hover:shadow-lg border-white/40"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-12 w-12 rounded-lg flex items-center justify-center ${task.category === "python"
                              ? "bg-blue-500/10"
                              : task.category === "data"
                                ? "bg-green-500/10"
                                : task.category === "ml"
                                  ? "bg-purple-500/10"
                                  : "bg-primary/10"
                              }`}
                          >
                            <CategoryIcon
                              className={`h-6 w-6 ${task.category === "python"
                                ? "text-blue-500"
                                : task.category === "data"
                                  ? "text-green-500"
                                  : task.category === "ml"
                                    ? "text-purple-500"
                                    : "text-primary"
                                }`}
                            />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{task.title}</CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-muted-foreground">
                                {task.duration}
                              </span>
                              <Badge className={getDifficultyColor(task.difficulty)}>
                                {task.difficulty === "easy"
                                  ? "Легко"
                                  : task.difficulty === "medium"
                                    ? "Средне"
                                    : "Сложно"}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        {getStatusIcon(task.status)}
                      </div>
                      <CardDescription>{task.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {task.tags.map((tag, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                        {task.status === "completed"
                          ? "Повторить"
                          : task.status === "in-progress"
                            ? "Продолжить"
                            : "Начать"}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Practicum;

