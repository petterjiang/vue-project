
// 公共常量设定，输出项目公共常量

let configConstant = {
  ip: '',
  interfacePath: '/zs-answer-backend/api',  //接口地址
  sharelink: ''
}
let consloeText = '';
// https://hms-uat.test-cignacmb.com/hms-act/thirdShare/index.html?shareId=xxx
// 这个地址是用于分享出去的
if (process.env.VUE_APP_TYPE === 'production') {
  consloeText = `==============生产环境代码===============`;

}
if (process.env.VUE_APP_TYPE === 'development') {
  consloeText = `==============开发环境代码===============`;
  
}
if (process.env.VUE_APP_TYPE === 'uat') {
  consloeText = `==============测试环境代码===============`;
  //为测试环境植入eruda代码调试工具
  let eruda = require('eruda');
  let el = document.createElement('div');
  document.body.appendChild(el);
  eruda.init();
}
console.log(consloeText)
export const configConstantAll = configConstant;
export const ADRESS = configConstant.interfacePath;
export const SHARETITLE = '健康知识大挑战'
export const SHAREDES = '答题赢大奖，美好生活天天学！来完美人生向我挑战吧！'
export const SHARELINK = configConstant.sharelink