const webpack = require('webpack');
const ejs = require('ejs');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ExtensionReloader = require('webpack-extension-reloader');
const { VueLoaderPlugin } = require('vue-loader');
const { version } = require('./package.json');
const Dotenv = require('dotenv').config({ path: __dirname + '/.env' });
const DotenvWebpack = require('dotenv-webpack');

const config = {
  mode: process.env.NODE_ENV,
  context: __dirname + '/src',
  entry: {
    'background': './background.js',
    'popup/popup': './popup/popup.js',
    'options/options': './options/options.js',
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@': path.resolve('src'),
      '@options': path.resolve('src/options'),
      '@mixins': path.resolve('src/mixins'),
      '@popup': path.resolve('src/popup'),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.sass$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader?indentedSyntax'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
          outputPath: '/images/',
          emitFile: true,
          esModule: false,
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
          outputPath: '/fonts/',
          emitFile: true,
          esModule: false,
        },
      },
    ],
  },
  plugins: [
    new DotenvWebpack(),
    new webpack.DefinePlugin({
      global: 'window',
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'icons', to: 'icons' },
        { from: 'img', to: 'img' },

        { from: 'inject', to: 'inject' },
        {
          from: 'data/chromeSync.js',
          to: 'data/chromeSync.js',
          transform: (content) => {
            // Transform to valid plain js file
            content = content.toString().replace('export default', 'const defaults =');

            // Add unsplash api key if not exists
            let findDownloadLocation = content.match(/downloadLocation\s?:\s?['"`]https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)['"`]/);
            if (findDownloadLocation && findDownloadLocation.length) {
              let line = findDownloadLocation[0];
              let findApiKey = line.match(new RegExp(process.env.VUE_APP_UNSPLASH_ACCESS_KEY, 'i'));
              var lastChar = line.substr(line.length - 1);

              if (findApiKey === null)
                content = content.replace(line, `${line.slice(0, -1)}?client_id=${process.env.VUE_APP_UNSPLASH_ACCESS_KEY}${lastChar}`);
            }
            // End add unsplash api key if not exists

            return content;
          },
        },

        { from: 'popup/popup.html', to: 'popup/popup.html', transform: transformHtml },
        { from: 'options/options.html', to: 'options/options.html', transform: transformHtml },
        {
          from: 'manifest.json',
          to: 'manifest.json',
          transform: (content) => {
            const jsonContent = JSON.parse(content);
            jsonContent.version = version;

            if (config.mode === 'development') {
              jsonContent['content_security_policy'] = "script-src 'self' 'unsafe-eval'; object-src 'self'";
            }

            return JSON.stringify(jsonContent, null, 2);
          },
        },
      ]
    }),
  ],
};

if (config.mode === 'production') {
  config.plugins = (config.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
  ]);
}

if (process.env.HMR === 'true') {
  config.plugins = (config.plugins || []).concat([
    new ExtensionReloader({
      manifest: __dirname + '/src/manifest.json',
    }),
  ]);
}

function transformHtml(content) {
  return ejs.render(content.toString(), {
    ...process.env,
  });
}

module.exports = config;
