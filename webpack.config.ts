/* eslint-disable @typescript-eslint/no-require-imports */
import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

interface Configuration extends WebpackConfiguration {
    devServer?: WebpackDevServerConfiguration;
  }

interface WebpackArgv {
    mode?: 'development' | 'production';
}

const config: Configuration = {
    context: path.resolve(__dirname, 'src'),

    entry: './index.ts',
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        publicPath: '/',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
            },
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
    ],  
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/images/[name][ext]'
                }
            },
            {
                test: /\.svg$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/icons/[name][ext]'
                }
            },

            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name][ext]'
                }
            },
            {
                test: /\.(mp3|wav)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/sounds/[name][ext]'
                }
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },

        ],
    },
    resolve: {
        extensions: ['.js', '.json', '.ts'],
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@assets': path.resolve(__dirname, './src/assets')
        }
    },
};


module.exports = (env: never, argv: WebpackArgv): Configuration => {
    if (argv.mode === 'development') {
        config.devtool = 'eval-source-map';
        config.devServer = {
            port: 3000,
            hot: true,
            open: true,
        };
    }
    if (argv.mode === 'production') {
        config.devtool = 'source-map';
    }

    return  config;
};