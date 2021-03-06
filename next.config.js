/** @type {import('next').NextConfig} */

const path = require('path');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
      config.resolve.fallback.dns = false;
      config.resolve.fallback.net = false;
      config.resolve.fallback.tls = false;
      config.resolve.fallback.readline = false;
    }

    config.module.rules.push({
      test: /\.svg$/i,
      include: path.join(process.cwd(), 'icons'),
      use: [
        {
          loader: 'svg-sprite-loader',
          options: {
            extract: true,
            outputPath: 'static/',
            publicPath: 'static/',
            esModule: false,
          },
        },
      ],
    });

    config.module.rules.push({
      test: /\.svg$/i,
      include: path.join(process.cwd(), 'public', 'images'),
      use: [
        {
          loader: '@svgr/webpack',
          // https://react-svgr.com/docs/options/
          options: {
            prettier: false,
            svgo: true,
            titleProp: true,
            svgoConfig: {
              plugins: [
                {
                  name: 'removeViewBox',
                  active: false,
                },
                {
                  name: 'prefixIds',
                  active: false,
                },
              ],
            },
          },
        },
        {
          loader: 'url-loader',
        },
      ],
    });

    config.plugins.push(new SpriteLoaderPlugin());

    return config;
  },
};

module.exports = nextConfig;
