// команда import -s --style style_name
import injectStyle from '../utils/injectComponentStyles.mjs';

export const command = 'import';
export const describe =
  'команда по импорту файла стилей scss компонента, в файл _components_import.scss. Не нужно указывать путь до файла стилей компонента, не нужно указывать расширение, необходимо передать только название компонента т.к. файл стилей имеет аналагичное название.';

export const builder = (yargs) => {
  // Опция для передачи названия файла стилей
  yargs.option('style', {
    alias: 's',
    type: 'string',
    describe: 'задать название импортируемого файла (без расширения файла!)',
  });

  // необходимые опции для работы команды, иначе ошибка
  yargs.demandOption(
    'style',
    'Передайте вторым аргументом ключевую опцию style, и после название импортируемого файла стилей компонента.',
  );
};

export const handler = function (argv) {
  argv.output = injectStyle(argv);
  // console.log(argv);
};
