"use strict";

const path = require("path");

module.exports = {
    dev: {
        assetsSubDirectory: "static",
        assetsPublicPath: "/",
        proxyTable: {},
        host: "localhost",
        port: 36888,
        autoOpenBrowser: false,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false,
        useEslint: false,
        showEslintErrorsInOverlay: false,
        devtool: "cheap-module-eval-source-map",
        cacheBusting: true,
        cssSourceMap: true
    },
    build: {
        index: path.resolve(__dirname, "../../dist/index.html"),
        assetsRoot: path.resolve(__dirname, "../../dist"),
        assetsSubDirectory: "static",
        assetsPublicPath: "",
        productionSourceMap: false,
        devtool: "#source-map",
        productionGzip: true,
        productionGzipExtensions: ["js", "css"],
        bundleAnalyzerReport: process.env.npm_config_report
    }
};