const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const withTM = require('next-transpile-modules')(['break-ui']);

module.exports = withTM({
  reactStrictMode: true,
  experimental: {
    externalDir: true,
    transpilePackages: ['break-ui'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
  webpack(config, options) {
    const { dev, isServer } = options;
    if (dev) {
      config.plugins.push(new ForkTsCheckerWebpackPlugin());
    }
    return config;
  },
});
