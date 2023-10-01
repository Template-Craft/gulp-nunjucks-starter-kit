/* eslint-disable n/no-unpublished-import */
/* eslint-disable import/order */
/* eslint-disable no-undef */

//  -------------------------------------------------------------;
//    Таск-раннер для отслеживания js скриптов
//  -------------------------------------------------------------;

'use strict';

import webpack from 'webpack';
import webpackStream from 'webpack-stream';

import sourcemaps from 'gulp-sourcemaps';

import rename from 'gulp-rename';

import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const scripts = () => {
  return app.gulp
    .src(app.path.src.scripts)
    .pipe(app.plugins.gulpIf(app.isDev, sourcemaps.init()))
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'Js',
          sound: false,
          message: 'Error: <%= error.message %>',
        }),
      ),
    )
    .pipe(
      webpackStream({
        // входящие файлы
        mode: app.isBuild ? 'production' : 'development',
        devtool: app.isBuild ? false : 'source-map',

        // выходящие файлы
        output: {
          filename: '[name].bundle.js',
          chunkFilename: '[name].js',
          path: path.resolve(__dirname, 'build'),
        },

        // Оптимизации
        optimization: {
          splitChunks: {
            cacheGroups: {
              vendor: {
                test: /node_modules/,
                chunks: 'initial',
                name: 'vendor',
                enforce: true,
              },
            },
          },
        },

        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env'],
                },
              },
            },
          ],
        },

        // скрипты компонент
        resolve: {
          alias: {
            /* Теперь вместо использования относительных путей при импорте:
                # -> import Components from '../../components/components_name';
                # используется псевдоним:
                # -> import Components from 'Components/components_name';
                */
            Components: path.resolve(__dirname, 'src/views/components/'),
          },
        },
      }),
      webpack,
    )
    .pipe(
      app.plugins.gulpIf(
        app.isBuild,
        rename({
          suffix: '.min',
        }),
      ),
    )
    .pipe(app.plugins.plumber.stop())
    .pipe(app.plugins.gulpIf(app.isDev, sourcemaps.write('./maps/')))
    .pipe(app.gulp.dest(app.path.build.scripts))
    .pipe(app.plugins.browsersync.stream());
};
