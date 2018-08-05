const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const workboxConfig = require('./workbox.config');

const pushWorkerPath = __dirname + '/push-notification-worker.js';
const caesarPath = __dirname + '/caesar.jpg';
const bundlePath = __dirname + '/dist';

module.exports = {
  entry: __dirname + '/main.js',
  output: {
    filename: '[name].[chunkhash].js',
    path: bundlePath
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|json)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
            'style-loader', // creates style nodes from JS strings
            'css-loader', // translates CSS into CommonJS
            'sass-loader' // compiles Sass to CSS, using Node Sass by default
        ]
    }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(bundlePath),
    new HtmlWebpackPlugin({ title: 'Caching' }),
    new CopyWebpackPlugin([pushWorkerPath, caesarPath]),
    new WorkboxPlugin.GenerateSW(workboxConfig)
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  mode: 'development'
}
