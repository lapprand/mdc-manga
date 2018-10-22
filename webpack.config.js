const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const DEV_SERVER_HOST = process.env.DEV_SERVER_HOST || 'localhost';
const DEV_SERVER_PORT = parseInt(process.env.DEV_SERVER_PORT, 10) || 8080;


module.exports = {
  target: 'web',
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  mode: 'development',
  entry: [
    path.join(__dirname, 'app', 'index.ts'),
    path.join(__dirname, 'app', 'index.html'),
    path.join(__dirname, 'app', 'index.scss')
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader:'ts-loader',
          options: {
            transpileOnly: true
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      },
      {
        test: /\.(html)$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              interpolate: true,
              minimize: true
            }
          },
          {
            loader: 'markup-inline-loader',
            options: {
              svgo: {
                plugins: [
                  {
                    mergePaths: false
                  },
                  {
                    cleanupIDs: false
                  },
                  {
                    removeTitle: true
                  },
                  {
                    removeUselessStrokeAndFill: false
                  },
                  {
                    removeUnknownsAndDefaults: false
                  },
                ],
              },
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'bundle.css',
            },
          },
          { loader: 'extract-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer()]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [path.resolve(__dirname, 'node_modules')]
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'app', 'index.html')
    }),
    new CleanWebpackPlugin([path.resolve(__dirname, 'dist')]),
    new webpack.HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin()
  ],
  devServer: {
    host: DEV_SERVER_HOST,
    port: DEV_SERVER_PORT,
    disableHostCheck: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': '*',
    },
    contentBase: path.join(__dirname, 'app'),
    watchContentBase: true,
    publicPath: '/',
    inline: true,
    hot: true,
  }
};