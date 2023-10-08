const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
require('babel-polyfill');

module.exports = {
  entry: ['babel-polyfill', './client/app.tsx'],
  devtool: 'sourcemaps',
  cache: true,
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
    extensions: ['.js', '.jsx', '.ts', '.tsx', 'css', '.scss'],
    alias: {
      '@styles': path.resolve(__dirname, 'client/styles'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env', '@babel/preset-typescript', '@babel/preset-react'],
          plugins: ['@babel/plugin-proposal-class-properties'],
        },
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
