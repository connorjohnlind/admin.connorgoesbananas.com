const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: '[name].css',
  disable: process.env.NODE_ENV === 'development',
});

module.exports = {
  devtool: 'cheap-module-source-map',
  devServer: {
    historyApiFallback: true,
  },
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    chunkFilename: '[id].js',
    publicPath: '',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(scss|sass|css)$/,
        exclude: /node_modules/,
        use: extractSass.extract({
          use: [{
            loader: 'css-loader',
            options: {
              // importLoaders: 1,
              minimize: true,
              // modules: true,
              // localIdentName: '[name]__[local]__[hash:base64:5]',
            },
          }, {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [autoprefixer({
                browsers: ['> 1%', 'last 2 versions'],
              })],
            },
          }, {
            loader: 'sass-loader',
          }],
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader?limit=8000&name=images/[name].[ext]',
      },
      {
        test: /\.svg$/,
        loader: 'url-loader?limit=65000&mimetype=image/svg+xml&name=fonts/[name].[ext]',
      },
      {
        test: /\.woff$/,
        loader: 'url-loader?limit=65000&mimetype=application/font-woff&name=fonts/[name].[ext]',
      },
      {
        test: /\.woff2$/,
        loader: 'url-loader?limit=65000&mimetype=application/font-woff2&name=fonts/[name].[ext]',
      },
      {
        test: /\.[ot]tf$/,
        loader: 'url-loader?limit=65000&mimetype=application/octet-stream&name=fonts/[name].[ext]',
      },
      {
        test: /\.eot$/,
        loader: 'url-loader?limit=65000&mimetype=application/vnd.ms-fontobject&name=fonts/[name].[ext]',
      },
      {
        test: /\.(ico)$/, // favicon
        loader: 'file-loader?name=[name].[ext]',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/src/index.html'),
      filename: 'index.html',
      inject: 'body',
    }),
    new CopyWebpackPlugin([
    ]),
    new webpack.optimize.UglifyJsPlugin(),
    extractSass,
  ],
};
