/* eslint-disable n/no-unpublished-import */
 
//  -------------------------------------------------------------;
//    Таск-раннер для отслеживания js скриптов
//  -------------------------------------------------------------;

'use strict';

import webpack from 'webpack';
import webpackStream from 'webpack-stream';

import nodePath from 'path';
import { fileURLToPath } from 'url';
import { settings } from '../config/settings.mjs';

const __dirname = nodePath.dirname(fileURLToPath(import.meta.url));

export const scripts = () => {
  return (
    app.gulp
      .src(app.path.src.scripts)
      // ловим ошибки, и выводим их в консоль и в систему
      .pipe(
        app.plugins.plumber({
          errorHandler: function (error) {
            app.errors.handler(error, app.errors.messages.scripts);

            // console.log(error.toString()); // => можно не включать, т.к. ошибки обрабатывает webpack
          },
        }),
      )
      .pipe(
        webpackStream({
          // режимы работы
          mode: app.isBuild ? 'production' : 'development',
          watch: false,
          devtool: app.isBuild ? false : 'eval-cheap-module-source-map',
          cache: app.isBuild ? false : { type: 'filesystem' },

          // выходящие файлы
          output: {
            filename: '[name].bundle.js',
            chunkFilename: '[name].js',
            path: nodePath.resolve(__dirname, 'build'),
          },

          // // Оптимизации
          // optimization: {
          //   splitChunks: {
          //     cacheGroups: {
          //       vendor: {
          //         test: /node_modules/,
          //         chunks: 'initial',
          //         name: 'vendor',
          //         enforce: true,
          //       },
          //     },
          //   },
          // },

          module: {
            rules: [
              {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    cacheDirectory: true,
                    cacheCompression: true,
                    presets: [
                      [
                        '@babel/preset-env',
                        {
                          debug: settings.debug ? true : false,
                          browserslistEnv: 'javascripts',
                        },
                      ],
                    ],
                    plugins: [
                      [
                        'polyfill-corejs3',
                        {
                          method: 'usage-global',
                          version: '3.49',
                          browserslistEnv: 'javascripts',
                        },
                      ],
                    ],
                  },
                },
              },
            ],
          },

          // скрипты компонент
          resolve: {
            alias: {
              /* Теперь вместо использования относительных путей при импорте:
               *   # -> import Components from '../../components/components_name';
               *   # используется псевдоним:
               *   # -> import component from 'Components/component_folder_name/component_name';
               */

              Module: nodePath.resolve(process.cwd(), 'node_modules/'),
              Components: nodePath.resolve(process.cwd(), 'src/views/components/'),
            },
            extensions: ['.js', '.mjs'],
          },
        }),
        webpack,
      )
      .pipe(
        app.plugins.gulpIf(
          app.isBuild,
          app.plugins.rename({
            suffix: '.min',
          }),
        ),
      )
      .pipe(app.plugins.plumber.stop())
      .pipe(app.gulp.dest(app.path.build.scripts))
      .pipe(app.plugins.browsersync.stream())
  );
};
