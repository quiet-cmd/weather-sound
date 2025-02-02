import { merge } from 'webpack-merge';
import commonConfig from './common.config';
import * as CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import * as TerserPlugin from 'terser-webpack-plugin';

module.exports = merge(commonConfig, {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
        minimize: true,
        minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
    },
});
