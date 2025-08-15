# Журнал изменений (Changelog)

Все значимые изменения в этом проекте документируются в этом файле.

## v2025.08.12 – 2025-08-12

> Релиз, включающий все последние доработки. Акцент — на быстрой и предсказуемой сборке в dev, паритете скорости для лендингов и многостраничных сайтов, и прозрачной модели зависимостей Nunjucks.

### Впервые добавлено (новые подсистемы)

- **Карта зависимостей страниц** между тремя сущностями: компоненты (`components/**`), секции (`sections/**`) и шаблоны (`templates/**`).
  - Модули: `buildDependencyMap.mjs`, `findComponentUsages.mjs`, `findSectionUsages.mjs`, `findTemplatesUsages.mjs`.
  - Поддержка двух режимов секций: одиночный (`sections/_name.njk`) и многостраничный (`sections/<pageName>/_name.njk`). Учитывается флаг `isMultipage` из `config/settings.mjs`.
  - Соблюдение правил проекта: файлы в `templates/` **не вызывают** компоненты и **не используют** `getComponent(...)`; наоборот, **могут быть вызваны** страницами, секциями, компонентами и другими шаблонами через прямые `include/import`.
- **Инкрементальное обновление карты зависимостей**: `updateDependencyMap.mjs`
  - Обновляет связи только для затронутой сущности (`type: component/section/template`, `name`).
  - Если использования отсутствуют — удаляет элемент из карты (без «мертвых» узлов).
  - Унифицировано с остальными find-модулями; параметр `filePath` больше не нужен.
- **Кэш зависимостей**: `dependencyCache.mjs`
  - Памятный кэш итоговой карты зависимостей с лимитом ~300 МБ (лимит настраивается в `config/settings.mjs`) _settings.cache.maxMemoryMB_ и защитой от превышения памяти.
  - Строгая проверка равенства карт (`isSameMap`) перед записью — предотвращает лишние операции.
  - Анти‑спам логирование; хиты кэша видны в логах (по запросу).
  - Автоинициализация, защитa от повторных вызовов `setDependencyCache`.

### Изменено / Улучшено

- **Шаблонный рендер (Nunjucks):** в `gulp/tasks/templates.mjs` реализована точечная пересборка страниц на основе карты зависимостей.
  - JSON c именем страницы (`pages/<name>.njk`) -> пересборка только этой страницы.
  - JSON, совпадающий с именем компонента/секции/шаблона -> пересборка страниц, где они используются.
  - Глобальные JSON (`Global.json`, `Common.json`) -> полная пересборка.
  - Используется `getSectionNameFromPath.mjs` для корректного извлечения имени секции.
- **Поиск использований:**
  - `findSectionUsages` учитывает компоненты и шаблоны **внутри секций**, корректно строя цепочки _компонент -> секция -> страница_ и _шаблон -> секция -> страница_.
  - `findComponentUsages` игнорирует `templates/**` (по правилу проекта шаблоны не вызывают компоненты) — меньше I/O, быстрее сканирование.
- **Dev/Build‑паритет и производительность:**
  - **Styles (SCSS/PostCSS):** `cssnano` отключён в **dev**, оставлен только для **build**. Компиляция идёт от единственного входа `main.scss`, sourcemaps быстрые.
  - **JavaScript (webpack):** для **dev** включены быстрые sourcemaps `eval-cheap-module-source-map` и persistent cache `cache: { type: 'filesystem' }`; упрощены и исправлены алиасы для резолва от корня проекта; добавлен `cacheDirectory: true` для `babel-loader` (если используется).
  - **Ассеты (изображения/шрифты):** копируются только изменённые файлы (`since: lastRun(task)`), что снижает I/O в dev.
  - **HTML:** beautify/pretty‑print выполняется **только** в build (в dev снят как «дорогая» операция).

### Исправлено

