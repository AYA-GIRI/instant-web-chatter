import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Sparkles, Zap, Shield, Clock, MessageSquare } from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: Zap,
      title: "Практическое обучение",
      description: "Работа над реальными проектами Texel с использованием ChatGPT, DeepSeek и передовых AI-технологий",
    },
    {
      icon: Shield,
      title: "Опытные наставники",
      description: "Менторские сессии с экспертами Texel и приглашенными специалистами отрасли",
    },
    {
      icon: Clock,
      title: "Гибкий формат",
      description: "Еженедельные мастер-классы, практические сессии и поддержка в разработке собственных стартапов",
    },
    {
      icon: MessageSquare,
      title: "Карьерный рост",
      description: "Возможность трудоустройства в Texel, запуск собственных AI-стартапов и демонстрация работ инвесторам",
    },
  ];

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-foreground space-y-8 animate-in fade-in slide-in-from-left duration-700">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                <span className="text-gradient">Центр разработки</span> <br />
                AI-инноваций Texel
              </h1>
              <p className="text-2xl text-muted-foreground">
                Стажировка по созданию ИИ-инноваций и бизнес-процессов на базе мультиагентных систем с GPT
              </p>

              <ul className="space-y-4 text-lg">
                <li className="flex items-start gap-3">
                  <span className="text-primary text-2xl">•</span>
                  <span>Практический опыт работы с ChatGPT, DeepSeek и передовыми AI-технологиями</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-2xl">•</span>
                  <span>Реальные проекты под руководством экспертов Texel</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-2xl">•</span>
                  <span>Инкубационная программа для AI-стартапов</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-2xl">•</span>
                  <span>Углублённый курс по применению AI для решения бизнес-задач</span>
                </li>
              </ul>

              <div className="flex flex-wrap gap-4">
                <Link to="/practicum">
                  <Button
                    size="lg"
                    className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 active:scale-95"
                  >
                    Подать заявку на стажировку
                  </Button>
                </Link>
                <Link to="/about">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-border text-foreground hover:bg-primary hover:text-white text-lg px-8 py-6 hover:-translate-y-1 transition-all duration-300 active:scale-95"
                  >
                    О программе
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Content - Visual */}
            <div className="relative animate-in fade-in slide-in-from-right duration-700">
              <div className="relative rounded-2xl glass-panel p-8 border border-white/20 animate-float">
                <div className="relative space-y-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
                      <Sparkles className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">AI-ассистент Texel</div>
                      <div className="font-semibold text-foreground">Готов ответить на вопросы</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-secondary rounded-lg p-4 ml-auto max-w-[80%]">
                      <p className="text-sm text-foreground">Расскажите о программе стажировки?</p>
                    </div>
                    <div className="bg-primary/10 rounded-lg p-4 max-w-[90%]">
                      <p className="text-sm text-foreground">
                        Программа стажировки в центре разработки AI-инноваций Texel включает практическую работу с ChatGPT и DeepSeek, участие в реальных проектах компании, менторские сессии и возможность запуска собственных стартапов. Длительность программы — 1 учебный год. Подробнее на странице "О нас".
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-in fade-in duration-700">
            <h2 className="text-4xl font-bold text-foreground mb-4">Возможности программы</h2>
            <p className="text-xl text-muted-foreground">Практическое обучение работе с AI для реальных бизнес-задач</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {features.map((feature, index) => (
              <div
                key={index}
                className="glass-panel rounded-xl p-8 hover:border-primary/50 transition-all hover:shadow-glow hover:-translate-y-2 duration-300 animate-in fade-in slide-in-from-bottom"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-12 px-4">
        <div className="container mx-auto max-w-6xl text-center animate-in fade-in duration-700">
          <h2 className="text-4xl font-bold text-foreground mb-4">О нас</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Центр разработки AI-инноваций Texel — уникальная программа стажировки для студентов и молодых специалистов,
            направленная на практическое освоение передовых AI-технологий (ChatGPT, DeepSeek) и участие в реальных
            проектах компании. Мы создаём новое поколение специалистов с суперспособностями в применении AI для решения
            сложных бизнес-задач.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/about">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6 shadow-lg"
              >
                Узнать больше о нас
              </Button>
            </Link>
            <Link to="/methods">
              <Button
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-muted text-lg px-8 py-6"
              >
                Методические материалы
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 bg-secondary/30">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2025 Internium. Центр разработки AI-инноваций Texel. Программа стажировки с GPT.</p>
          <p className="text-sm mt-2">
            Бизнес-проект по созданию центра разработки ИИ-инноваций и стажировок с GPT
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
