const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const getAddons = addonsArgs => {
  const addons = Array.isArray(addonsArgs)
    ? addonsArgs
    : [addonsArgs];
  return addons
    .filter(Boolean)
    .map(name => require(`./addons/webpack.${name}.js`));
};

module.exports = ({ profile, addon }) => {
  const envConfig = require(`./webpack.${profile}.js`);
  return webpackMerge(commonConfig, envConfig, ...getAddons(addon));
};
