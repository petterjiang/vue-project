// 公共方法模块
// import {SIGNATURE} from './Interface'
// import {SHARETITLE,SHAREDES} from './constant'
import share from '../assets/images/share1.png'
export const GetRandomNum =(Min,Max)=>{   
  var Range = Max - Min;   
  var Rand = Math.random();   
  return(Min + Math.round(Rand * Range));   
}

//判断是否微信浏览器
export function isWeiChart() {
  const ua = navigator.userAgent.toLowerCase();
  let isWeiChart = null;
  if (ua.indexOf('micromessenger') > -1) {
      isWeiChart = true;
  } else {
      isWeiChart = false;
  }
  // console.log(isWeiChart)
  return isWeiChart;
}
//数组随机重新排序
export const shuffle = (arr) =>{
  var len = arr.length;
  for(var i = 0; i < len - 1; i++){
    var idx = Math.floor(Math.random() * (len - i));
    var temp = arr[idx];
    arr[idx] = arr[len - i - 1];
    arr[len - i -1] = temp;
  }
  return arr;
}

export const back_common = () => { 
  history.pushState(null, null, document.URL);
}
//禁用浏览器返回
export const fobidden_back = (callback) => {
  //防止页面后退
  history.pushState(null, null, document.URL);
  window.addEventListener('popstate',back_common)
  callback&&window.addEventListener('popstate',callback)
}
//启用浏览器返回
export const enable_back = (callback) => {
  window.removeEventListener('popstate',back_common)
  callback&&window.removeEventListener('popstate',callback)
  history.go(-1);
}
// 写入cookie
export const setCookie = (cname,cvalue,exdays) =>{
  //过期时间exdays天
  var d = new Date();
  d.setTime(d.getTime()+(exdays*24*60*60*1000));
  var expires = "expires="+d.toGMTString();
  document.cookie = cname+"="+cvalue+"; "+expires;
}
// 获取cookie
export const getCookie = (cname) => {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) {
      var c = ca[i].trim();
      if (c.indexOf(name)==0) { return c.substring(name.length,c.length); }
  }
  return "";
}

  // 提取问号后面不包括#参数封装成对象
export const getSearch = (obj)=> {
    const url = obj || location.href;
    const search = url.split('?');
    let arrO;
    if (search[1] && search[1].indexOf('#') > -1) {
        arrO = search[1].substring(0, search[1].indexOf('#')).split('&')
    } else {
        arrO = search[1] ? search[1].split('&') : false
    }
    let params = {}
    // if(arrO.indexOf('#')){
    //   arrO = arrO.split('#')[0];
    // }
    if (arrO) {
        arrO.forEach(val => {
            let temp = val.split('=')
            params[temp[0]] = temp[1]
        })
    }
    // console.log(params)
    return params
}
export const initShare = (successCallback)=> {
  // 定义微信分享图文，需要接口和title，dec常量
  if (isWeiChart()) {
    var getUrl = location.href.split("#")[0];
    var imgurl = getUrl;
    if (getUrl.indexOf("index.html") > -1) {
      imgurl = getUrl.split("index.html")[0];
    }
    if (imgurl.indexOf("?") > -1) {
      imgurl = getUrl.split("?")[0];
    }
    console.log(getUrl);
    let data = { url: getUrl };
    SIGNATURE(data).then(res => {
      if(res.code==1){
        wx.config({
          debug: false, // 开启调试模式
          appId: res.data.appid, // 必填，公众号的唯一标识
          timestamp: res.data.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.data.noncestr, // 必填，生成签名的随机串
          signature: res.data.signature, // 必填，签名，见附录1
          jsApiList: [
            "onMenuShareAppMessage", // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
            "onMenuShareTimeline" // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
          ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        if (imgurl.indexOf("index.html") > -1) {
          imgurl = imgurl.split("index.html")[0];
        }
        console.log(imgurl);
        wx.ready(() => {
          // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
          // 如果需要定制ready回调方法
          // this.setShare(this.userMsg.userid)
          wx.onMenuShareAppMessage({
            title: SHARETITLE, // 分享标题
            desc: SHAREDES, // 分享描述
            link: location.href.split("#")[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: imgurl+share, // 自定义图标
            type: "link", // 分享类型,music、video或link，不填默认为link
            dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
            success: function() {
              // 用户确认分享后执行的回调函数
              // console.log(that)
              // alert(that)
              successCallback()
            },
            cancel: function() {
              // 用户取消分享后执行的回调函数
            }
          });
          wx.onMenuShareTimeline({
            title: SHARETITLE, // 分享标题
            link: location.href.split("#")[0],
            imgUrl: imgurl+share,
            //imgurl + "share/share.png", // 自定义图标
          
            success: function() {
              // alert(that)
              // 分享成功调用接口增加分享次数
              successCallback()
              //some thing you should do
            },
            cancel: function() {
              //alert('shared cancle');
            }
          });
        });
      }
    })
  }
}


export const app = ()=>{
  'use strict';
  var App = new Object();
App.IS_DEBUG = false;
var ua = navigator.userAgent.toUpperCase();
App.IS_ANDROID = ua.indexOf("ANDROID") != -1;
App.IS_IOS = ua.indexOf("MAC OS") != -1;
App.IS_NATIVE = App.IS_ANDROID || App.IS_IOS ? true : false;

var callindex = 0,
  toString = Object.prototype.toString;

function createRandomNum(num) {
  var arr = [];
  for (var i = 0; i < num; i++) {
  arr.push(~~(Math.random() * 10));
  }
  return arr.join("");
}

App.callNative = function(name, opt, cb) {

  if (toString.call(opt) == "[object Function]") {
    var cb = opt;
    var opt = "";
  }
  var randomNum = createRandomNum(5);
  if (toString.call(cb) == "[object Function]") {
    var cbname = "_NATIVE_CB_" + name + randomNum;
    window[cbname] = function(data) {
    if (typeof data == "string") {
      data = JSON.parse(data);
    }
    
    cb(data);
    window[cbname] = null;
    };
  } else {
    var cbname = "_NATIVE_CB_" + name + randomNum;
    window[cbname] = function(data) {
    window[cbname] = null;
    };
  }
  try {
    if (App.IS_ANDROID) {
    if (opt) {
      window.AndroidJSInterface[name](JSON.stringify(opt), cbname);
    } else {
      window.AndroidJSInterface[name](cbname);
    }
    } else if (App.IS_IOS) {
    if (!opt) {
      opt = {
      callBackName: cbname
      };
    } else if (toString.call(opt) === "[object Object]") {
      opt.callBackName = cbname;
    }
    window.webkit.messageHandlers[name].postMessage(opt);
    }
  } catch (e) {
    if(name == "getSystemPath"){
    cb("not app");
    }
    console.log(e);
  }
};
App['getUserKey'] = function(callback) {
  App.callNative('getUserKey', callback);
}
  return App;
}