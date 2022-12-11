const path = require("path");

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "src/react-native-countdown.tsx"),
  output: {
    filename: "react-native-countdown.js",
    path: path.join(__dirname, "/dist"),
    library: "our-components-library",
    libraryTarget: "umd",
    umdNamedDefine: true,
    globalObject: "this",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              presets: ["module:metro-react-native-babel-preset"],
              plugins: ["react-native-web"],
            },
          },
          // {
          //   loader: "awesome-typescript-loader",
          //   options: {
          //     configFileName: "tsconfig.json",
          //   },
          // },
        ],
      },
      {
        test: /\.(gif|jpe?g|png|svg)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "[name].[ext]",
            esModule: false,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      "react-native$": "react-native-web",
    },
  },
  externals: {
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "React",
      root: "React",
    },
    "react-dom": {
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "ReactDOM",
      root: "ReactDOM",
    },
  },
};
