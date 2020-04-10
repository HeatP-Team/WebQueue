var ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractLESS = new ExtractTextPlugin("css/bundle.css");

module.exports = {
  entry: "./resources/js/index.js",
  output: {
    path: __dirname + "/public",
    filename: "js/bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.less$/,
        loader: extractLESS.extract(["css-loader", "less-loader"])
      },
      {
        test: /\.png$/,
        loader: "file-loader",
        options: {name: "../public/img/[name].[ext]"}
      }
    ]
  },
  plugins: [
    extractLESS
  ]
};