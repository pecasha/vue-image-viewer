"use strict";
const path = require("path");
const webpack = require("webpack");
const uglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
    entry: {
        app: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, "../lib"),
        publicPath: "/",
        filename: "vue-image-viewer.js",
        library: "vueImageViewer",
        libraryTarget: "umd",
        umdNamedDefine: true
    },
    externals: {
        vue: {
            root: "Vue",
            commonjs: "vue",
            commonjs2: "vue",
            amd: "vue"
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: "'production'"
            }
        }),
        new uglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    warnings: false,
                    drop_debugger: true,
                    drop_console: true
                }
            },
            parallel: true
        })
    ],
    node: {
        setImmediate: false,
        dgram: "empty",
        fs: "empty",
        net: "empty",
        tls: "empty",
        child_process: "empty"
    },
    resolve: {
        extensions: [".js", ".vue", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.(js|vue)$/,
                loader: "eslint-loader",
                enforce: "pre",
                options: {
                    formatter: require("eslint-friendly-formatter"),
                    emitWarning: false
                }
            },
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: {
                    loaders: {
                        css: [
                            "vue-style-loader",
                            {
                                loader: "css-loader",
                                options: {
                                    minimize: true
                                }
                            }
                        ],
                        less: [
                            "vue-style-loader",
                            {
                                loader: "css-loader",
                                options: {
                                    minimize: true
                                }
                            },
                            "less-loader"
                        ]
                    },
                    cacheBusting: true,
                    transformToRequire: {
                        video: ["src", "poster"],
                        source: "src",
                        img: "src",
                        image: "xlink:href"
                    }
                }
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.(woff2?|eot|ttf|otf|png|jpe?g|gif|svg|mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000
                }
            },
            {
                test: /\.less$/,
                loaders: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            minimize: true
                        }
                    },
                    "less-loader"
                ]
            }
        ]
    }
};