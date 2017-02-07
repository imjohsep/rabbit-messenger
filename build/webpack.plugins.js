import config from '../config'
import AssetsPlugin from 'assets-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import WebpackNotifierPlugin from 'webpack-notifier'

export const defineGlobals = () => new webpack.DefinePlugin(config.globals)

export const hmr = () => new webpack.HotModuleReplacementPlugin()

export const noErrors = () => new webpack.NoErrorsPlugin()

export const commons = () => new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor']
})

export const occurance = () => new webpack.optimize.OccurrenceOrderPlugin()

export const dedupe = () => new webpack.optimize.DedupePlugin()

export const uglify = () => new webpack.optimize.UglifyJsPlugin({
    output: {
        comments: false
    },
    mangle: true,
    compress: {
        unused: true,
        dead_code: true,
        warnings: false
    }
})

export const extractText = () => new ExtractTextPlugin(
    '[name].[contenthash].css', { allChunks: true }
) 

export const notify = () => new WebpackNotifierPlugin({
    title: config.project_name,
    contentImage: config.utils_paths.client('static/favicon/favicon-128.png')
})

export const manifest = () => new AssetsPlugin({
    filename: 'manifest.json',
    path: config.dir_dist(),
    fullPath: false
})

export const html = () => new HtmlWebpackPlugin({
    environment: process.env.NODE_ENV,
    filename: 'index.html',
    hash: true,
    inject: true,
    template: config.utils_paths.client('index.html'),
    title: config.project_name,
    path: config.utils_paths.base(config.dir_dist),
    minify: {
        collapseWhitespace: true
    }
})
