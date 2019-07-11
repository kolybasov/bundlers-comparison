const path = require("path");
const {
  ContextReplacementPlugin,
  HotModuleReplacementPlugin
} = require("webpack");
const MiniCssExtracPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { BundleStatsWebpackPlugin } = require("bundle-stats");

const dev = (process.env.NODE_ENV || "development") === "development";

module.exports = {
  mode: dev ? "development" : "production",
  target: "web",
  entry: path.resolve(__dirname, "./src/index.tsx"),
  output: {
    filename: "[name].bundle.js",
    chunkFilename: "[name].chunk.js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new MiniCssExtracPlugin({
      filename: "[name].css",
      chunkFilename: "[name].chunk.css"
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html")
    }),
    new ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    dev && new HotModuleReplacementPlugin(),
    new BundleStatsWebpackPlugin()
  ].filter(Boolean),
  optimization: {
    minimizer: [new TerserPlugin({ cache: true, parallel: true })],
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        styles: {
          name: "styles",
          test: /\.less$/,
          chunks: "all",
          enforce: true
        }
      }
    }
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".mjs", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        loader: "babel-loader",
        include: [
          path.resolve(__dirname, "src"),
          /antd(?!node_modules)/,
          /rc\-*(?!node_modules)/,
          /css-animation(?!node_modules)/
        ]
      },
      {
        test: /\.less$/,
        loader: [
          { loader: MiniCssExtracPlugin.loader, options: {} },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          { loader: "postcss-loader", options: {} },
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true,
              modifyVars: {
                "@primary-color": "#00c5cd"
              }
            }
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 3000,
    historyApiFallback: true,
    hot: true
  }
};
