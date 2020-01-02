const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  entry: { app: "./src/js/app.js" },
  output: {
    path: path.resolve(__dirname, "./dist/"),
    filename: "[name].bundle.js"
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new HtmlWebpackPlugin({
      title: "PERSPECTIVE",
      template: "./src/index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css"
    }),
    new CopyWebpackPlugin([
      { from: './src/pwa/' },
      {
        from: "./src/fonts",
        to: path.resolve(__dirname, "dist/fonts")
      }
    ])
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }, {
        test: /\.(png|svg|jpg|gif|woff|woff2)$/,
        exclude: /node_modules/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
};
