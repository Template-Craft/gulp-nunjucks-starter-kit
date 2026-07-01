/* eslint-disable n/no-unpublished-import */
 
//  ----------------------------------------------------------------------------------------------------------------;
//    Таск-раннер для отслеживания nunjucks шаблонов
//  *
//  *
//  *
//  ----------------------------------------------------------------------------------------------------------------;

'use strict';

// nodejs standart function
import fs from 'fs';
import nodePath from 'node:path';

import nunjucksRender from 'gulp-nunjucks-render';

import { buildDependencyMap } from '../utils/buildDependencyMap.mjs';
import { getSectionNameFromPath } from '../utils/getSectionName.mjs';
import { getTemplateName } from '../utils/getTemplateName.mjs';

export const templates = async (changedFile = undefined) => {
  // Опции рендера для nunjucks:
  const renderOptions = {
    path: app.path.src.nunjucksIndexDir,
    watch: false,
    noCache: true,

    manageEnv: function (env) {
      // Глобальные фильтры/функции
      env.addGlobal('getData', (name) => {
        const dataPath = `./src/views/data/${name}.json`;
        let result = JSON.parse(fs.readFileSync(dataPath));
        return result;
      });
      env.addGlobal('getSection', (pageName = false, name) => {
        if (pageName !== null && typeof pageName !== 'undefined') {
          return `sections/${pageName}/_${name}.njk`;
        } else {
          return `sections/_${name}.njk`;
        }
      });
      env.addGlobal('getComponent', (file) => `components/${file}/${file}.njk`);
      env.addGlobal('getTemplate', (file) => `templates/_${file}.njk`);
      env.addFilter('jsonParse', (value) => JSON.parse(value));
    },
  };

  // Переработаем логику по аналогии с styles.mjs таском
  // normalize input
  if (changedFile && typeof changedFile !== 'string') {
    changedFile = changedFile.path || undefined;
  }

  // Инициализация запуска
  const isInitialRun = !changedFile;

  // Точечная пересборка страниц
  const changeType = detectChangeType(changedFile);
  const filesToRender = isInitialRun ? app.path.src.nunjucksPages : await resolveRenderTargets(changeType, changedFile);

  return runRender(filesToRender, renderOptions);
};

// Приводит список произвольных файлов (страницы/секции/шаблоны)
// к списку страниц. Секции и шаблоны разворачиваются по dependencyMap
function expandFilesToPages(files, dependencyMap) {
  const result = new Set();
  const list = Array.isArray(files) ? files : [files];

  for (const f of list) {
    if (!f || typeof f !== 'string') continue;
    const n = f.replace(/\\/g, '/');

    if (n.includes('/views/pages/')) {
      result.add(f);
      continue;
    }

    if (n.includes('/views/sections/')) {
      const sectionName = getSectionNameFromPath(n);
      const users = dependencyMap.sections?.get(sectionName) || [];

      for (const u of users) {
        if (u.replace(/\\/g, '/').includes('/views/pages/')) result.add(u);
      }

      continue;
    }

    if (n.includes('/views/templates/')) {
      const templateName = getTemplateName(n);
      const users = dependencyMap.templates?.get(templateName) || [];

      for (const u of users) {
        const un = u.replace(/\\/g, '/');

        if (un.includes('/views/pages/')) {
          result.add(u);
        } else if (un.includes('/views/sections/')) {
          const sname = getSectionNameFromPath(un);
          const su = dependencyMap.sections?.get(sname) || [];

          for (const p of su) {
            if (p.replace(/\\/g, '/').includes('/views/pages/')) result.add(p);
          }
        }
      }

      continue;
    }
  }

  return [...result];
}

// Определяем тип события
function detectChangeType(changedFile) {
  if (!changedFile) return 'full';

  // Точечная пересборка страниц по json, с учётом обработки global,json, common.json и т.п. перестраивающие весь проект
  const ext = nodePath.extname(changedFile);

  // Json
  const isJson = ext === '.json';
  const isGlobalJson = ['Global.json', 'Common.json'].includes(nodePath.basename(changedFile));

  // Для поддержки windows
  const normalizedPath = changedFile.replace(/\\/g, '/');

  // Nunjucks
  const isPage = normalizedPath.includes('views/pages/');
  const isSection = normalizedPath.includes('views/sections/');
  const isComponent = normalizedPath.includes('views/components/');
  const isTemplates = normalizedPath.includes('views/templates/');

  // Проверки
  if (isJson && isGlobalJson) return 'global-json';
  if (isJson) return 'component-json';
  if (isPage) return 'page';
  if (isSection || isComponent || isTemplates) return 'template';

  return 'unknown';
}

