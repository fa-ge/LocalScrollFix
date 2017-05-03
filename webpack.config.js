const path = require('path')
const args = require('minimist')(process.argv.slice(2))


let config
if (args.env === 'lib') {
    config = {
        entry: {
            LocalScrollFix: './src/LocalScrollFix.js'
        },
        output: {
            path: path.resolve(__dirname, './lib'),
            filename: '[name].js',
            library: 'LocalScrollFix.js',
            libraryTarget: 'umd'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: [
                        {
                            loader: 'babel-loader',
                        }
                    ],
                    include: path.resolve(__dirname, 'src')
                }
            ],
        }
    }
} else {
    config = {
        entry: {
            index: './src/demo/index.js'
        },
        output: {
            path: './dist',
            filename: '[name].js'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: [
                        {
                            loader: 'babel-loader',
                        }
                    ],
                    include: path.resolve(__dirname, 'src')
                }
            ],
        },
        devtool: 'eval-source-map',
        devServer: {
            contentBase: './src',
            port: 9000
        },
    }
}

module.exports = config