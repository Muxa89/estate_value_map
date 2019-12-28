const { resolve } = require("path");
const webpack = require("webpack");
const banner = require("../../scrapper/banner_text.js");

module.exports = {
  mode: "development",
  entry: {
    scrapper: "./scrapper/main.ts"
  },
  resolve: {
    extensions: [".js", ".ts"]
  },
  output: {
    path: resolve("./dist"),
    filename: "scrapper.user.js"
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: "ts-loader"
      }
    ]
  },
  devServer: {
    port: 8080,
    contentBase: "public"
  },
  plugins: [
    new webpack.BannerPlugin({
      banner,
      raw: true
    })
  ]
};
