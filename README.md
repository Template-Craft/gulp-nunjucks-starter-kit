# gulp-nunjucks-starter-kit

Инструмент для создания статических сайтов, их проектирования с помощью шаблонизатора Nunjucks и сборки с помощью Gulp+Webpack

<br>

## Зависимости для разработки

_Таблица зависимостей:_

| **devDependencies**                                                                 | **dependencies**                                                 |
| ----------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| [Babel](https://babeljs.io/docs/)                                                   | - [X][Normalize.scc](https://github.com/necolas/normalize.css)   |
| [Webpack](https://webpack.js.org/concepts/)                                         | - [X][RFS](https://github.com/twbs/rfs/tree/v9.0.3#installation) |
| [ESLint](https://eslint.org/docs/latest/)                                           | - [ ][FontAwesome](https://fontawesome.com/docs)                 |
| [Gulp](https://gulpjs.com/docs/en/getting-started/quick-start)                      |                                                                  |
| [PostCSS](https://github.com/postcss/gulp-postcss)                                  |                                                                  |
| [postcss-sort-media-queries](https://github.com/yunusga/postcss-sort-media-queries) |                                                                  |
| [cssnano](https://github.com/cssnano/cssnano)                                       |                                                                  |
| [Autoprefixer](https://github.com/postcss/autoprefixer)                             |                                                                  |
| [sass/scss](https://sass-lang.com/documentation/)                                   |                                                                  |
| [Nunjucks](https://mozilla.github.io/nunjucks/templating.html)                      |                                                                  |
| [yargs](http://yargs.js.org/docs/)                                                  |                                                                  |
| [BrowserSync](https://browsersync.io/docs)                                          |                                                                  |
| [Prettier](https://prettier.io/docs/en/)                                            |                                                                  |
| [Editorconfig](https://editorconfig.org/)                                           |                                                                  |

> Примечание:
> _весь список зависимостей можно посмотреть в файле `package.json`, в таблице выведены только самые важные._

---

## Установка

#### Версия Node.js

> Рекомендуемые версии node.js (проект тестировался именно на нижеследующих версиях node.js):

`lts/hydrogen` -> `v18.18.2`

#### Установка Node.js

1. Установите в свою систему с официального сайта [NodeJS](https://nodejs.org/en/) или с помощью [NVM](https://github.com/nvm-sh/nvm#installing-and-updating) (Node Version Manager)

2. Установите `gulp` глобально (т.е. для всей системы):

```bash
npm i --global gulp-cli
```

3. После установки необходимого, перейдите в папку со скачанным проектом

4. Установите необходимые зависимости инструмента, находясь в родительском каталоге проекта и введя в терминал команду: `npm i`

---

## Использование

После успешного выполнения предыдущих шагов, настало время запустить проект! Рассмотрим команды для запуска:

> **команды**

Режим разработчика, выполняет запуск локального сервера с проектом:

```bash
npm run dev
```

Режим сборки проекта, осуществляется сборка проекта в директорию **build**

```bash
npm run build
```

После успешного старта/сборки проекта, возникнет небольшое всплывающее окошко об информации в каком режиме находится инструмент (сборка/разработка)

> **дополнительные команды**

В проекте так-же существует дополнительная мини консольная программа помощник, помогающая быстро создавать компоненты (в соответствии с архитектурой файлов и папок проекта), а так же импортировать файлы стилей компонента в файл `_components_import.scss` - который в свою очередь подключается в главный файл стилей проекта: `main.scss`.

Для того что-бы воспользоваться этой программой, для начала необходимо зарегистрировать её локально для проекта. Для этого необходимо выполнить следующие команды:

```bash
npm link
```

Или можно не регистрировать, а вызвать просто:

```bash
npm run tool
```

После этого можно использовать в корне проекта команду: `kit-tools` в окне консоли будет информация о командах, опциях и дополнительных параметров которые допустимы при использовании данной тулзы.

Так же в `package.json` файле, в разделе `scripts` зарегистрированы команды для быстрой демонстрации `kit-tools`, а именно команды по архивации директории `build`, сначала произойдёт сборка проекта, далее выполнится команда по архивации директории.

команды для архивации в разделе `scripts`:

| **команды**                            | **описание**                                                                           |
| -------------------------------------- | -------------------------------------------------------------------------------------- |
| <code>npm run build:archive:tgz</code> | собирает из исходников проект и упаковывает в tar.gz архив папку с собранным проектом. |
| <code>npm run build:archive:tar</code> | собирает из исходников проект и упаковывает в tar архив папку с собранным проектом.    |
| <code>npm run build:archive:zip</code> | собирает из исходников проект и упаковывает в zip архив папку с собранным проектом.    |

---

## Соглашений об именовании

В данном проекте специфическая иерархия файлов и папок - расчитанная и разработанная специально под данный, конкретный проект, используя этот инструмент вы должны понимать это и использовать следующие инструкции и соглашения.

Правила для шаблонов **nunjucks** -> все компоненты, куски секций и файлы должны именоваться в стиле **snake_case** пример: `header_top.njk`;

Правила для стилей **SCSS/SASS** -> все компоненты, куски секций и прочией файлы должны именоваться в стиле **snake_case** пример: `header_top.scss`;

- а так же, если это файлы, которые являются частью какого-то другого файла, то перед названием должны использовать (префикс) то-же правило распространяется и на файлы стилей компонент! **нижнее_подчеркивание** **\_** пример: `_nav_item.scss`;

> Шаблоны **nunjucks** `src/views/`:

- все компоненты создаются и находятся в соответствующей папке т.е. `src/views/components/**/*`
- данные компонент находятся по пути: `src/views/data/*.json`
- страницы проекта находятся по пути: `src/views/pages/*`
- секции проекта находятся по пути: `src/views/sections/*` если многостраничный режим, то следует в директории с секцией создать поддиректории (используя стиль **snake_case**) с названиями страниц сайта и складывать в них секции зависящие от этих страниц! (перед названием секции не забываем ставить префикс **нижнее_подчеркивание** **\_**) пример: `src/views/sections/general_section/_header_top.njk`
- так же существует раздел шаблонов, находится он: `src/views/templates/*` -> можно использовать для хранения там файлов с содержимым `html <head></head>` и прочими повторяющимися штуками.

> Файлы стилей **scss** `src/styles/`:

- все файлы стилей подключаются в главный файл стилей `main.scss` но gulp отслеживает абсолютно все стили находящиеся в родительской директории и в поддерикториях.
- директории в которых находятся стили подключаемые к файлу `main.scss` следует как и содержимое директорий именовать согласно стилю **snake_case**, а так же использовать префикс **нижнее_подчеркивание** перед названием файла/директории;
- если у нас подразумевается многостраничный режим вёрстки, то в директории `src/styles/_main/` следует создавать поддериктории с названиями страниц и уже во внутрь складывать файлы стилей зависящие от этих страниц, пример: `src/styles/_main/_general_page/_header_top.scss`
- директория `src/styles/_defaults/` - для складирования туда сетки, всяких helper`ов, миксинов и дефолтных для проекта состояний, подключения шрифтов и т.д.

---

> Файлы скриптов **js/mjs/cjs** `src/scripts/`

- все файлы скриптов обрабатываются с помощью **babel+webpack**, в корневой директории расположения оных, есть две директории **main** и **vendor**
- в директории **main** - находится наш главный файл `main.mjs`, допустимо плодить различные дир-рии и подключать просто всё это в `main.mjs`
- в директории **vendor** - находится файл скриптов в которые будут подключаться сторонние библиотеки, необходимые на стороне клиента в качестве полноценных библиотек.

---

> Директория **assets** `src/assets/`

- храним в ней шрифты, картинки, и прочий медиа-мусор

<br><br>
<br><br>

---

> последние обновления описания: **18.06.24**
