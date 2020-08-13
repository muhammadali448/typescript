const path = require("path");
const CleanPlugin = require("clean-webpack-plugin");
module.exports = {
  mode: "production",
  devtool: "none",
  entry: "./src/app.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: "ts-loader", exclude: /node_modules/ },
    ],
  },
  plugins: [new CleanPlugin.CleanWebpackPlugin()],
};
