 const merge = require('webpack-merge');
 const common = require('./webpack.config.js');
 const webpack = require('webpack');

 const commonNew = Object.assign({}, common);
 delete commonNew.target;

 module.exports = merge(commonNew, {
     plugins: [new webpack.DefinePlugin({
         "global.GENTLY": false,
         '__isServer__': true,
         '__isClient__': false,
         '_isDevelopment_': false,
         'process.env': {
             'NODE_ENV': JSON.stringify('development'),
             'APP': JSON.stringify('Coinex'),
         }
     })],
 });