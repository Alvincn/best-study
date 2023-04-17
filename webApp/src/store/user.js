import * as api from '@/api/index'
api = api.default
// 登录注册模块的仓库
const state = {
    token: window.localStorage.getItem('session') || '',
    userInfo: {},
};
const mutations = {
    GETUSRE(state, userInfo) {
        state.userInfo = userInfo
    }
};
const actions = {
    async getUser({ commit }, session) {
        let result = await api.getUser(session)
        commit("GETUSRE",result)
    },
};
const getters = {};
// 文件模块

export default {
    state,
    mutations,
    actions,
    getters,
};
