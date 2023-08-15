module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    // devServer: {
    //     proxy: {
    //         '/api':{
    //             target:'http://localhost:9090',
    //             changeOrigin:true,
    //             pathRewrite:{
    //                 '^/api':''
    //             }
    //         }
    //     }
    // }
    // devServer: {
    //     proxy: {
    //         '/api': {
    //             target: 'http://localhost:8080',  // 需要转发到后端服务的服务地址----后端地址
    //             //ws:true,//启用webSocket
    //             changeOrigin: true,
    //             pathRewrite: {
    //                 '^/api': ''   // 将/api开头的路径替换为空
    //             }
    //         }
    //     }
    // },
    
}