// Выполняем действия по типу изменения:
async function resolveRenderTargets(changedType, changedFile) {
  const basename = changedFile ? nodePath.basename(changedFile, '.json') : '';
  const relatedPage = `${app.path.src.nunjucksIndexDir}pages/${basename}.njk`;

  switch (changedType) {
    case 'component-json': {
      // Сначала проверим, является ли это привязанной страницей напрямую (index.json -> index.njk)
      if (fs.existsSync(relatedPage)) {
        console.log(
          `[${app.plugins.chalk.blue('Nunjucks')}] (Обновлён JSON ${app.plugins.chalk.magenta(basename)} -> пересборка только страницы "${basename}.njk"`,
        );
        return relatedPage;
      }

      // Обновляем dependencyMap и ищем связи по имени JSON
      const dependencyMap = await buildDependencyMap({
        includeComponents: true,
        includeSections: true,
        includeTemplates: true,
      });

      const componentPages = dependencyMap.components?.get(basename) || [];
      const sectionPages = dependencyMap.sections?.get(basename) || [];
      const templatePages = dependencyMap.templates?.get(basename) || [];

      const rawTargets = [...new Set([...componentPages, ...sectionPages, ...templatePages])];
      const pageTargets = expandFilesToPages(rawTargets, dependencyMap);

      if (pageTargets.length > 0) {
        console.log(
          `[${app.plugins.chalk.blue('Nunjucks')}] Обновлён JSON ${app.plugins.chalk.magenta(basename)} -> связан с сущностью -> пересборка ${app.plugins.chalk.magenta(pageTargets.length)} файла(ов):`,
          pageTargets
            .map((f) => app.plugins.chalk.magenta(nodePath.relative(app.path.src.nunjucksIndexDir, f)))
            .join(', '),
        );
        return pageTargets;
      }

      // Fallback - полная пересборка
      console.log(
        `[${app.plugins.chalk.blue('Nunjucks')}] Обновлён JSON ${app.plugins.chalk.magenta(basename)} -> нет связей -> пересборка всех страниц`,
      );
      return app.path.src.nunjucksPages;
    }

    case 'global-json':
      console.log(
        `[${app.plugins.chalk.blue('Nunjucks')}] Обновлён глобальный JSON (${app.plugins.chalk.magenta(nodePath.basename(changedFile))}) -> пересборка всех страниц`,
      );
      return app.path.src.nunjucksPages;

    case 'page':
      console.log(
        `[${app.plugins.chalk.blue('Nunjucks')}] Обновлён шаблон страницы -> пересборка "${app.plugins.chalk.magenta(nodePath.basename(changedFile))}"`,
      );
      return changedFile;

    case 'template': {
      const isComponent = changedFile.includes('/views/components/');
      const isSection = changedFile.includes('/views/sections/');
      const isTemplate = changedFile.includes('/views/templates/');

      const componentName = isComponent ? nodePath.basename(nodePath.dirname(changedFile)) : null;
      const sectionName = isSection ? getSectionNameFromPath(changedFile) : null;
      const templateName = isTemplate ? getTemplateName(changedFile) : null;

      const dependencyMap = await buildDependencyMap({
        includeComponents: isComponent,
        includeSections: isComponent || isSection || isTemplate,
        includeTemplates: isTemplate,
      });

      const allPages = new Set();

      // Компоненты
      if (isComponent && componentName) {
        const componentUsers = dependencyMap.components?.get(componentName) || [];

        for (const file of componentUsers) {
          if (file.includes('/views/pages/')) {
            allPages.add(file);
          }
        }

        for (const file of componentUsers) {
          if (file.includes('/views/sections/')) {
            const sectionName = getSectionNameFromPath(file);

            // console.log(
            //   `[${app.plugins.chalk.yellow('DEBUG')}] Проверка секции: "${sectionName}" -> страниц:`,
            //   dependencyMap.sections?.get(sectionName),
            // );

            const sectionUsers = dependencyMap.sections?.get(sectionName) || [];

            for (const page of sectionUsers) {
              if (page.includes('/views/pages/')) {
                allPages.add(page);
              }
            }
          }
        }

        console.log(
          `[${app.plugins.chalk.blue('Nunjucks')}] Обновлён компонент "${app.plugins.chalk.magenta(componentName)}" -> пересборка файла(ов):`,
          [...allPages]
            .map((f) => app.plugins.chalk.magenta(nodePath.relative(app.path.src.nunjucksIndexDir, f)))
            .join(', ') || '(нет)',
        );

        return allPages.size > 0 ? [...allPages] : app.path.src.nunjucksPages;
      }

      // Секции
      if (isSection && sectionName) {
        const sectionUsers = dependencyMap.sections?.get(sectionName) || [];

        for (const file of sectionUsers) {
          if (file.includes('/views/pages/')) {
            allPages.add(file);
          }
        }

        console.log(
          `[${app.plugins.chalk.blue('Nunjucks')}] Обновлена секция "${app.plugins.chalk.magenta(sectionName)}" -> пересборка файла(ов):`,
          [...allPages]
            .map((f) => app.plugins.chalk.magenta(nodePath.relative(app.path.src.nunjucksIndexDir, f)))
            .join(', ') || '(нет)',
        );

        return allPages.size > 0 ? [...allPages] : app.path.src.nunjucksPages;
      }

      // Шаблоны
      if (isTemplate && templateName) {
        const templateUsers = dependencyMap.templates?.get(templateName) || [];

        for (const file of templateUsers) {
          if (file.includes('/views/pages/')) {
            allPages.add(file);
          }

          if (file.includes('/views/sections/')) {
            const sectionName = getSectionNameFromPath(file);
            const sectionUsers = dependencyMap.sections?.get(sectionName) || [];

            for (const page of sectionUsers) {
              if (page.includes('/views/pages/')) {
                allPages.add(page);
              }
            }
          }
        }

        console.log(
          `[${app.plugins.chalk.blue('Nunjucks')}] Обновлён шаблон "${app.plugins.chalk.magenta(templateName)}" -> пересборка файла(ов):`,
          [...allPages]
            .map((f) => app.plugins.chalk.magenta(nodePath.relative(app.path.src.nunjucksIndexDir, f)))
            .join(', ') || '(нет)',
        );

        return allPages.size > 0 ? [...allPages] : app.path.src.nunjucksPages;
      }

      console.log(
        `[${app.plugins.chalk.blue('Nunjucks')}] Обновление "${app.plugins.chalk.magenta(changedFile)}" -> нет связей, пересборка всех страниц`,
      );

      return app.path.src.nunjucksPages;
    }

    case 'full':
    case 'unknown':
    default:
      console.log(
        `[${app.plugins.chalk.blue('Nunjucks')}] Неизвестное изменение или полный рендер -> пересборка всех страниц`,
      );
      return app.path.src.nunjucksPages;
  }
}

