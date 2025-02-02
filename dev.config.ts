import { merge } from 'webpack-merge';
import commonConfig from './common.config';

module.exports = merge(commonConfig, {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        port: 3000,
        hot: true,
        open: true,
    },
});
