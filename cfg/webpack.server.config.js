const path = require('path');
const nodeExternals = require('webpack-node-externals');
const NODE_ENV = process.env.NODE_ENV;

module.exports = {
	target: 'node',
	entry: path.resolve(__dirname, '../src/server/server.js'),
	mode: NODE_ENV ? NODE_ENV : 'development',
	output: {
		path: path.resolve(__dirname, '../dist/server'),
		filename: 'server.js'
	},
	resolve: {
		extensions: ['.jsx', '.js', '.json']
	},
	externals: [nodeExternals()],
	module: {
		rules: [
			{
				test: /\.[jt]sx?$/,
				use: ['ts-loader']
			}, {
				test: /\.less$/,
				use: [
					{
						loader: 'css-loader',
						options: {
							modules: {
								mode: 'local',
								localIdentName: '[name]__[local]--[hash:base64:5]',
							},
							onlyLocals: true,
						}
					},
					'less-loader',
				],
			}
		]
	},
	optimization: {
		minimize: false,
	}
};


