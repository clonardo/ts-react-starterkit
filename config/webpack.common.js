const {DIR} = require('./settings');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const PROCESS_MODE = process.env.TARGET_ENV || 'development';
console.log(`>> Build for ${PROCESS_MODE} <<\n`);

module.exports = {
  entry: {
    'collection/dist/elements': DIR.collection + 'src/index.ts',
    'demo/build/demo': DIR.demo + 'src/scripts/app.ts'
  },
  output: {
    filename: '[name].bundle.js',
    path: DIR.root,
    pathinfo: true,
    publicPath: '/'
  },

  cache: true,

  stats: {
    children: false,
    chunks: false,
    modules: false,
    exclude: [ 'node_modules' ]
  },

  resolve: {
    extensions: [ '.ts', '.tsx', '.js', '.jsx', '.pcss', '.css' ],
    plugins: [ new TsconfigPathsPlugin() ],
    alias: {
      Elements: DIR.elements,
      Helpers: DIR.helpers
    }
  },

  module: {
    rules: [
      {
        test: /\.(p?)css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              import: false,
              importLoaders: 1,
              localIdentName: '[name]-[module]',
              modules: true,
              url: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: DIR.config + 'postcss.config.js',
              }
            }
          }
        ]
      },

      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: DIR.config + 'babel.config.js',
            }
          },
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              experimentalWatchApi: true
            }
          },
          {
            loader: 'tslint-loader',
            options: {
              emitErrors: true,
              failOnHint: true
            }
          }
        ]
      },

      {
        test: /\.svg$/,
        loader: 'svg-react-loader',
        options: {
          classIdPrefix: '[name]-[hash:8]__',
          propsMap: {fillRule: 'fill-rule', foo: 'bar'},
          xmlnsTest: /^xmlns.*$/
        }
      },

      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {limit: 10000}
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: DIR.demo + 'src/index.ejs',
      filename: 'demo/build/index.html',
      minify: {
        html5: true,
        removeComments: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),

    new MiniCssExtractPlugin({
      filename: '[name].bundle.css'
    }),

    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(PROCESS_MODE)
      }
    })
  ]
};