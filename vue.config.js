const productConfig = require('./public/config.json') // 引入config.json文件
module.exports = {
    publicPath: '/',
    devServer: {
        host: '0.0.0.0',
        open: true,
        disableHostCheck: true,
        proxy: {
            //配置代理，解决跨域请求后台数据的问题
            '/api': {
                target: productConfig.baseUrl, //后台接口，连接本地服务
                ws: true, //是否跨域
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                }
            }
        }
    }
}