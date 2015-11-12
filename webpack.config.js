var path = require('path');

module.exports = {
    entry: {
        'window.js': './src/window.jsx'
    },
    output: {
        path         : path.join(__dirname, 'dst'),
        filename     : '[name]',
        // libraryTarget: 'commonjs2'
    },
    // devtool: 'cheap-module-eval-source-map',
    // ignore: [
    // //     'app',
    //     "**/node_modules/**/*.*"
    // ],
    module: {
        loaders: [
            {
                test   : /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ["babel?presets[]=es2015&presets[]=react&presets[]=stage-0"]
            },
            {
                test   : /\.less$/,
                exclude: /node_modules/,
                loaders: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            // {
            //     test : /\.css$/,
            //     // exclude: /node_modules/,
            //     loaders: [
            //         'style-loader',
            //         'css-loader'
            //     ]
            // }
        ]
    },
    externals : {
        'react'     : 'React',
        'react-dom' : 'ReactDOM',
        'fs'        : 'fs',
        'jquery'    : 'jQuery',
        // '$'         : 'jQuery'
    //     'events' : 'events',
    //     'ipc'    : 'ipc',
        // 'app'            : 'app',
        // 'browser-window' : 'browser-window',
        // 'crash-reporter' : 'crash-reporter'
    },
    resolve : {
        extensions : [ '', '.js', '.jsx' ],
        // packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
    },
    // plugins: [ 'syntax-jsx' ]
};
