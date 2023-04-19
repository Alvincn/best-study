import api from '@/api/index'
// 登录注册模块的仓库
const state = {
    userInfo:{},
    tasks:[]
};
const mutations = {
    GET_USERINFO(state,userInfo) {
        state.userInfo = userInfo
    },
    ALLTASK(state,tasks) {
        state.tasks = tasks
    }
};
const actions = {
    async getUser({commit}) {
        let result = await api.getUserInfo()
        if (result.code === 200) {
            commit("GET_USERINFO", result.data)
        }
    },
    async getAllTASK({commit}) {
        let result = await api.getAllTask()
        commit("ALLTASK",result.data)
    }
};
const getters = {};
// 文件模块

export default {
    state,
    mutations,
    actions,
    getters,
};
