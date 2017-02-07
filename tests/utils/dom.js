/**
 * jsdom says not to do this, but for now I'm going to.
 * @see https://github.com/tmpvar/jsdom/wiki/Don't-stuff-jsdom-globals-onto-the-Node-global
 */
import jsdom from 'jsdom'
import 'isomorphic-fetch'
import navigator from './navigator'

global.document = jsdom.jsdom('')
global.window = global.document.defaultView

Object.keys(window).forEach(function(prop) {
    if (typeof global[prop] === 'undefined') {
        global[prop] = window[prop]
    }
})

global.navigator = navigator
