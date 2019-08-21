

const home = {
	namespaced: true,
	state: {
		//loading是否显示
		pageLoading: true,
		showPage:'index',
		// isExitShow:false,//是否显示退出框
	},
	mutations: {
		'setPageLoading'(state, msg) {
			state.pageLoading = msg;
		},
		'setShowPage'(state,showPage){
			state.showPage = showPage;
		},
		// 'setisExitShow'(state,showPage){
		// 	state.isExitShow = showPage;
		// },
	},
	actions: {
		// setIsShowPH({ commit }, msg) {
		// 	commit('setIsShowPH', msg)
		// },
		// async checkislogin({dispatch,commit}){}
	}
}

export default home;