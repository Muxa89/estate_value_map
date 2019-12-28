const { resolve } = require("path");

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
  }
};
