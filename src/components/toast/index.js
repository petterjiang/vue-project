import ToastVue from './Toast.vue'
const Toast = {
  install: function(Vue){
    Vue.component('Toast', ToastVue)
  }
}
// 导出组件
export default Toast
