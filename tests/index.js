/**
 * Simple test runner
 * 
 * This is largely a pass through to Mocha and exists in case we decide to get
 * cute with tests and break them up into things like unit and integration.
 * 
 * For now, pass any arguments you would to mocha into this script and they will
 * be forwarded along.
 * 
 * If you wish to run built tests in a browser environment. Use the Karma runner
 * to execute a Webpack build instead of this script. Refer to the readme.md
 * file for more information.
 */
require('app-module-path').addPath(`${__dirname}./../src`)

import './utils/dom'

import glob from 'glob'
import minimist from 'minimist'
import Mocha from 'mocha'
import path from 'path'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

const argv = minimist(process.argv.slice(2))
const mocha = new Mocha(argv)

chai.use(chaiAsPromised)

/**
 * Removing static assets from imports.
 * @todo it would be nice to be able to test these as well but
 *       this requires webpack.
 */
const ignore = ['.css', '.scss', '.png', '.jpg']
ignore.forEach(ext => { require.extensions[ext] = () => null });

const patterns = {
    'unit': path.join(__dirname, '/unit/**/test-*.js'),
    'integration': path.join(__dirname, '/integration/**/test-*.js'),
    'all': path.join(__dirname, '/**/test-*.js')
};

let pattern;

if (argv._.includes('unit')) {
    pattern = patterns.unit
} else if (argv._.includes('integration')) {
    pattern = patterns.integration
} else {
    pattern = patterns.all
}

glob(pattern, {}, (err, files) => {
    files.forEach(file => mocha.addFile(file))
    mocha.run(failures => {
        process.on('exit', function() {
            process.exit(failures)
        })
    })
})