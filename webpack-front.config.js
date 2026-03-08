const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const DEV_SERVER_HOST = process.env.DEV_SERVER_HOST || '0.0.0.0';
const DEV_SERVER_PORT = parseInt(process.env.DEV_SERVER_PORT, 10) || 8080;


module.exports = {
  target: 'web',
  mode: 'development',
  devtool: 'inline-source-map',
  entry: [
    path.join(__dirname, 'app', 'index.ts'),
    path.join(__dirname, 'app', 'index.html'),
    path.join(__dirname, 'app', 'index.scss')
  ],
  output: {
    path: path.resolve(__dirname, 'dist', 'front'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          // options: {
          //   transpileOnly: true
          // }
        },
        exclude: /node_modules/
      },
      {
        test: /\.(ico|png|jpg|gif|xml|svg|webmanifest)$/,
        type: 'asset/resource',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024 // 8kb
          }
        },
        generator: {
          filename: 'images/[name][ext]'
        }
      },
      {
        test: /\.(html)$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          },
          {
            loader: 'markup-inline-loader',
            options: {
              svgo: {
                plugins: [
                  { mergePaths: false },
                  { cleanupIDs: false },
                  { removeTitle: true },
                  { removeUselessStrokeAndFill: false },
                  { removeUnknownsAndDefaults: false },
                ],
              },
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          // {
          //   loader: 'file-loader',
          //   options: {
          //     name: 'bundle.css',
          //   },
          // },
          // { loader: 'extract-loader' },
          { loader: MiniCssExtractPlugin.loader},
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [autoprefixer()]
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: ['./node_modules'],
                quietDeps: true
              },
              warnRuleAsWarning: false,

              // Prefer Dart Sass
              implementation: require('sass'),

              // See https://github.com/webpack-contrib/sass-loader/issues/804
              webpackImporter: false,
            },
          },
        ]
      }
      // {
      //   test: /\.s[ac]ss$/i,
      //   use: [
      //     // Creates `style` nodes from JS strings
      //     'style-loader',
      //     // Translates CSS into CommonJS
      //     'css-loader',
      //     // Compiles Sass to CSS
      //         {
      //         loader: 'sass-loader',
      //         options: {
      //           sassOptions: {
      //             includePaths: [path.resolve(__dirname, 'node_modules')]
      //           }
      //         }
      //       }
      //   ],
      // }
      // {
      //   test: /\.scss$/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: './bundle.css',
      //       },
      //     },
      //     { loader: 'extract-loader' },
      //     { loader: 'css-loader' },
      //     // {
      //     //   loader: 'postcss-loader',
      //     //   options: {
      //     //     plugins: () => [autoprefixer()]
      //     //   }
      //     // },
      //     {
      //       loader: 'sass-loader',
      //       options: {
      //         sassOptions: {
      //           includePaths: [path.resolve(__dirname, 'node_modules')]
      //         }
      //       }
      //     }
      //   ]
      // }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    // new HtmlWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'app', 'index.html')
    }),
    new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, 'dist', 'front')] }),
    new webpack.HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin()
  ],
  devServer: {
    host: DEV_SERVER_HOST,
    port: DEV_SERVER_PORT,
    allowedHosts: 'all',
    proxy: {
      "/.netlify": {
        target: "http://localhost:9000",
        pathRewrite: { "^/.netlify/functions": "" }
      }
    },
    static: {
      directory: path.join(__dirname, 'app'),
      watch: true
    },
    hot: true,
    client: {
      logging: 'verbose'
    }
  },
  performance: {
    hints: false
  }
};