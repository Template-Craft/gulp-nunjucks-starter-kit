const path = require('path')

module.exports = {
  // входящие файлы
  entry: './src/scripts/**/*.{js,cjs,mjs}',

  // выходящие файлы
  output: {
    filename: '[name].bundle.js',
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
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [['@babel/preset-env', { modules: false }]],
          },
        },
      },
    ],
  },
}