- **resolveRenderTargets / templates.mjs:**
  - Исправлена ошибка `Cannot read properties of undefined (reading 'get')` при отсутствии `dependencyMap.templates`.
  - Корректная обработка случая, когда `dependentPages` пуст — сборка не запускается зря.
  - Исключено попадание служебных файлов вроде `_section.html` в цели рендера.
- **findSectionUsages:** удалён прежний игнор, из‑за которого не находились шаблоны внутри секций; добавлены корректные связи с разворотом в страницы.
- **dependencyCache:** защита от дублирующих `setDependencyCache`, контроль объёма памяти, аккуратные логи.
- **Dev‑сервер:** опечатка `posrt` → `port`.
- **Webpack resolve.alias:** пути исправлены и упрощены (резолв от корня проекта, без абсолютных `/node_modules` и т.п.).

### Документация

- Добавлены:
  - `docs/build-system.ru.md` — описание модулей `gulp/utils/*`, схемы пересборки и рекомендаций по производительности.
  - Обновлён `CHANGELOG.md` (этот файл): впервые зафиксированы все сделанные изменения.

### Обратная совместимость

- Ломающих изменений нет. Существующие пути и конфигурации сохраняют обратную совместимость.
- Правила проекта для `templates/` задокументированы и используются в логике поиска.

### Рекомендации по апгрейду

- Перед стартом dev: убедиться, что glob `src/views/pages/**/*.njk` и `cwd` процесса корректны для вашего окружения.
- Проверьте алиасы webpack после обновления (должны указывать относительно корня проекта).
- В dev убедитесь, что `cssnano` отключён, а persistent cache webpack включён — это ключ к быстрым пересборкам.

### Производительность (ожидаемый эффект)

- Заметно более быстрые правки в **dev** за счёт:
  - инкрементальной пересборки страниц,
  - отключения «дорогих» операций в dev (cssnano, HTML beautify),
  - ускоренного JS‑пайплайна (sourcemaps + persistent cache),
  - уменьшения лишнего I/O в поисках и ассетах.
- Паритет скорости и поведения для лендингов и многостраничных проектов.

## 2025.08.12.1 - 2025-08-12

