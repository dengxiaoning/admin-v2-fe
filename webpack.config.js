const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './src/app.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/app.js',
    publicPath: "/dist"
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      // react(jsx) deal
      {
        test: /\.m?jsx$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react']
          }
        }
      },
      // css deal
      {
        test: /\.css$/i,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      // css deal
      {
        test: /\.css$/i,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      // sass deal
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      // file deal
      {
        test: /\.(png|jpg|gif)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: 'resource/[name].[ext]'
          },
        }, ],
      },
      // font icon deal
      {
        test: /\.(eot|svg|ttf|woff|woff2|otf)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: 'resource/[name].[ext]'
          },
        }, ],
      },
    ]
  },
  plugins: [
    // 处理html
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    // css 独立
    new ExtractTextPlugin({
      filename: "css/[name].css",
      disable: false,
      allChunks: true
    }),
    // 剔除功能组件
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'js/base.js'
    })
  ]
};