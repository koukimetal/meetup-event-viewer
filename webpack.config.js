require('dotenv').config();
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/front/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    plugins: [
        new TsconfigPathsPlugin({configFile: './src/front/tsconfig.json'}),
    ]
  },
  devtool: "source-map",
  plugins: [new HtmlWebpackPlugin({
    GOOGLE_MAP_API_KEY: process.env.GOOGLE_MAP_API_KEY,
    template: path.join(__dirname, 'src', 'front', 'index.html'),
    inject: 'head',
  })],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist', 'index.html'),
    compress: true,
    port: 9000
  }
};