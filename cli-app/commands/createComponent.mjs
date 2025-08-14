// команда creat -c или --component component_name

export const command = 'create';
export const describe = `
  Создание njk компонента.

  Опции:
    -c или --component для указания названия создаваемого компонента.

  Полная команда:
    $ node ./cli-app/cli-tools.mjs create -c Header
  `.trim();

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

export const handler = async (argv) => {
  const { default: createComponentApp } = await import('../utils/createComponentApp.mjs');
  await createComponentApp(argv);

  // console.log(argv);
};
