const { resolve } = require("path");
const GreasemonkeyBannerPlugin = require("../../util/greasemonkey_banner_plugin.js");
const getBanner = require("../../scrapper/greasemonkey_banner.js");

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
    new GreasemonkeyBannerPlugin({
      distPath: resolve("./dist"),
      getBanner
    })
  ]
};
