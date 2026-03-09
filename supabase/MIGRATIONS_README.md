# Supabase Migrations Guide

## Структура миграций

```
supabase/migrations/
├── 20250124_01_create_profiles.sql    # Профили пользователей + is_admin() функция
├── 20250125_04_create_methods.sql     # Методички
├── 20250125_05_setup_storage_bucket.sql # Storage для файлов
├── 20250125_06_seed_methods.sql       # Начальные данные методичек
├── 20250126_create_applications.sql   # Заявки на стажировку
└── 20250127_create_user_progress.sql  # Прогресс пользователей
```

## Применение миграций

### Способ 1: Через Supabase CLI (рекомендуется)

```bash
# Логин в Supabase
supabase login

# Линк к проекту
supabase link --project-ref YOUR_PROJECT_REF

# Применить все миграции
supabase db push
```

### Способ 2: Через Supabase Dashboard

1. Откройте [Supabase Dashboard](https://app.supabase.com)
2. Перейдите в **SQL Editor**
3. Выполните миграции **в порядке их нумерации**

---

## База данных

### Таблицы

| Таблица | Описание |
|---------|----------|
| `profiles` | Профили пользователей (роли: student, employee, admin) |
| `methods` | Методички (уровни: beginner, intermediate, advanced) |
| `applications` | Заявки на стажировку |
| `user_progress` | Прогресс по заданиям практикума |

### Функции

| Функция | Описание |
|---------|----------|
| `is_admin()` | Проверка роли админа (SECURITY DEFINER, избегает рекурсии RLS) |
| `handle_new_user()` | Автосоздание профиля при регистрации |
| `handle_updated_at()` | Автообновление `updated_at` |
| `handle_progress_completion()` | Автозаполнение `completed_at` |

### Storage Buckets

| Bucket | Описание | Доступ |
|--------|----------|--------|
| `methods` | Файлы методичек (PDF, DOC) | Чтение: все, Запись: админы |

---

## Настройка Google OAuth

### 1. Google Cloud Console

1. [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials
2. Create Credentials → OAuth client ID → Web application
3. Authorized redirect URIs:
   - `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`

### 2. Supabase Dashboard

1. Authentication → Providers → Google
2. Вставьте Client ID и Client Secret

---

## Создание первого админа

```sql
-- Найдите ID пользователя в auth.users, затем:
UPDATE profiles
SET role = 'admin'
WHERE id = 'YOUR_USER_ID';
```

---

## Проверка

```sql
-- Таблицы
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';

-- RLS включен
SELECT tablename, rowsecurity FROM pg_tables 
WHERE schemaname = 'public';

-- Policies
SELECT tablename, policyname FROM pg_policies 
WHERE schemaname = 'public';
```

---

## Troubleshooting

### "relation already exists"
```sql
DROP TABLE IF EXISTS table_name CASCADE;
```

### Проверить функции
```sql
SELECT proname FROM pg_proc WHERE proname LIKE 'handle_%' OR proname = 'is_admin';
```
