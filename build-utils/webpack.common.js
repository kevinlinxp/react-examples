const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // 1. Use the src/index.js file as entry point to bundle it. If the src/index.js file imports other JavaScript files, bundle them as well.
  entry: './src/index.js',
  module: {
    rules: [
      {
        // 2. Make use of the previously installed Loader for Babel and ESLint. You need to tell Webpack on which files to use the loader (e.g. .js files) and optionally which folders to exclude from the process (e.g. node_modules):
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'React - Life Cycle Methods',
      template: './src/index.html'
    })
  ],
  // 3. The bundled source code files shall result in a bundle.js file in the /dist folder.
  output: {
    path: path.resolve(__dirname, '../', 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  }
};
