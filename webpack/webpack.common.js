const webpack = require("webpack");
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const srcDir = '../src/';

module.exports = {
    entry: {
        eden: path.join(__dirname, srcDir + 'eden.ts'),
        settings: path.join(__dirname, srcDir + 'settings.ts'),
        ui: path.join(__dirname, srcDir + 'ui.ts'),
        'ui.const': path.join(__dirname, srcDir + 'ui.const.ts'),
        'template/template': path.join(__dirname, srcDir + 'template/template.ts'),
        'template/template.tabs': path.join(__dirname, srcDir + 'template/template.tabs.ts'),
        'template/template.data': path.join(__dirname, srcDir + 'template/template.data.ts'),
        'model/color.selector': path.join(__dirname, srcDir + 'model/color.selector.ts'),
        'model/delete.selector': path.join(__dirname, srcDir + 'model/delete.selector.ts'),
        'model/hovered.selector': path.join(__dirname, srcDir + 'model/hovered.selector.ts'),
        'model/selector': path.join(__dirname, srcDir + 'model/selector.ts'),
        utils: path.join(__dirname, srcDir + 'utils.ts'),
        options: path.join(__dirname, srcDir + 'options.ts'),
        background: path.join(__dirname, srcDir + 'background.ts'),
        content_script: path.join(__dirname, srcDir + 'content_script.ts')
    },
    output: {
        path: path.join(__dirname, '../dist/js'),
        filename: '[name].js'
    },
    optimization: {
        splitChunks: {
            name: 'vendor',
            chunks: "initial"
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    plugins: [
        // exclude locale files in moment
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new CopyPlugin({
            patterns: [{ from: '.', to: '../', context: 'public' }],
            options: {}
        }),
    ]
};
