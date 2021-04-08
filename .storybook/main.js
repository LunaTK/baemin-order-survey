const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const custom = require('../config-overrides');
const { merge } = require('webpack-merge');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app"
  ],
  "webpackFinal": async (config) => {
    config = custom(config); // CRA의 config-overrides 반영
    config = merge(config, { // tsconfig.json의 paths 반영
      resolve: {
        plugins: [
          new TsconfigPathsPlugin({})
        ]
      }
    });
    return config;
  },
};