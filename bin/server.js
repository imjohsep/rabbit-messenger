import path from 'path'
import _debug from 'debug'
import config from '../config'
import express from 'express'
import _http from 'http'
import _io from 'socket.io'
import history from 'connect-history-api-fallback'
import webpack from 'webpack'
import webpackConfig from '../build/webpack.config'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackDevMiddleware from 'webpack-dev-middleware'

const debug = _debug('app:server')
const app = express()

if (config.globals.__DEV__) {
    debug('Starting development server...')
    const compiler = webpack(webpackConfig)
    const serverConfig = {
        publicPath: webpackConfig.output.publicPath,
        contentBase: config.utils_paths.base(config.dir_client),
        hot: true,
        quiet: config.compiler_quiet,
        noInfo: config.compiler_quiet,
        stats: config.compiler_stats,
        historyApiFallback: true
    }

    const middleware = webpackDevMiddleware(compiler, serverConfig)
    app.use(middleware)
    app.use(webpackHotMiddleware(compiler))
    app.use(express.static(config.utils_paths.client('static')))
    app.use(history())

} else if (config.globals.NODE_ENV == 'production') {
    console.info('\nStarting production server...')

    app.use(express.static(config.utils_paths.base(config.dir_dist)))

    app.get('*', function (req, res) {
        res.sendFile(path.join(config.utils_paths.base(config.dir_dist), 'index.html'))
    })
}

const http = _http.Server(app)
const io = _io(http)

http.listen(config.server_port, config.server_host, err => {
    if (err) {
        console.log(err)
    }

    debug(`Listening on http://${config.server_host}:${config.server_port}`)
})

/**
 * Socket.io
 */
io.sockets.on('connection', socket => {
    console.log('User has connected.')
    socket.on('clientMessage', (msg) => {
        // socket.broadcast.emit('serverMessage', msg)
        console.log('broadcasting message')
        socket.broadcast.to(msg.room).emit('serverMessage', msg)
    })

    socket.on('need-id', () => {
        socket.emit('here-is-your-id', socket.id)
    })

    socket.on('create', (room) => {
        console.log('joining room', room)
        socket.join(room)
    })

    socket.on('disconnect', () => {
        console.log('A user has disconnected.')
    })
})