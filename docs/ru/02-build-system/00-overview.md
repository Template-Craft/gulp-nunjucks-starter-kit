# Build System Overview

Build System — центральная часть проекта. В отличие от обычных сборщиков, она работает не только с файлами, но и с архитектурными сущностями: Pages, Sections, Components, Templates, Data.

## Основные задачи

- подготовка окружения сборки;
- обработка ресурсов проекта;
- построение HTML-страниц;
- анализ архитектурных зависимостей;
- инкрементальная пересборка;
- dev-сервер и наблюдение за изменениями.

## Архитектурный подход

Build System не требует конфигурации структуры проекта — вместо этого она использует соглашения об именовании, структуру каталогов и Template API, чтобы самостоятельно определять сущности и связи между ними.

## Жизненный цикл сборки

```text
Source Files
      │
      ▼
Reset Output Directory
      │
      ▼
Process Assets
      │
      ▼
Render Templates
      │
      ▼
Write Output
      │
      ▼
Development Server / Watch Mode
```

## Внутренние механизмы

- Template API;
- Build Pipeline;
- Dependency Graph;
- Incremental Build;
- Watch Mode.

Каждый рассмотрен подробно в следующих разделах.