> _FIXED_: Ошибка нейминга в yagrs choises вместо choices [commit](https://github.com/Template-Craft/gulp-nunjucks-starter-kit/commit/68cdca62530adaa486a6f5319604e9840d783685)

## 2025.08.12.2 - 2025-08-13

> _FIXED_ Исправлен неправильный вывод оповещений. При фатальной ошибке запуска выводилось оповещение об успешном старте проекта или сборке. Так же исправлен вывод приветственного оповещения в dev режиме + при ошибке старта сервера так же выводится оповещение [commit](https://github.com/Template-Craft/gulp-nunjucks-starter-kit/commit/5f78d6bd3c5d61e07e9613b4b2e07f55d91d465c)

> _FIXED_ Добавлен монитор ресурсов как отдельный таск для gulp, присылает оповещения при нагрузке на RAM/CPU. Настройки лежат в **gulp/config/settings.mjs** [commit](https://github.com/Template-Craft/gulp-nunjucks-starter-kit/commit/b36ddc7db1a1b3ba1dceb7c5018ebcaeb15b75da)

> _FIXED_ Мелкая правка в **gulp/utils/updateDependencyMap.mjs** неправильный лог [commit](https://github.com/Template-Craft/gulp-nunjucks-starter-kit/commit/ff139b563d6cb3c0d2ef1620484809a77fd05118)

## 2025.08.12.3 - 2025-08-14/2025-08-15

> _FIXED_ Небольшая правка файла .nvmrc - соответствие с заявленным описанием в readme.md и настройками engine в package.json [commit](https://github.com/Template-Craft/gulp-nunjucks-starter-kit/commit/3e5178e7a5ce65573a857f58ef95229427e16868)

> _FIXED_ Исправлена ошибка choises - choices. В командах handler теперь асинхронная с динамическим импортом модуля необходимого для данной команды. В глобальной опции и в imagemin coerce - теперь нормализует пути. [](https://github.com/Template-Craft/gulp-nunjucks-starter-kit/commit/55c61b3684bb20c357f3b318e77fd2af4f4f687b)

> _FIXED_ Нормализация путей при создании архивов + защита от рекурсивного архивирования при вводе команды: `node ./cli-app/cli-tools.mjs archive -o tgz -p ./` или `node ./cli-app/cli-tools.mjs archive -o tgz -p .`. Так же архивы теперь создаются внутри директории `archives/` в корне проекта. [commit](https://github.com/Template-Craft/gulp-nunjucks-starter-kit/commit/ee4bf3f6090c5e7ff66efcd5224fa35039a0d064)

> _FIXED_ Небольшие фиксы во всех утилитах для cli-app + описание возможности архивации корневой директории для модуля: cli-app/utils/createArchiveApp.mjs [commit](https://github.com/Template-Craft/gulp-nunjucks-starter-kit/commit/127e5ae81a460215fba425090c44ed6346ac6471)

> _FIXED_ откат изменений нормализации путей из коммита: 55c61b3684bb20c357f3b318e77fd2af4f4f687b для cli-app/options/global.mjs [commit](https://github.com/Template-Craft/gulp-nunjucks-starter-kit/commit/fec7e628f600d09822ecd2baba77fb7844eb9904)

> _UPD_ Единый перехват ошибок + команда по умолчанию для вывода справочной информации по `cli-app` если было запущено без аргументов. [commit](https://github.com/Template-Craft/gulp-nunjucks-starter-kit/commit/6085defd6769c2a2504c83f572079674ad4a13d3)

> _FIXED_ Переход на fsPromises и упрощение кодовой базы модулей + более строгая защита и защита повторного импорта в cli-app/utils/injectComponentStyleApp.mjs, а в cli-app/utils/createComponentApp.mjs регулярка с разрешёнными именами компонентов - имя должно начинаться с буквы [commit](https://github.com/Template-Craft/gulp-nunjucks-starter-kit/commit/0c8c2adc016774363212450f06b4d36dd340e68b)

> _FIXED_ Откат к прежней .on('close') в CREATE_ARCHIVE() [commit](https://github.com/Template-Craft/gulp-nunjucks-starter-kit/commit/118b32ee125314dd8229a64a2fe5399694264a59)

> _FIXED_ Небольшое косметическое обновление вывода ошибки. [commit](https://github.com/Template-Craft/gulp-nunjucks-starter-kit/commit/2cea51140fc5b35ca5ff243238be4904b9832987)

## 2025.08.12.4 - 2025-08-15

> _FIXED_ Модуль `cli-app/utils/base64ConverterApp.mjs` теперь тоже переписан с использованием fsPromises. А результат конвертации в режиме "all" теперь создаёт директорию "base64Convert" (прописана в .gitignore) в корне проекта, затем помещает туда текстовый файл с результатом. PROJECT_ROOT - в `cli-app/config/config.mjs` теперь экспортируема. [commit](https://github.com/Template-Craft/gulp-nunjucks-starter-kit/commit/4f9f8c41cb014ea2b8cc5fd67b927df1a06ba8d9)

## 2025.08.12.5 - 2025-08-15

> _FIXED_ Обновление CREATE_FILES - переписана функция, теперь полностью асинхронная и с fsPromises. [commit](https://github.com/Template-Craft/gulp-nunjucks-starter-kit/commit/aaf1d8918b9edf6bc3a3b93be79f2f0748f0fce1)

> _FIXED_ код модуля приведён в единый стиль принятый для cli-app [commit](https://github.com/Template-Craft/gulp-nunjucks-starter-kit/commit/2486db5a06f0fefb4fa37ca96134ce1a1a94300f)
