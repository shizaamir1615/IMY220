// const path = require("path");
// module.exports = {
//     entry: "./frontend/src/index.js",
//     output: {
//         path:path.resolve(__dirname, 'frontend', 'public'),
//         filename: "bundle.js"
//     },
//     mode: "development",
//     module: {
//         rules: [
//             {
//                 test: /\.js$/,
//                 exclude: /node_modules/,
//                 use: {
//                     loader: "babel-loader"
//                 }
//             }
//         ]
//     }
// }

const path = require('path');

module.exports = {
  entry: './frontend/src/index.js',
  output: {
    path: path.resolve(__dirname, 'frontend/public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'frontend/public'),
    },
    port: 3000,  // The port you want to run on
    hot: true,   // Enable hot module replacement
    historyApiFallback: true, // Add this line for client-side routing
  },
  mode: 'development', // Ensure it's in development mode
};
