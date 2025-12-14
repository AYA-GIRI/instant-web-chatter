import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Sparkles, Target, Award, Users, GraduationCap, TrendingUp } from "lucide-react";

const About = () => {
  const stats = [
    { icon: GraduationCap, value: "20+", label: "Стажёров в наборе" },
    { icon: Users, value: "5+", label: "Опытных наставников" },
    { icon: Sparkles, value: "1 год", label: "Длительность программы" },
    { icon: TrendingUp, value: "100%", label: "Практика на реальных проектах" },
  ];

  const achievements = [
    {
      icon: Award,
      title: "Практическое обучение",
      description: "Участие в реальных проектах Texel с применением ChatGPT и DeepSeek для решения бизнес-задач",
    },
    {
      icon: Target,
      title: "Менторская поддержка",
      description: "Работа с экспертами Texel и приглашенными специалистами для развития навыков работы с AI",
    },
    {
      icon: Sparkles,
      title: "Инкубатор стартапов",
      description: "Возможность создать собственный AI-стартап с доступом к технологиям и экспертизе Texel",
    },
    {
      icon: MessageSquare,
      title: "Карьерное развитие",
      description: "Демо-дни с потенциальными работодателями, трудоустройство в Texel или запуск собственного бизнеса",
    },
  ];

  return (
    <div className="min-h-screen bg-transparent">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-8 mb-16">
            <div className="inline-flex h-20 w-20 rounded-2xl bg-primary items-center justify-center shadow-lg">
              <Sparkles className="h-10 w-10 text-primary-foreground" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground font-heading">
              Центр разработки AI-инноваций Texel
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-sans">
              Программа стажировки по созданию ИИ-инноваций и бизнес-процессов
              на базе мультиагентных систем с GPT для студентов и молодых специалистов
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="glass-panel border-white/40">
                  <CardHeader className="text-center">
                    <div className="inline-flex h-12 w-12 rounded-lg bg-primary/10 items-center justify-center mb-4 mx-auto">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-3xl font-bold text-foreground">{stat.value}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">{stat.label}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>

          {/* Relevance & Problematics */}
          <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground font-heading">
                Актуальность
              </h2>
              <ul className="space-y-4 text-lg text-foreground font-sans list-disc pl-5">
                <li>Стремительное развитие технологий ИИ создает высокий спрос на специалистов, умеющих эффективно работать с инструментами искусственного интеллекта.</li>
                <li>Компании и стартапы ищут сотрудников, которые могут использовать ИИ как усилитель производительности и инноваций.</li>
                <li>Texel предлагает уникальное сочетание экспертизы в области компьютерного зрения, 3D-моделирования и ИИ.</li>
                <li>Модель обучения, основанная на работе с реальными проектами под руководством опытных наставников, доказала свою эффективность.</li>
              </ul>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground font-heading">
                Проблематика
              </h2>
              <ul className="space-y-4 text-lg text-muted-foreground font-sans list-disc pl-5">
                <li>Студенты часто не могут применить теоретические знания на практике из-за отсутствия реальных проектов.</li>
                <li>Традиционные образовательные программы не успевают за развитием технологий ИИ (ChatGPT, DeepSeek).</li>
                <li>Начинающим предпринимателям не хватает поддержки и ресурсов для развития ИИ-проектов.</li>
                <li>Навыки работы с ИИ крайне востребованы, но качественное обучение часто недоступно или фрагментировано.</li>
              </ul>
            </div>
          </div>

          {/* Goals */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12 font-heading">
              Цели программы
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="glass-panel border-white/40">
                <CardHeader>
                  <div className="inline-flex h-12 w-12 rounded-lg bg-primary/10 items-center justify-center mb-4">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-heading">Центр разработки</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground font-sans">
                    Создать центр разработки ИИ-инноваций на базе Texel, где участники получат практический опыт с ChatGPT и DeepSeek.
                  </p>
                </CardContent>
              </Card>
              <Card className="glass-panel border-white/40">
                <CardHeader>
                  <div className="inline-flex h-12 w-12 rounded-lg bg-primary/10 items-center justify-center mb-4">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-heading">Программа стажировки</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground font-sans">
                    Внедрить структурированную программу, сочетающую обучение и участие в реальных проектах Texel.
                  </p>
                </CardContent>
              </Card>
              <Card className="glass-panel border-white/40">
                <CardHeader>
                  <div className="inline-flex h-12 w-12 rounded-lg bg-primary/10 items-center justify-center mb-4">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-heading">Инкубатор стартапов</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground font-sans">
                    Создать среду, где участники смогут разрабатывать собственные проекты под руководством экспертов.
                  </p>
                </CardContent>
              </Card>
              <Card className="glass-panel border-white/40">
                <CardHeader>
                  <div className="inline-flex h-12 w-12 rounded-lg bg-primary/10 items-center justify-center mb-4">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-heading">Углублённый курс</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground font-sans">
                    Дать возможность пройти курс по ChatGPT и DeepSeek для развития «суперспособностей» в решении сложных задач.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Key Tasks */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12 font-heading">
              Ключевые задачи
            </h2>
            <div className="space-y-8">
              <div className="bg-card/50 p-6 rounded-xl border border-border/50">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Users className="text-primary" /> 1. Организация и запуск центра</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Разработка программы стажировки с четкими целями и критериями оценки.</li>
                  <li>Создание среды для сотрудничества между стажерами и экспертами Texel.</li>
                  <li>Разработка учебных материалов по продвинутым техникам ИИ.</li>
                </ul>
              </div>
              <div className="bg-card/50 p-6 rounded-xl border border-border/50">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><GraduationCap className="text-primary" /> 2. Реализация учебной программы</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Еженедельные мастер-классы и практические сессии по ИИ.</li>
                  <li>Менторские сессии с экспертами для обсуждения проектов и обратной связи.</li>
                </ul>
              </div>
              <div className="bg-card/50 p-6 rounded-xl border border-border/50">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><TrendingUp className="text-primary" /> 3. Практическая работа над проектами</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Интеграция стажеров в рабочие процессы Texel (маркетинг, разработка, исследования).</li>
                  <li>Реализация собственных проектов участников с поддержкой экспертов.</li>
                </ul>
              </div>
              <div className="bg-card/50 p-6 rounded-xl border border-border/50">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Award className="text-primary" /> 4. Демонстрация результатов и трудоустройство</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Проведение демо-дней перед руководством и инвесторами.</li>
                  <li>Содействие в трудоустройстве лучших участников в Texel или партнерские компании.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Expected Results */}
          <div className="mb-16 bg-primary/5 p-8 rounded-2xl border border-primary/10">
            <h2 className="text-3xl font-bold text-foreground text-center mb-8 font-heading">
              Ожидаемый продуктовый результат
            </h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl mb-4">🏢</div>
                <p className="text-lg font-medium">Действующий центр разработки ИИ-инноваций с регулярными наборами.</p>
              </div>
              <div>
                <div className="text-4xl mb-4">💼</div>
                <p className="text-lg font-medium">База успешных кейсов и проектов, реализованных стажерами.</p>
              </div>
              <div>
                <div className="text-4xl mb-4">🚀</div>
                <p className="text-lg font-medium">Инкубационная программа для ИИ-стартапов с доступом к технологиям.</p>
              </div>
            </div>
          </div>

          {/* Expertise */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12 font-heading">
              Для кого программа
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-primary border-0">
                <CardHeader>
                  <CardTitle className="text-xl text-primary-foreground font-heading">Студентам</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-primary-foreground font-sans">
                    Возможность применить теоретические знания на практике, получить реальный
                    опыт работы с AI и построить карьеру в технологической индустрии
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-panel border-white/40">
                <CardHeader>
                  <CardTitle className="text-xl font-heading">Начинающим специалистам</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground font-sans">
                    Погружение в передовые AI-технологии (ChatGPT, DeepSeek), развитие практических
                    навыков и суперспособностей в применении ИИ для решения задач
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-primary border-0">
                <CardHeader>
                  <CardTitle className="text-xl text-primary-foreground font-heading">Предпринимателям</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-primary-foreground font-sans">
                    Инкубационная программа для запуска собственных AI-стартапов с поддержкой
                    экспертов и доступом к технологиям Texel
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-primary p-8 rounded-2xl">
            <h2 className="text-3xl font-bold text-primary-foreground mb-4 font-heading">
              Готовы начать стажировку?
            </h2>
            <p className="text-lg text-primary-foreground mb-6 max-w-2xl mx-auto font-sans">
              Подайте заявку на участие в программе стажировки по созданию AI-инноваций и получите
              практический опыт работы с ChatGPT, DeepSeek и передовыми AI-технологиями
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-white hover:bg-white/90 text-primary shadow-lg">
                Подать заявку
              </Button>
              <Link to="/methods">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/0">
                  Методические материалы
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

