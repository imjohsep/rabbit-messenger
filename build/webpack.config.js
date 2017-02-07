import _debug from 'debug'
import config from '../config'
import cssnano from 'cssnano'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import * as loaders from './webpack.loaders'
import * as plugins from './webpack.plugins'

const debug = _debug('app:webpack')
debug('Creating configuration')

const {__DEV__, __PROD__, __TEST__} = config.globals
const ENTRY = config.utils_paths.client('index.js')

let webpackConfig = {
    name: 'Confucius',
    target: 'web',
    devtool: config.compiler_devtool,
    resolve: {
        root: config.utils_paths.base(config.dir_client),
        extensions: ['', '.js', '.jsx']
    },
    sassLoader: {
        includePaths: [
            config.utils_paths.base(config.dir_client),
            config.utils_paths.client('styles'),
            config.utils_paths.client('images')
        ]
    },
    postcss: [
        cssnano({
            autoprefixer: {
                add: true,
                remove: true,
                browsers: ['last 2 versions']
            },
            discardComments: {
                removeAll: true
            },
            safe: true,
            sourcemap: true
        })
    ]
}

if (__DEV__) {
    webpackConfig.entry = {
        app: [ENTRY, `webpack-hot-middleware/client?path=${config.compiler_public_path}__webpack_hmr`],
        vendor: config.compiler_vendor
    }
} else {
    webpackConfig.entry = {
        app: ENTRY,
        vendor: config.compiler_vendor
    }
}

webpackConfig.output = {
    filename: `[name].[${config.compiler_hash_type}].js`,
    path: config.utils_paths.base(config.dir_dist),
    publicPath: config.compiler_public_path
}

webpackConfig.plugins = [
    plugins.defineGlobals(),
    plugins.html(),
    plugins.notify(),
    plugins.occurance()
]

webpackConfig.module = {
    preLoaders: [
        loaders.eslintPreloader
    ],
    loaders: [
        loaders.js,
        loaders.json,
        loaders.css,
        loaders.scss,
        loaders.img
    ]
}

if (!__TEST__) {
    webpackConfig.plugins.push(plugins.commons())
}

if (__DEV__) {
    debug('Enable development only plugins')
    webpackConfig.plugins = webpackConfig.plugins.concat([
        plugins.hmr(),
        plugins.noErrors()
    ])
} else if (__PROD__) {
    debug('Apply ExtractTextPlugin to CSS loaders')
    webpackConfig.module.loaders.filter(
        loader => loader.loaders && loader.loaders.find(
            name => /css/.test(name.split('?')[0])
        )
	).forEach(loader => {
		const [first, ...rest] = loader.loaders
		loader.loader = ExtractTextPlugin.extract(first, rest.join('!'))
		delete loader.loaders
	})

    debug('Enable production only plugins')
    webpackConfig.plugins = webpackConfig.plugins.concat([
        plugins.dedupe(),
        plugins.uglify(),
        plugins.extractText(),
        plugins.manifest()
    ])
} else if (__TEST__) {
    debug('Apply test only settings')

    webpackConfig.output.libraryTarget = 'commonjs2'
    
    webpackConfig.module.loaders = [
        ...webpackConfig.module.loaders,
        loaders.sinon
    ]

    webpackConfig.module.noParse = [
        /node_modules\/sinon\//  // 1.* has bad imports, can remove when 2.* is out
    ]

    webpackConfig.resolve = {
        ...webpackConfig.resolve,
        alias: {
            sinon: 'sinon/pkg/sinon'
        }
    }

    webpackConfig.externals = {
        'cheerio': 'window',
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': 'window',
        'text-encoding': 'window',
        'react/addons': true // For enzyme
    }
}

export default webpackConfig
