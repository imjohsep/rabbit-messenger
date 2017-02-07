import config from '../config'

export const eslintPreloader = {
    test: /\.(js|jsx)$/,
	loader: 'eslint',
	include: /src/
}

export const js = {
    test: /\.(js|jsx)$/,
	include: [/src/, /tests/],
	loaders: [
        'react-hot', 
        'babel?cacheDirectory,plugins[]=transform-runtime'
    ]
}

export const json = {
	test: /\.json$/,
	loader: 'json'
}

// Uses css modules or straight css
export const _css = !config.compiler_css_modules
	? 'css?sourceMap'
	: [
		'css?modules',
		'sourceMap',
		'importLoaders=1',
		'localIdentName=[name]__[local]'
	].join('&')

export const css = {
	test: /\.css$/,
	//include: /src/,
	loaders: [
		'style',
		'css?sourceMap',
		'postcss'
	]
}

export const scss = {
    test: /\.scss$/,
	include: /src/,
	loaders: [
		'style',
		_css,
		'postcss',
		'sass?sourceMap'
	]
}

export const img = {
    test: /\.(png|gif)$/,
    loader: 'url-loader?name=img/[name].[ext]&limit=8000'
    // inline base64 URLs for <=8k images, direct URLs for the rest
}

// Use to avoid issues with Sinon's weird implementation of UMD/AMD.
// @todo this can be removed when Sinon 2.0 is released.
export const sinon = {
    test: /sinon\/pkg\/sinon\.js/,
    loader: 'imports?define=>false,require=>false'
}
