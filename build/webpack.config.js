"use strict";
const path = require("path");

const resolve = dir => path.join(__dirname, "..", dir);

module.exports = {
    resolve: {
        extensions: [".js", ".vue", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.(js|vue)$/,
                loader: "eslint-loader",
                enforce: "pre",
                include: [resolve("src"), resolve("test")],
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
                                loader: 'css-loader',
                                options: {
                                    minimize: true
                                }
                            }
                        ],
                        less: [
                            "vue-style-loader",
                            {
                                loader: 'css-loader',
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
                include: [resolve("src"), resolve("test")]
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
                        loader: 'css-loader',
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