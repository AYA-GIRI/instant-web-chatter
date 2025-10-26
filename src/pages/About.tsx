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
    <div className="min-h-screen bg-background">
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
                <Card key={index} className="bg-card/50 backdrop-blur-sm border-border">
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

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground font-heading">
                О программе стажировки
              </h2>
              <p className="text-lg text-foreground font-sans">
                <strong>Internium</strong> — это инновационная платформа для стажировки студентов и молодых специалистов 
                в центре разработки AI-инноваций Texel. Мы создаём новое поколение профессионалов, владеющих 
                передовыми AI-технологиями (ChatGPT, DeepSeek) и способных применять их для решения сложных бизнес-задач.
              </p>
              <p className="text-lg text-foreground font-sans">
                Программа сочетает практическое обучение с реальными проектами компании, менторские сессии 
                и возможность запуска собственных AI-стартапов. Длительность программы — 1 учебный год.
              </p>
            </div>

            <Card className="bg-primary p-8 border-0">
              <CardHeader>
                <CardTitle className="text-2xl text-primary-foreground mb-4 font-heading">
                  Структура программы
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-primary-foreground font-sans">
                  <li className="flex items-start gap-3">
                    <span className="text-accent text-2xl">•</span>
                    <span><strong>Неделя 1-12:</strong> Интенсив по ChatGPT, DeepSeek и основам мультиагентных систем</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent text-2xl">•</span>
                    <span><strong>Неделя 13-26:</strong> Участие в реальных проектах Texel, решение бизнес-задач</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent text-2xl">•</span>
                    <span><strong>Неделя 27-39:</strong> Разработка собственных AI-стартапов под руководством менторов</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent text-2xl">•</span>
                    <span><strong>Неделя 40-52:</strong> Демо-дни, презентация проектов инвесторам, трудоустройство</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Achievements */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12 font-heading">
              Ключевые направления программы
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <Card key={index} className="bg-card/50 backdrop-blur-sm hover:border-primary transition-all">
                    <CardHeader>
                      <div className="inline-flex h-12 w-12 rounded-lg bg-primary/10 items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl font-heading">{achievement.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base font-sans">
                        {achievement.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
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

              <Card className="bg-card/50 backdrop-blur-sm border-border">
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

