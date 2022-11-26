module.exports = {
	//在打包项目时不再生成map文件
	productionSourceMap:false,
	// 关闭eslint
	lintOnSave: false,
	//代理跨域
	devServer: {
		proxy: {
			'/api': {//路径中有/api则启动跨域代理服务器
				target: 'http://gmall-h5-api',
				// pathRewrite: {'^/api': ''},39.98.123.211
			},
		},
	},
}
