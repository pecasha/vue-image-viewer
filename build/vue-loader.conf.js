var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
    loaders : utils.cssLoaders({
        sourceMap : isProduction
            ? config.build.productionSourceMap
            : config.dev.cssSourceMap,
        extract : isProduction
    }),
    transformToRequire : {
        video : 'src',
        source : 'src',
        img : 'src',
        image : 'xlink:href'
    },
    postcss : [
        require('autoprefixer')({
            browsers : ['ie > 9', 'ff > 4', 'Chrome > 19']
        })
    ]
}
