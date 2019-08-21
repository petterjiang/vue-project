import axios from 'axios'

// 全局的 axios 默认值
// axios.defaults.baseURL = '/';
// axios.defaults.headers.common['Authorization'] = 'eyJhbGciOiJIUzI1NiIsImNhbGciOiJERUYifQ.eNpMjcsKwyAQRf9l1i7U-mjyM2HUEWzFFB8QKP33GppFl-fAPfcNbThYQQCD0ahuKVxU9rLR8UqVpomYGzGYDKvQituFW20ZJOyXuN_0Kaigy-ei10G_SN7986_x6Gk-aBNJYUATpVNWisVz6WI0wRvNrVDw-QIAAP__.uh1fCD4V_FCgUeJLGibgGVie6XgjAqgR6O9FgdbW9cg';
// axios.defaults.headers.common['Access-Control-Allow-Origin']='*'
// axios.headers={}
//请求携带cookie
axios.defaults.withCredentials = true;
axios.defaults.headers = {
  // 'Accept': 'application/json,application/x-www-form-urlencoded, text/plain, */*',
  'Content-Type': 'application/x-www-form-urlencoded',
  // 'X-Requested-With': 'XMLHttpRequest'
  // "content-type": "text/plain;charset=UTF-8"
}

// 在请求或响应被 then 或 catch 处理前拦截它们。
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (localStorage.JWT_TOKEN) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
    config.headers.Authorization = `token ${localStorage.JWT_TOKEN}`;
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});


// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  console.log('axios拦截响应请求出错！');
  // alert('网络异常，请重试！')
  return Promise.reject(error);
});


export default axios;


// 如果你想在稍后移除拦截器，可以这样：
// var myInterceptor = axios.interceptors.request.use(function () {/*...*/});
// axios.interceptors.request.eject(myInterceptor);
// 可以为自定义 axios 实例添加拦截器

// var instance = axios.create();
// instance.interceptors.request.use(function () {/*...*/});