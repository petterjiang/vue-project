// import HTTPREQUSET from './ajax'
// 接口列表模块，所有接口
import axios from './axios'
import qs from 'qs'
import {ADRESS} from './constant'
import {channel} from './common';
// Object.assign({},obj,{channelSource:channel})
// import {getSearch} from './common'
// 重新封装axios到ajax类
// Promise 建议使用 async，awite 简化代码
class Ajax {
  constructor(){  
    this.ajax = axios;
    // this.unact = localStorage.getItem('unact')||getSearch().unact;
  }  
  async get (url,sendData){
    // console.log(sendData)
    // let unact = this.unact;
    let sendMsg = sendData?Object.assign(sendData,{t:Date.now()}):{t:Date.now()};
    // let result = await this.ajax.get(url,sendData?{params:sendData}:'')
    let result = await this.ajax.get(url,sendMsg)
    console.log(`${url}的返回结果：${JSON.stringify(result.data)}`)
    return result.data
  }
  async post (url,sendData){
    let result = ''
    // let unact = this.unact;
    // console.log({unact})
    let sendMsg = sendData?Object.assign(sendData,{t:Date.now()}):{t:Date.now()};
    let data = qs.stringify(sendMsg);
    // console.log(data)
    result = await this.ajax.post(url, data)
    return result.data
  }
}
export const ajax = new Ajax();
// 请求图形验证码
export const GETPIC = async (data) => {
  let cha = channel()
  console.log(Object.assign({},data,{channelSource:cha}))
  return await ajax.get(`${ADRESS}/participant/getPic`,Object.assign({},data,{channelSource:cha}))
}

/*
登录请求验证码（匿名）接口 
传入参数-- 
channelSource=WX&mobile=18682118334&imgCode=0ZW3`
*/
export const SENDSMS = async (data) => {
  let cha = channel()
  
  console.log(Object.assign({},data,{channelSource:cha}))
  return await ajax.post(`${ADRESS}/participant/sendSms`,Object.assign({},data,{channelSource:cha}))
}

/*
登录接口 
传入参数-- 
String mobile 
String code
&mobile=18682118334&smsCode=353473
*/
export const LOGIN = async (data) => {
  let cha = channel()
  return await ajax.post(`${ADRESS}/participant/login`,Object.assign({},data,{channelSource:cha}))
}

//获取登录状态,进入首页调用的第一个接口，判断当前是否登录。并返回当前用户信息 后台根据cookie获取用户信息，并返回
export const ISLOGIN = async (data) => await ajax.post(`${ADRESS}/participant/isLogin`,data)

// 获取答题机会
export const CHANCE = async () => await ajax.post(`${ADRESS}/game/chance`)

/*
app跳转校验（匿名） 
传入参数-- 
String guid     同意用户id
String nickname   用户昵称
String timestamp  -时间戳
String sign  -签名
*/
// /answer/api/participant/appLogin?userKey=xxxxxxxx
// app登录
export const APPLOGIN = async (data) => await ajax.post(`${ADRESS}/participant/appLogin`,data)

