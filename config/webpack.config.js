var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require("html-webpack-plugin");
var HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin')

var serverConfig = {
    mode: "development",
    plugins: [new webpack.DefinePlugin({
            "global.GENTLY": false,
        }),
        new HtmlWebpackPlugin({
            inject: true,
            minify: {
                //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false, //删除空白符与换行符
                removeAttributeQuotes: true//压缩 去掉引号
            },
            template: "./template/index.html",
            filename: "SamYoc_Trade.html",
            minify: true,
            inlineSource: '.(js|css)'
        }),
        new HtmlWebpackInlineSourcePlugin(),
        new UglifyJSPlugin()
    ],
    entry: {
        server: "./app.js"
    },
    target: 'node',
    node: {
        __filename: true,
        __dirname: true
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        }, {
            test: /.(svg|png|jpg|jpeg|otf|gif)$/,
            exclude: /node_modules/,
            use: 'url?limit=10'
        }]
    },
    // externals: getExternals(),
    resolve: {
        extensions: ['.js', '.jsx', '.less', '.css', '.json']
    }
};

module.exports = serverConfig;