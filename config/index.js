import fs from 'fs'
import _debug from 'debug'
import config from './base'

const debug = _debug('app:config')

debug(`Creating ${config.env} configuration`)

const filename = `${config.env}`
let hasOverrides = false

try {
    fs.lstatSync(`${__dirname}/${filename}.js`)
    hasOverrides = true
} catch (e) {
    //
}

let overrides = null

if (hasOverrides) {
    overrides = require(`./${filename}`).default(config)
} else {
    debug(`No configuration for NODE_ENV "${config.env}". Applying base.`)
}

export default {...config, ...overrides}
