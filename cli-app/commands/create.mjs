// команда creat -c или --component component_name
import createComponent from '../utils/createNjkComponent.mjs';

export const command = 'create';
export const describe =
  'Создание njk компонента. Принимает опцию -c или --component после которой необходимо передать имя создоваемого компонента.';

export const builder = (yargs) => {
  // Опция для передачи названия компонента
  yargs.option('component', {
    alias: 'c',
    type: 'string',
    describe: 'задать имя компонента.',
  });

  // необходимые опции для работы команды, иначе ошибка
  yargs.demandOption(
    'component',
    'Передайте вторым аргументом ключевую опцию component, и после имя желаемого компонента.',
  );
};

export const handler = function (argv) {
  argv.output = createComponent(argv);
  // console.log(argv);
};
