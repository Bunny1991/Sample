'use strict';

const resolve = require('path').resolve;
const glob = require('glob');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map', 
    entry: {
        'MainApp': (__dirname + 'index.js'), //mention your .js or .ts entry point
    },
    output: {
        path: resolve(__dirname + '/dist'), //directory where bundles file will get added
        filename: '[name].bundle.js', //name of bundle.js file in this case it will be MainApp.bundle.js
        chunkFilename: '[name].bundle.js' //to create chunks of bunldes
    },
    resolve: {
        extensions: ['.js', '.css']
    },
    //section to optimize your app.
    optimization: {
        minimize: false,
        splitChunks: { //split your modules in chunks.
            cacheGroups: {
                vendors: {
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/i, //exculde all node modules as they are not required
                    chunks: 'all',
                    priority: 1,
                    enforce: true
                },
                commons: {
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: 2
                }
            }
        },
        runtimeChunk: false
    },
    // section to declare rules
    module: {
        rules: [
            {
                test: /\.js?$/, //add or change as per you need for ex:- (.js|jsx) or (.ts|tsx)
                loader: 'babel-loader',
                exclude: [/node_modules/],
                query: {
                    //declare target browsers list to add polyfills in your code.
                    presets: [['@babel/preset-env', {
                        "useBuiltIns": "usage",
                        "corejs": 3,
                        "debug": true,
                        "targets": {
                            "browsers":
                                ["ie >= 11"]
                        }
                    }]]
                }
            },
            //section to load style and CSS files
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { minimize: true } }
                ]
            }
        ]
    }
};
