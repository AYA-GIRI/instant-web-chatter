import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, Code2, BarChart3, Megaphone, Palette, Bug } from 'lucide-react';

type SpecialtyRole = 'developer' | 'analyst' | 'marketer' | 'designer' | 'tester';

const ROLE_CONFIG: {
  id: SpecialtyRole;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    id: 'developer',
    title: 'Разработчик',
    description: 'Применение AI для написания, анализа и рефакторинга кода, генерации тестов и SQL-запросов.',
    icon: Code2,
  },
  {
    id: 'analyst',
    title: 'Аналитик',
    description: 'Использование AI для анализа данных, подготовки отчётов, формулировки выводов и гипотез.',
    icon: BarChart3,
  },
  {
    id: 'marketer',
    title: 'Маркетолог',
    description: 'AI для генерации офферов, контента, идей кампаний и ускорения маркетингового ресёрча.',
    icon: Megaphone,
  },
  {
    id: 'designer',
    title: 'Дизайнер',
    description: 'AI как помощник в поиске референсов, концепций и подготовке материалов для презентаций.',
    icon: Palette,
  },
  {
    id: 'tester',
    title: 'Тестировщик',
    description: 'AI для генерации тест-кейсов, сценариев, баг-репортов и расширения покрытия проверок.',
    icon: Bug,
  },
];

const RoleSelection = () => {
  const { user, profile, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<SpecialtyRole | null>(null);
  const [saving, setSaving] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="mt-4 text-muted-foreground">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (profile && profile.specialty_role) {
    navigate('/practicum', { replace: true });
    return null;
  }

  const handleSave = async () => {
    if (!selectedRole) return;
    setSaving(true);
    try {
      await updateProfile({ specialty_role: selectedRole });
      navigate('/practicum', { replace: true });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden">
      <Navigation />

      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4">
              Шаг 2 из 2
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Выберите свою профессиональную роль
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Платформа настраивает практикумы под типовые сценарии вашей профессии. Это не влияет на
              права доступа, только на содержательную часть обучения.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {ROLE_CONFIG.map((role) => {
              const Icon = role.icon;
              const isActive = selectedRole === role.id;

              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  className={`text-left group rounded-xl border glass-panel transition-all ${
                    isActive
                      ? 'border-primary shadow-lg ring-2 ring-primary/30'
                      : 'border-white/40 hover:border-primary/50 hover:shadow-md'
                  }`}
                >
                  <Card className="bg-transparent border-none shadow-none h-full">
                    <CardHeader className="flex flex-row items-center gap-3 pb-2">
                      <div className="h-11 w-11 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-semibold">{role.title}</CardTitle>
                        <CardDescription className="text-xs">
                          {role.id === 'developer' && 'Код, системы, продукты'}
                          {role.id === 'analyst' && 'Данные, отчёты, выводы'}
                          {role.id === 'marketer' && 'Тексты, кампании, гипотезы'}
                          {role.id === 'designer' && 'Визуал, концепции, референсы'}
                          {role.id === 'tester' && 'Проверки, сценарии, качество'}
                        </CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{role.description}</p>
                    </CardContent>
                  </Card>
                </button>
              );
            })}
          </div>

          <div className="max-w-2xl mx-auto flex flex-col items-center gap-3">
            <Button
              disabled={!selectedRole || saving}
              onClick={handleSave}
              className="w-full md:w-auto px-8"
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Сохранение...
                </>
              ) : (
                'Продолжить к практикуму'
              )}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Роль можно будет изменить позже в профиле или через администратора.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RoleSelection;

