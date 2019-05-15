const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  entry: { app: "./src/js/app.js" },
  output: {
    path: path.resolve(__dirname, "docs"),
    filename: "[name].bundle.js"
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new CopyWebpackPlugin([
      {
        from: "./src/images",
        to: path.resolve(__dirname, "docs/images")
      },
      {
        from: "./src/manifest.json",
        to: path.resolve(__dirname, "docs")
      },
      {
        from: "./src/favicon.ico",
        to: path.resolve(__dirname, "docs")
      },
      {
        from: "./src/serviceworker.js",
        to: path.resolve(__dirname, "docs")
      },
      {
        // this is optimized to be loaded for github
        from: "./src/css",
        to: path.resolve(__dirname, "docs/css")
      }
    ]),
    new HtmlWebpackPlugin({
      title: "PERSPECTIVE",
      template: "./src/index.html"
    })
  ]
};
