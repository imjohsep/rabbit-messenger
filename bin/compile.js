/* eslint-disable no-console */
import _debug from 'debug'
import fs from 'fs'
import minimist from 'minimist'
import webpack from 'webpack'
import webpackConfig from '../build/webpack.config'
import config from '../config'

const debug = _debug('app:compile')
const argv = minimist(process.argv.slice(2), {
	boolean: 'stats', alias: { s: 'stats' }
})

debug('Create webpack compiler')
const compiler = webpack(webpackConfig)

compiler.run((err, stats) => {

    const jsonStats = stats.toJson()

    debug('Webpack compile complete')

    if (err) {
		debug('Webpack compiler encountered a fatal error', err)
		process.exit(1)
	} else if (jsonStats.errors.length > 0) {
		debug('Webpack compiler encountered errors')
		console.log(stats.toString('errors-only'))
		process.exit(1)
	} else if (jsonStats.warnings.length > 0) {
		debug('Webpack compiler encountered warnings')

		if (config.compiler_fail_on_warning) {
			process.exit(1)
		}
	} else {
		if (argv.stats) {
			fs.writeFile(
				`${config.dir_dist('_stats.json')}`, 
				JSON.stringify(jsonStats)
			)
		}
		debug('No errors or warnings encountered')
	}

	debug('Copying static assets')
	fs.copySync(config.utils_paths.client('static'), config.utils_paths.dist())
})
