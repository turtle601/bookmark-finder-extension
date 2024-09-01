const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

require('dotenv').config({ path: './.env' });

module.exports = {
  entry: {
    background: path.resolve('src/background/index.ts'),
    contentScript: path.resolve('src/contentScript/index.tsx'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
    },
    extensions: ['.ts', '.tsx', '.js', 'jsx'],
  },
  module: {
    rules: [
      {
        test: /\.png/,
        type: 'asset/resource',
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: 'babel-loader',
        exclude: [/node_modules/, /__stories__/],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'BookMark Chrome Extensions',
      filename: 'popup.html',
      chunks: ['popup'],
    }),
    new ForkTsCheckerWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/manifest.json', to: 'manifest.json' },
        { from: 'public/icons', to: 'icons' },
      ],
    }),
    new webpack.DefinePlugin({
      'process.env.GEMINI_API_KEY': JSON.stringify(process.env.GEMINI_API_KEY),
    }),
  ],
};
