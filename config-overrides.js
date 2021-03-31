const {
  override,
  addWebpackAlias,
  addWebpackPlugin,
  addWebpackModuleRule,
} = require('customize-cra');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = override(
  addWebpackAlias({
    react: 'preact/compat',
    'react-dom': 'preact/compat',
    'react-dom/test-utils': 'preact/test-utils',
  }),
  process.env.ANALYZE && addWebpackPlugin(new BundleAnalyzerPlugin()),
  addWebpackModuleRule({
    test: /(\.scss|\.css)$/,
    use: ['style-loader', 'css-loader', 'postcss-loader'],
  }),
);
