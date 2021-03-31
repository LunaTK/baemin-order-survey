const precss = require('precss');

module.exports = {
  plugins: [
    [
      'postcss-preset-env',
      {
        // Options
      },
    ],
    precss,
  ],
};