// Функция рендера nunjucks в html
function runRender(srcPath, renderOptions) {
  return (
    app.gulp
      .src(srcPath, { allowEmpty: true })
      // ловим ошибки, и выводим их в консоль и в систему
      .pipe(app.plugins.plumber({ errorHandler }))
      // Nunjucks
      .pipe(nunjucksRender(renderOptions))
      // в Dev режиме форматирование HTML убираем
      .pipe(
        app.plugins.gulpIf(
          app.isBuild,
          app.plugins.beautify.html({
            indent_size: 2,
            preserve_newlines: false,
          }),
        ),
      )
      .pipe(app.plugins.gulpIf(app.isBuild, app.plugins.replace('.min.css', '.css')))
      .pipe(app.plugins.gulpIf(app.isBuild, app.plugins.replace('.min.js', '.js')))
      .pipe(app.plugins.gulpIf(app.isBuild, app.plugins.replace('.css', '.min.css')))
      .pipe(app.plugins.gulpIf(app.isBuild, app.plugins.replace('.js', '.min.js')))
      .pipe(
        app.plugins.gulpIf(
          app.isBuild,
          app.plugins.replace('vendor/normalize/normalize.min.css', 'vendor/normalize/normalize.css'),
        ),
      )
      .pipe(app.plugins.plumber.stop())
      .pipe(app.gulp.dest(app.path.build.html))
      .pipe(app.plugins.browsersync.reload({ stream: true }))
  );
}

// Функция с выводом ошибок для plumber
function errorHandler(error) {
  app.errors.handler(error, app.errors.messages.njk);
  console.error(error.toString());
}
