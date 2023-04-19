const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // 设置代理
    proxy: {
      // 那个请求带 /api ，哪个请求就使用代理服务器
      '/api': {
        // 转发到哪个服务器
        target: 'http://101.34.53.248:8080/',
      },
      '/node':{
        // 转发到哪个服务器
        target: 'http://127.0.0.1:3010',
      },
    },
    // 是否在浏览器中打开
    open: true,
    host: 'localhost',
    port: 8081,
  },
});
