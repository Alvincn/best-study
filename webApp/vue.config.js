const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // 设置代理
    // proxy: {
    //   // 那个请求带 /api ，哪个请求就使用代理服务器
    //   '/api': {
    //     // 转发到哪个服务器
    //     target: 'http://127.0.0.1:8080',
    //   },
    // },
    // 是否在浏览器中打开
    open: true,
    host: 'localhost',
    port: 8081,
  },
});
