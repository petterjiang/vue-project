import '@babel/polyfill'
import {flexibel} from "./utils/flexibel";
// import {app} from './utils/common'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import Toast from "./components/toast/index";
import './utils/constant'
import '@/assets/css/style.less'
import 'animate.css'

flexibel(750, 750);
Vue.config.productionTip = false
// 自定toast组件，不需要可删除
Vue.use(Toast);
// Vue.prototype.returnData = returnData
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
