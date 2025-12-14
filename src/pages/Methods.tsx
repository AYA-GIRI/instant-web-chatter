import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Download, ExternalLink } from "lucide-react";
import { useMethods, type Method } from "@/hooks/useMethods";
import { getIconByName, downloadMethodFile, openMethodFile, getMethodFileUrl } from "@/utils/methods";
import { useToast } from "@/hooks/use-toast";

const Methods = () => {
  const { methods, loading, error } = useMethods();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDirection, setSelectedDirection] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedFormat, setSelectedFormat] = useState("all");

  const filteredMethods = methods.filter((method) => {
    const matchesSearch = method.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (method.description && method.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDirection = selectedDirection === "all" || method.direction === selectedDirection;
    const matchesLevel = selectedLevel === "all" || method.level === selectedLevel;
    const matchesFormat = selectedFormat === "all" || method.format === selectedFormat;
    return matchesSearch && matchesDirection && matchesLevel && matchesFormat;
  });

  const handleDownload = async (method: Method) => {
    if (!method.file_url) {
      toast({
        title: "Ошибка",
        description: "Файл не найден",
        variant: "destructive",
      });
      return;
    }

    try {
      await downloadMethodFile(method.file_url, method.file_name || `${method.title}.pdf`);
      toast({
        title: "Успешно",
        description: "Файл скачивается",
      });
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось скачать файл",
        variant: "destructive",
      });
    }
  };

  const handleOpen = (method: Method) => {
    if (!method.file_url) {
      toast({
        title: "Ошибка",
        description: "Файл не найден",
        variant: "destructive",
      });
      return;
    }

    openMethodFile(method.file_url);
  };

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
    <div className="min-h-screen bg-transparent">
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
          {loading && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">Загрузка методичек...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-destructive text-lg">Ошибка загрузки: {error.message}</p>
            </div>
          )}

          {!loading && !error && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredMethods.map((method) => {
                  const Icon = getIconByName(method.icon_name);
                  const hasFile = !!method.file_url;
                  
                  return (
                    <Card key={method.id} className="glass-panel hover:shadow-lg transition-shadow border-white/40">
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-lg bg-gradient-primary text-primary-foreground">
                            <Icon className="h-8 w-8" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-xl mb-2 font-heading">{method.title}</CardTitle>
                            <CardDescription className="text-sm font-sans">
                              {method.description || "Описание отсутствует"}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex flex-wrap gap-2">
                            {method.tags && method.tags.length > 0 && method.tags.map((tag) => (
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
                              onClick={() => handleDownload(method)}
                              disabled={!hasFile}
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Скачать
                            </Button>
                            <Button
                              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                              onClick={() => handleOpen(method)}
                              disabled={!hasFile}
                            >
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
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Methods;

