# Настройка переменных окружения

## Файл .env

Файл `.env` был создан автоматически. Вам нужно отредактировать его и указать правильные значения.

### Обязательные переменные:

1. **JWT_SECRET** - секретный ключ для подписи JWT токенов
   - В разработке можно использовать любой строковый ключ
   - В продакшене используйте длинный случайный ключ (минимум 32 символа)
   - Пример генерации: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

2. **DATABASE_URL** - строка подключения к PostgreSQL
   - Формат: `postgresql://user:password@host:port/database`
   - Пример: `postgresql://postgres:mypassword@localhost:5432/CakeGeneration`

3. **DB\_\*** переменные - альтернативный способ настройки БД
   - DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD

### Пример .env файла:

```env
# Database Configuration
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/CakeGeneration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=CakeGeneration
DB_USER=postgres
DB_PASSWORD=your_password

# JWT Secret Key
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Server Configuration
PORT=5000
NODE_ENV=development

# API Keys (опционально)
API_KEY=your_api_key_here
```

## Важно!

1. **Перезапустите сервер** после изменения файла `.env`
2. **Не коммитьте** файл `.env` в git (он должен быть в .gitignore)
3. В продакшене используйте **безопасный JWT_SECRET** (длинный случайный ключ)

## Проверка

После запуска сервера вы должны увидеть в консоли:

```
Сервер запущен → http://localhost:5000
JWT_SECRET: ✅ установлен
```

Если видите `❌ отсутствует`, проверьте файл `.env` и перезапустите сервер.
