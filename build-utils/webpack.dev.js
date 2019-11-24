const webpack = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  // The /dist folder will be used to serve our application to the browser.
  devServer: {
    contentBase: './dist',
    hot: true,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
