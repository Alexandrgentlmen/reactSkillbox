const path = require('path');
const { HotModuleReplacementPlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;

const IS_DEV = NODE_ENV == 'development';
const IS_PROD = NODE_ENV == 'production';

function setupDevtool() {

	if (IS_PROD) return false;
	if (IS_DEV) return 'eval';

}

module.exports = {
	mode: NODE_ENV ? NODE_ENV : 'development',
	resolve: {
		extensions: ['.jsx', '.js', '.json'],
		alias: {
			'react-dom': IS_DEV ? '@hot-loader/react-dom' : 'react-dom',
		}
	},

	entry: [
		path.resolve(__dirname, '../src/client/index.jsx'),
		'webpack-hot-middleware/client?path=http://localhost:3001/static/__webpack_hmr',
	],
	output: {
		path: path.resolve(__dirname, '../dist/client'),
		filename: 'client.js',
		publicPath: '/static/',
	},
	module: {
		rules: [
			{
				test: /\.[jt]sx?$/,
				use: ['ts-loader']
			},
			{
				test: /\.less$/,
				use: [
					'style-loader', {
						loader: 'css-loader',
						options: {
							modules: {
								mode: 'local',
								localIdentName: '[name]__[local]--[hash:base64:5]',
							},
						}
					},
					'less-loader',
				],
			}
		]
	},
	devtool: setupDevtool(),
	plugins: IS_DEV ? [
		new CleanWebpackPlugin(),
		new HotModuleReplacementPlugin(),
	] : [],
};