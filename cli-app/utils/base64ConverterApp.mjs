// Утилита для конвертации svg в base64 и вывода результата в консоль.
import { KITSYS as system, PROJECT_ROOT as root_dir, KITPLUGIN as plugin, errorThrower } from '../config/config.mjs';

const OUTPUT_FILE = 'base64-output.txt';
const TXT = 'utf8';

// Локальный helper
const base64FromSVG = (data) => plugin.svg64(data);

/**
 * Конвертация одного файла (mode=single)
 */
async function convertSingle(userPath) {
  const absFile = system.node_path.resolve(system.__dirname, userPath);
  const st = await system.fsPromises.stat(absFile).catch(() => null);
  if (!st || !st.isFile()) {
    return errorThrower(`Файл не найден: ${absFile}`);
  }

  const svg = await system.fsPromises.readFile(absFile, TXT);
  console.log(plugin.chalk.bgYellow('--------- [Результат конвертации] ---------'));
  console.log(`\n${plugin.chalk.dim(base64FromSVG(svg))}\n`);
  console.log(plugin.chalk.yellow('Скопируйте код из вывода и используйте его в HTML/CSS.'));
}

/**
 * Конвертация всех SVG в каталоге (mode=all)
 */
async function convertAll(userDir) {
  const absDir = system.node_path.resolve(system.__dirname, userDir);
  const st = await system.fsPromises.stat(absDir).catch(() => null);
  if (!st || !st.isDirectory()) {
    return errorThrower(`Директория не найдена: ${absDir}`);
  }

  // Путь для файла результатов в PROJECT_ROOT каталоге
  const out_dir = system.node_path.join(root_dir, `base64Convert`);
  system.fs.mkdirSync(out_dir, { recursive: true });

  const outPath = system.node_path.join(out_dir, OUTPUT_FILE);

  // Переинициализируем файл результатов: rm (force) → пустая запись
  await system.fsPromises.rm(outPath, { force: true }).catch(() => {});
  await system.fsPromises.writeFile(outPath, '', TXT);

  // Читаем каталог «умно» (с типами)
  const entries = await system.fsPromises.readdir(absDir, { withFileTypes: true });
  const svgEntries = entries.filter((d) => d.isFile() && system.node_path.extname(d.name).toLowerCase() === '.svg');

  console.info(plugin.chalk.green(`Директория: ${userDir} — существует, начинаю конвертацию.`));
  console.log(plugin.chalk.dim('########################'));
  console.log(plugin.chalk.yellow(`Всего файлов: ${entries.length}`));
  console.log(plugin.chalk.yellow(`SVG файлов:   ${svgEntries.length}`));
  console.log(plugin.chalk.dim('########################'));
  console.log(plugin.chalk.bgYellow('--------- [Результат конвертации] ---------'));

  // Последовательно (чтобы не взрывать память при больших папках)
  for (const d of svgEntries) {
    const relFile = system.node_path.join(userDir, d.name); // для лога
    const absFile = system.node_path.join(absDir, d.name); // для чтения

    const svg = await system.fsPromises.readFile(absFile, TXT);
    const block = [
      '####',
      `SVG файл: ${relFile}`,
      'Результат конвертации:',
      base64FromSVG(svg),
      '####',
      '', // пустая строка-разделитель
    ].join('\n');

    await system.fsPromises.appendFile(outPath, block, TXT);
    console.log(plugin.chalk.green(`Файл: ${relFile} конвертирован и записан в ${OUTPUT_FILE}`));
  }

  console.info(plugin.chalk.magenta(`Проверьте наличие файла "${OUTPUT_FILE}" в "${out_dir}"`));
}

/**
 * Входная точка
 */
const base64ConverterApp = async (argv) => {
  try {
    const mode = argv.mode; // 'single' | 'all'
    const input = argv.path; // файл или каталог (в зависимости от mode)

    console.log(`Передан аргумент: ${plugin.chalk.green(mode ?? '(пусто)')}`);

    if (!input || !mode) {
      return errorThrower(`
        ${plugin.chalk.bgRedBright.white('Ошибка!')}

        Отсутствует аргумент или путь.
          Аргумент: ${mode}
          Путь: ${input}
      `);
    }

    if (mode !== 'single' && mode !== 'all') {
      return errorThrower(`Неизвестный режим: ${mode}. Доступно: single | all`);
    }

    if (mode === 'single') {
      await convertSingle(input);
    } else {
      await convertAll(input);
    }
  } catch (error) {
    console.error(error?.message ?? String(error));
  }
};

export default base64ConverterApp;
