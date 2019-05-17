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
    path: path.resolve(__dirname, "public"),
    filename: "[name].bundle.js"
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new CopyWebpackPlugin([
      {
        from: "./src/images",
        to: path.resolve(__dirname, "public/images")
      },
      {
        from: "./src/manifest.json",
        to: path.resolve(__dirname, "public")
      },
      {
        from: "./src/favicon.ico",
        to: path.resolve(__dirname, "public")
      },
      {
        from: "./src/serviceworker.js",
        to: path.resolve(__dirname, "public")
      },
      {
        // this is optimized to be loaded for github
        from: "./src/fonts",
        to: path.resolve(__dirname, "public/fonts")
      }
    ]),
    new HtmlWebpackPlugin({
      title: "PERSPECTIVE",
      template: "./src/index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: "./",
              hmr: process.env.NODE_ENV === "development",
              removeCR: true
            }
          },
          "css-loader"
        ]
      }
    ]
  }
};
