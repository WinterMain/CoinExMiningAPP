 const merge = require('webpack-merge');
 const common = require('./webpack.config.js');
 const webpack = require('webpack');

 const commonNew = Object.assign({}, common);
 delete commonNew.target;

 module.exports = merge(commonNew, {
     mode: "production",
     plugins: [new webpack.DefinePlugin({
         "global.GENTLY": false,
         '__isServer__': true,
         '__isClient__': false,
         '_isDevelopment_': false,
         'process.env': {
             'NODE_ENV': JSON.stringify('production'),
             'APP': JSON.stringify('Coinex'),
         }
     })],
 });