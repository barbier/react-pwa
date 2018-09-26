var webpack = require('webpack')

module.exports = {
    entry: `${__dirname}/src/index.js`,
    output: {
        path: `${__dirname}/public`,
        filename: 'bundle.js',
        publicPath: '/',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react'],
                    plugins: ['transform-class-properties']
                }
            }
        ],
    },
    plugins: [
    ],
    devServer: {
        contentBase: './public',
        historyApiFallback: true,
        inline: true,
    },
}