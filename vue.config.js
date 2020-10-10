const path = require('path');
const resolve = (dir) => {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: '/',
  
  chainWebpack: (config) => {
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/svg'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

  },
  devServer: {
    proxy: {
      '/test': {     //这里最好有一个 /
        target: 'http://localhost:55555',  // 后台接口域名
        ws: true,        //如果要代理 websockets，配置这个参数
        secure: false,  // 如果是https接口，需要配置这个参数
        changeOrigin: true,  //是否跨域
        pathRewrite: {
          '^/test': ''
        }
      }
    }
  }
};
