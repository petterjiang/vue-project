const toast = {
  namespaced: true,
	state:{
		show: false,
    content: '这是一个提示'
	},
	mutations:{
		'setToast' (state,payload){
			state.show = payload.show,
			state.content = payload.content || ''
		}
	},
	actions:{
		//传参数dispatch mutations.SETNAME
    setToast ({commit},obj){
      commit('setToast',obj)
    }
	}
}

export default toast;