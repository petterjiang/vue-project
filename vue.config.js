// const webpack = require('webpack')
module.exports = {
  // 选项...
  publicPath: "./",
  productionSourceMap:false,
  //配置代理
  devServer: {
    proxy: {
      '/zs-answer-backend': {
        target: 'https://pro.alwutech.com',
        // ws: true,
        changeOrigin: true
      }
      // ,
      // '/foo': {
      //   target: '<other_url>'
      // }
    }
  },
  configureWebpack: config => {
    if (process.env.VUE_APP_TYPE === 'production') {
      // 为生产环境修改配置...生产环境去掉所有console
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    } else {
      
    }
  },
  //将audio 的src属性当作模块引入，详见API https://cli.vuejs.org/zh/guide/webpack.html#%E9%93%BE%E5%BC%8F%E6%93%8D%E4%BD%9C-%E9%AB%98%E7%BA%A7
 
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.transformAssetUrls = {
          audio: 'src',
        }
        return options;
      });
  }
};
