const currentTask = process.env.npm_lifecycle_event
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const PORT = 8080;

const postCSSPlugins = [
  require('postcss-import'),
  require('postcss-mixins'),
  require('postcss-simple-vars'),
  require('postcss-nested'),
  require('postcss-hexrgba'),
  require('autoprefixer')
];

let cssConfig = {
  test: /\.css$/i,
  use: ['css-loader?url=false', {loader: 'postcss-loader', options: {plugins: postCSSPlugins}}]
}

let config = {
  entry: path.join(__dirname, './src/index.js'),
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  module: {
    rules: [
      cssConfig,
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [':data-src']
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: 'dist',
    port: PORT,
  }
}

if(currentTask === 'dev') {
  cssConfig.use.unshift('style-loader')
  config.output = {
    filename: 'bundled.js',
    path: path.resolve(__dirname, 'src')
  }
  config.mode = 'development'
}

if(currentTask === 'prod') {
  cssConfig.use.unshift(MiniCSSExtractPlugin.loader)
    postCSSPlugins.push(require('cssnano'))
    config.output = {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    }
    config.mode = 'production'
    config.optimization = {
        splitChunks: {chunks: 'all'}
    }
    config.plugins.push(
        new CleanWebpackPlugin(), 
        new MiniCSSExtractPlugin({filename: 'styles.[chunkhash].css'})
    )
}

module.exports = config;