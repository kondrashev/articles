const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
require('babel-polyfill');

module.exports = {
  entry: path.resolve(__dirname, 'client', 'App.tsx'),
  mode: 'development',
  output: {
    filename: './server/static/bundle.js',
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './server/static/template/index.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss'],
    alias: {
      '@styles': path.resolve(__dirname, 'client/styles'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /(node_modules)/,
        use: ['babel-loader'],
      },
      {
        test: /\.(css|s[ac]ss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif|eot|otf|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: { modules: true },
          },
        ],
      },
    ],
  },
};
