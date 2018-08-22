const {DIR} = require('./settings');
const babelConfig = require('./babel.config');

const chalk = require('chalk');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StyleLintPlugin = require('stylelint-webpack-plugin');
const StyleLintFormatter = require('stylelint-formatter-pretty');

const PROCESS_MODE = process.env.TARGET_ENV || 'development';
console.log(
  chalk.cyan('\n' + `>> Build for ${chalk.bold(PROCESS_MODE)} <<` + '\n')
);

module.exports = {
  entry: {
    'app': DIR.source + 'app.tsx',
  },

  output: {
    filename: '[name].bundle.js',
    path: DIR.client,
    pathinfo: true,
    publicPath: '/'
  },

  cache: true,

  stats: {
    children: false,
    chunks: false,
    exclude: [ 'node_modules' ],
    modules: false,
    timings: false
  },

  resolve: {
    extensions: [ '.ts', '.tsx', '.js', '.jsx', '.pcss', '.css' ]
  },

  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },

  module: {
    rules: [
      /**
       * Manage HTML files
       */
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {minimize: true}
      },

      /**
       * Manage CSS + PCSS files
       */
      {
        test: /\.(p?)css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              // modules: true,                         /* Uncomment for enabling CSS-Modules */
              // localIdentName: '[name]-[module]',     /* Uncomment for enabling CSS-Modules */
              import: false,
              importLoaders: 1,
              url: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {path: DIR.config}
            }
          }
        ]
      },

      /**
       * Regenerate source-map
       */
      {
        test: /\.js$/,
        enforce: "pre",
        loader: "source-map-loader"
      },

      /**
       * Manage TS and TSX files
       */
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              useCache: true,
              useBabel: true,
              babelOptions: {
                babelrc: false,
                presets: babelConfig.presets
              }
            }
          },
          {
            loader: 'tslint-loader',
            options: {
              configFile: DIR.config + 'tslint.json',
              emitErrors: true,
              failOnHint: true,
              formatter: 'codeFrame'
            }
          }
        ]
      },

      /**
       * Manage SVG files
       */
      {
        test: /\.svg$/,
        loader: 'svg-react-loader',
        options: {
          classIdPrefix: '[name]-[hash:8]__',
          propsMap: {fillRule: 'fill-rule', foo: 'bar'},
          xmlnsTest: /^xmlns.*$/
        }
      },

      /**
       * Manage assets
       */
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff(2)?)$/,
        loader: 'url-loader',
        options: {limit: 10000}
      }
    ]
  },

  plugins: [
    new StyleLintPlugin({
      syntax: 'scss',
      configFile: DIR.config + 'stylelint.json',
      formatter: StyleLintFormatter
    }),

    new HtmlWebpackPlugin({
      template: DIR.source + 'index.ejs',
      filename: 'index.html',
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
