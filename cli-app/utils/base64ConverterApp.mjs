// Утилита для конвертации svg в base64 и вывода результата в консоль.
import { KITSYS as system, KITPLUGIN as plugin, errorThrower } from '../config/config.mjs';

const base64ConverterApp = async (argv) => {
  try {
    // Получаем содержимое команд пришедшее от пользователя.
    const converter_mode = argv.mode;
    const get_files_path = argv.path;

    const converter = (path, mode) => {
      // Название файла в который будут записываться данные прошедшие конвертацию
      const converter_output_filename = 'base64-output.txt';
      const converter_output_path = system.node_path.resolve(
        system.__dirname,
        `${system.node_path.dirname(path)}/${converter_output_filename}`,
      );

      // Фун-ция конвертер в base64
      const base64FromSVG = (data) => plugin.svg64(data);

      console.log(`Передан аргумент: ${plugin.chalk.green(mode)}`);

      // Не пропускаем пустой путь.
      if (path === undefined || path === '') {
        errorThrower(`
          ${plugin.chalk.bgRedBright.white('Ошибка!')}

          Отсутвует путь.
          `);
      }

      // Режим single (конвертация одного файла и вывод информации в консоль)
      if (mode === 'single') {
        // Читаем файлы
        system.fs.readFile(system.node_path.resolve(system.__dirname, path), 'utf8', (error_msg, file) => {
          if (error_msg) errorThrower(error_msg);

          console.log(plugin.chalk.bgYellow('--------- [Результат конвертации] ---------'));
          console.log(`\n${plugin.chalk.dim(base64FromSVG(file))}\n`);
          console.log(plugin.chalk.yellow('Скопируйте код из вывода, и используйте его для вставки в html или css.'));
        });
      }

      // Режим all (находит и конвертирует все svg файлы в переданной дир-рии)
      if (mode === 'all') {
        // Читаем каталог
        system.fs.readdir(system.node_path.resolve(system.__dirname, path), 'utf8', (error_msg, files) => {
          if (error_msg) errorThrower(error_msg);

          console.info(plugin.chalk.green(`Директория: ${path} - существует, вывожу данные:`));

          // Удаляем файл converter_output_filename, перед записью новых данных
          system.fs.unlink(converter_output_path, (error_msg) => {
            if (error_msg) {
              const unlinkErrorMsg = `
              Внимание!

              Не найден файл или дир-рия - ${converter_output_path}
              Пропуск удаления...`;

              console.error(unlinkErrorMsg);
            } else {
              console.log(plugin.chalk.green(`${converter_output_filename} - предыдущий файл был удалён.`));
              console.log(plugin.chalk.green('Создаём новый, и записываем данные:'));
              console.log(plugin.chalk.dim('########################'));
            }
          });

          // Кол-во всех файлов
          const fileCounter = files.length;
          console.log(plugin.chalk.dim('########################'));
          console.log(plugin.chalk.yellow(`Кол-во файлов в директории: ${fileCounter}`));

          // Считаем кол-во svg файлов, и выводим информацию в консоль.
          let svgFilesCollectionArr = [];

          // Применяем фильтр к файлам, и записываем в .txt файл результаты работы конвертора только svg файлов.
          files.filter((file) => {
            // Получаем расширение файлов
            const ext = system.node_path.extname(file);

            if (ext === '.svg') {
              const filePath = `${path}${file}`;
              // Запишем информацию о кол-ве svg файлов в пустой массив.
              svgFilesCollectionArr.push(filePath);

              // Читаем файлы
              system.fs.readFile(system.node_path.resolve(system.__dirname, filePath), 'utf8', (error_msg, file) => {
                if (error_msg) errorThrower(error_msg);

                // Данные для записи в .txt файл:
                const data = `
                          ####\n\nSVG файл: ${filePath}\nРезультат конвертации:\n${base64FromSVG(file)}\n\n####
                        `.trim();

                // Записываем полученные данные в текстовый документ
                system.fs.writeFile(converter_output_path, data, { encoding: 'utf8', flag: 'a' }, (error_msg) => {
                  if (error_msg) errorThrower(error_msg);

                  console.log(
                    plugin.chalk.green(`Файл: ${filePath} конвертирован и записан в ${converter_output_filename}`),
                  );
                });
              });
            }
          });

          // Выведем информацию о кол-ве svg файлов
          console.log(plugin.chalk.yellow(`Кол-во svg: ${svgFilesCollectionArr.length}`));
          console.log(plugin.chalk.dim('########################'));
          console.log(plugin.chalk.bgYellow('--------- [Результат конвертации] ---------'));
        });
      }
    };

    // Проверяем путь и аргумент
    if (converter_mode === undefined && get_files_path === undefined) {
      const argumentErrorMsg = `
        ${plugin.chalk.bgRedBright.white('Ошибка!')}

        Отсутствует аргумент или путь.
          Аргумент: ${converter_mode}
          Путь: ${get_files_path}
      `;

      errorThrower(argumentErrorMsg);
    }

    await converter(get_files_path, converter_mode);
  } catch (error) {
    console.error(error.message);
  }
};

export default base64ConverterApp;
