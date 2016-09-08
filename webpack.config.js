const path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {
    app: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'public')
};

module.exports = {

    entry: {
        app: PATHS.app
    },
  //  entry: [
  //'webpack-dev-server/client?http://0.0.0.0:4080',
  //  './src/index.js'
  //],
    output: {
        path: PATHS.build,
        filename: 'bundle.js'
    },
  module: {
      loaders: [
          {
              test: /\.css$/,
              loader: 'style!' + 'css?sourceMap'
          },
          {
              test: /\.scss$/,
              loader: 'style!' + 'css?sourceMap' + '!sass?sourceMap'
          },
          {
              test: /\.(json)/,
              exclude: /node_modules/,
              loader: 'json-loader'
          },
          {
              test:/\.(svg|ttf|woff|woff2|eot)(\?v=\d+\.\d+\.\d+)?$/,
              loader: 'url-loader'
          },
          {
              test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              loader: 'babel'
          }
    ]
  },
  plugins: [
      new CopyWebpackPlugin([
        {
            from: PATHS.app + "/index.html",
			to: ""
        },
        {
            from: "style/*",
            to: "style/"
        }
        ])
      ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: PATHS.build
  }
};
