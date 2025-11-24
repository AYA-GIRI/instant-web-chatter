# Supabase Migrations Guide

## Применение миграций

Эти SQL миграции нужно выполнить в вашем Supabase проекте для создания необходимых таблиц и настройки Row Level Security (RLS).

### Способ 1: Через Supabase Dashboard (рекомендуется)

1. Откройте [Supabase Dashboard](https://app.supabase.com)
2. Выберите ваш проект
3. Перейдите в **SQL Editor**
4. Выполните миграции в следующем порядке:

#### Шаг 1: Создание таблицы profiles
Скопируйте и выполните содержимое файла:
```
supabase/migrations/20250124_create_profiles.sql
```

#### Шаг 2: Создание таблицы applications
Скопируйте и выполните содержимое файла:
```
supabase/migrations/20250124_create_applications.sql
```

#### Шаг 3: Создание таблицы user_progress
Скопируйте и выполните содержимое файла:
```
supabase/migrations/20250124_create_user_progress.sql
```

### Способ 2: Через Supabase CLI

Если у вас установлен Supabase CLI:

```bash
# Инициализация (если еще не сделано)
supabase init

# Линк к вашему проекту
supabase link --project-ref YOUR_PROJECT_REF

# Применить миграции
supabase db push
```

---

## Настройка Google OAuth

### 1. Создание OAuth credentials в Google Cloud Console

1. Перейдите в [Google Cloud Console](https://console.cloud.google.com/)
2. Создайте новый проект или выберите существующий
3. Включите **Google+ API**
4. Перейдите в **APIs & Services** → **Credentials**
5. Нажмите **Create Credentials** → **OAuth client ID**
6. Выберите **Web application**
7. Добавьте **Authorized redirect URIs**:
   - Для разработки: `http://localhost:8083/auth/callback`
   - Для продакшена: `https://yourdomain.com/auth/callback`
   - **Supabase redirect**: `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`
8. Сохраните **Client ID** и **Client Secret**

### 2. Настройка в Supabase Dashboard

1. Откройте [Supabase Dashboard](https://app.supabase.com)
2. Выберите ваш проект
3. Перейдите в **Authentication** → **Providers**
4. Найдите **Google** и включите его
5. Вставьте **Client ID** и **Client Secret** из Google Cloud Console
6. Сохраните изменения

---

## Создание первого админа

После применения миграций нужно вручную создать первого администратора:

### Через SQL Editor:

```sql
-- Замените 'YOUR_USER_ID' на ID вашего пользователя
-- ID можно найти в таблице auth.users после регистрации
UPDATE profiles
SET role = 'admin'
WHERE id = 'YOUR_USER_ID';
```

### Как получить YOUR_USER_ID:

1. Зарегистрируйтесь в приложении
2. Перейдите в **Table Editor** → **auth.users**
3. Найдите свою запись и скопируйте **id**
4. Выполните SQL выше с этим ID

---

## Проверка миграций

После применения миграций проверьте:

### 1. Таблицы созданы
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
AND table_name IN ('profiles', 'applications', 'user_progress');
```

### 2. RLS включен
```sql
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public'
AND tablename IN ('profiles', 'applications', 'user_progress');
```

### 3. Policies созданы
```sql
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE tablename IN ('profiles', 'applications', 'user_progress');
```

---

## Troubleshooting

### Ошибка: "relation already exists"
Таблица уже существует. Удалите её перед повторным применением:
```sql
DROP TABLE IF EXISTS table_name CASCADE;
```

### Ошибка: "permission denied"
Убедитесь, что вы используете правильные credentials и имеете права администратора.

### Trigger не срабатывает
Проверьте, что функция создана:
```sql
SELECT proname FROM pg_proc WHERE proname LIKE 'handle_%';
```

---

## Email Templates (опционально)

Настройте шаблоны писем в **Authentication** → **Email Templates**:

- **Confirm signup** - подтверждение регистрации
- **Magic Link** - вход по ссылке
- **Change Email Address** - смена email
- **Reset Password** - сброс пароля

---

## Следующие шаги

После применения миграций и настройки OAuth:

1. ✅ Миграции применены
2. ✅ Google OAuth настроен
3. ✅ AuthProvider интегрирован в App.tsx
4. ⏳ Создать UI компоненты для аутентификации
5. ⏳ Создать защищенные маршруты
6. ⏳ Создать админ-панель
