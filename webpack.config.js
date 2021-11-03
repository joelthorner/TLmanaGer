const webpack = require('webpack');
const ejs = require('ejs');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ExtensionReloader = require('webpack-extension-reloader');
const { VueLoaderPlugin } = require('vue-loader');
const { version } = require('./package.json');

require('dotenv').config({ path: __dirname + '/.env' });
const DotenvWebpack = require('dotenv-webpack');

const config = {
  mode: process.env.NODE_ENV,
  context: __dirname + '/src',
  entry: {
    'background': './background.js',
    'popup/popup': './popup/popup.js',
    'options/options': './options/options.js',
    'welcome/welcome': './welcome/welcome.js',
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
      '@welcome': path.resolve('src/welcome'),
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
        {
          from: 'icons',
          to: 'icons',
        },
        {
          from: 'img',
          to: 'img',
        },
        {
          from: 'inject',
          to: 'inject',
          transform: (content) => {
            // Replace wildcards of .env
            content = content.toString().replace('VUE_APP_UNSPLASH_ACCESS_KEY', process.env.VUE_APP_UNSPLASH_ACCESS_KEY);
            content = content.toString().replace('ZENDESK_DOMAIN_BASE_URL', process.env.ZENDESK_DOMAIN_BASE_URL);
            content = content.toString().replace('JIRA_DOMAIN_BASE_URL', process.env.JIRA_DOMAIN_BASE_URL);
            return content;
          },
        },
        {
          from: 'data/chromeSync.js',
          to: 'data/chromeSync.js',
          transform: (content) => {
            // Transform to valid plain js file
            content = content.toString().replace('export default', 'var defaults =');
            return content;
          },
        },
        {
          from: 'popup/popup.html',
          to: 'popup/popup.html',
          transform: transformHtml
        },
        {
          from: 'options/options.html',
          to: 'options/options.html',
          transform: transformHtml
        },
        {
          from: 'welcome/welcome.html',
          to: 'welcome/welcome.html',
          transform: transformHtml
        },
        {
          from: 'manifest.json',
          to: 'manifest.json',
          transform: (content) => {
            //  https://xxxxxxxxxx.zendesk.com/ -> *://xxxxxxxxxx.zendesk.com/*
            content = content.toString().replace('ZENDESK_DOMAIN_BASE_URL',
              process.env.ZENDESK_DOMAIN_BASE_URL.replace(/https?/, '*') + '*'
            );

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
