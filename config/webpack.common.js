const {DIR} = require('./settings');
const babelConfig = require('./babel.config');
const pkg = require('../package.json');
const cssClassNameGenerator = require('./css-modules');

const chalk = require('chalk');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const StyleLintFormatter = require('stylelint-formatter-pretty');

/**
 * It may be removed later, after this issue will be resolved:
 * https://github.com/s-panferov/awesome-typescript-loader#configuration
 */
const {CheckerPlugin} = require('awesome-typescript-loader');


const PROCESS_MODE = process.env.TARGET_ENV || 'development';
console.log(
  chalk.cyan('\n' + `>> Build for ${chalk.bold(PROCESS_MODE)} <<` + '\n')
);

module.exports = {
  entry: {
    'app': DIR.source + 'index.tsx',
  },

  output: {
    filename   : '[name].bundle.js',
    path       : DIR.client,
    pathinfo   : true,
    publicPath : '/'
  },

  cache: true,

  stats: {
    children : false,
    chunks   : false,
    exclude  : [ 'node_modules' ],
    modules  : false,
    timings  : false
  },

  resolve: {
    extensions: [ '.js', '.jsx', '.ts', '.tsx', '.pcss', '.css' ],
    alias: {
      '@Components' : DIR.components,
      '@Containers' : DIR.containers
    }
  },

  externals: {
    'react'     : 'React',
    'react-dom' : 'ReactDOM'
  },

  module: {
    rules: [
      /**
       * Manage CSS and PCSS files.
       * Also use CSS-Module for scope locally
       * all class names and animation names.
       */
      {
        test    : /\.(p?)css$/,
        exclude : /node_modules/,
        use: [
          PROCESS_MODE === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'typings-for-css-modules-loader',
            options: {
              sourceMap      : PROCESS_MODE === 'development',
              importLoaders  : 1,
              url            : false,
              modules        : true,
              camelCase      : true,
              namedExport    : true,
              getLocalIdent  : cssClassNameGenerator
            }
          },
          {
            loader  : 'postcss-loader',
            options : {config: {path: DIR.config}}
          }
        ]
      },

      /**
       * Regenerate source-map
       */
      {
        test    : /\.js$/,
        exclude : /node_modules/,
        enforce : "pre",
        loader  : "source-map-loader"
      },

      /**
       * Manage TS and TSX files
       */
      {
        test    : /\.ts(x?)$/,
        exclude : /node_modules/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              useCache : true,
              useBabel : true,
              babelOptions: {
                babelrc : false,
                presets : babelConfig.presets
              }
            }
          },
          {
            loader: 'tslint-loader',
            options: {
              configFile : DIR.config + 'tslint.json',
              emitErrors : true,
              failOnHint : true,
              formatter  : 'codeFrame'
            }
          }
        ]
      },

      /**
       * Manage SVG files
       */
      {
        test    : /\.svg$/,
        loader  : 'svg-react-loader',
        options: {
          classIdPrefix : '[name]-[hash:8]__',
          propsMap      : {fillRule: 'fill-rule'},
          xmlnsTest     : /^xmlns.*$/
        }
      },

      /**
       * Manage assets
       */
      {
        test    : /\.(png|jpe?g|gif|svg|eot|ttf|woff(2)?)$/,
        loader  : 'url-loader',
        options : {limit: 10000}
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(PROCESS_MODE)
      }
    }),

    new webpack.WatchIgnorePlugin([/pcss\.d\.ts$/]),

    new CheckerPlugin(),

    new StyleLintPlugin({
      configFile : DIR.config + 'stylelint.json',
      formatter  : StyleLintFormatter
    }),

    new MiniCssExtractPlugin({
      filename: '[name].bundle.css'
    }),

    new HtmlWebpackPlugin({
      template : DIR.source + 'index.ejs',
      filename : 'index.html',
      title    : pkg.title,
      minify: {
        html5                         : true,
        removeComments                : true,
        removeScriptTypeAttributes    : true,
        removeStyleLinkTypeAttributes : true,
        useShortDoctype               : true
      }
    })
  ]
};
