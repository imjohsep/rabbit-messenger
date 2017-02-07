import path from 'path'

const config = {
    env: process.env.NODE_ENV || 'development',
    version: process.env.npm_package_version,

    path_base: path.resolve(__dirname, '../'),
    dir_client: 'src',
	dir_dist: 'dist',
	dir_test: 'tests',

    project_name: 'React Redux Kit',

    server_host: 'localhost',
	server_port: process.env.PORT || 3000,

    compiler_css_modules: true,
    compiler_devtool: 'source-map',
    compiler_hash_type: 'hash',
	compiler_fail_on_warning: false,
	compiler_quiet: false,
	compiler_public_path: '/',
	compiler_stats: {
		chunks: false,
		chunkModules: false,
		colors: true
	},
    compiler_vendor: [
        'babel-polyfill'
    ]
}

config.globals = {
    'process.env': {
        'NODE_ENV': JSON.stringify(config.env)
    },
    'NODE_ENV': config.env,
    '__VERSION__': JSON.stringify(config.version),
	'__ENV__': JSON.stringify(config.env),
    '__DEV__': config.env === 'development',
	'__PROD__': config.env === 'production',
	'__TEST__': config.env === 'test'
}

config.utils_paths = (() => {
    const resolve = path.resolve
    const base = (...args) => resolve.apply(
        resolve, [config.path_base, ...args]
    )
    return {
        base,
        client: base.bind(null, config.dir_client),
        dist: base.bind(null, config.dir_dist)
    }
})()

export default config
