require('babel-core/register');
var minimist = require('minimist');
var webpackConfig = require('../build/webpack.config').default;

var argv = minimist(process.argv.slice(2));

module.exports = function(config) {
    config.set({
        basePath: '../',
        browsers: ['Chrome'],
        client: {
            mocha: {
                grep: argv.grep
            }
        },
        colors: true,
        frameworks: [
            'mocha', 
            'chai-as-promised', 
            'chai'
        ],
        files: [
           {
               pattern: 'tests/karma.tests.js',
               watched: false,
               served: true,
               included: true
           }
        ],
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,
        preprocessors: {
            'tests/karma.tests.js': ['webpack', 'sourcemap']
        },
        reporters: ['mocha'],
        webpack: webpackConfig,
        webpackServer: {
            noInfo: true,
            stats: 'errors-only'
        }
    })
}
