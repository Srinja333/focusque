/** @type {import('next').NextConfig} */
const webpack = require("webpack");

const nextConfig = {
  reactStrictMode: false,
//   images: {
//     loader: "custom",
//     loaderFile: "./image-loader.js",
//   },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
      })
    );
    return config;
  },

//   async rewrites() {
//   return [
//     {
//       source:'/product/:productId',
//       destination:'/pages/productsDetails/product/:productId'
//     },
//     {
//       source: '/product/mob/:mobPid',
//       destination: '/pages/productsDetails/MobProduct/:mobPid',
//     },
//   ]
// }, 
  
};


module.exports = nextConfig