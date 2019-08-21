import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home'
Vue.use(Vuex)
//store
const store = new Vuex.Store({
  modules:{
    home
  }
})

export default store;