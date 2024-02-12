const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: './js/main.js',
  output: {
    filename: `./js/${filename('js')}`,
    path: path.resolve(__dirname, 'app'),
    publicPath: ''
  },
  devtool: isProd ? false : 'source-map',
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'app')
    },
    open: true,
    hot: true,
    compress: true,
    port: 3000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: isDev ? false : true
      }
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `./css/${filename('css')}`,
    }),
    // new CopyWebpackPlugin({
    //   patterns: [{
    //     from: path.resolve(__dirname, 'src/assets'),
    //     to: path.resolve(__dirname, 'app'),
    //   }]
    // })
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev
            }
          },
          "css-loader"
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resoursePath, context) => {
                return path.relative(path.dirname(resoursePath), context) + '/';
              }
            }
          },
          "css-loader",
          "sass-loader"],
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },

      {
        test: /\.(?:|gif|png|jpg|jpeg|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: `./img/${filename('[ext]')}`,
        },
      },

      {
        test: /\.(?:|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: `./fonts/${filename('[ext]')}`,
        },
      }
    ]
  }
}