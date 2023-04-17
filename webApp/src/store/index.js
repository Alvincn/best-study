import Vue from 'vue';
import vuex from 'vuex';
// 使用vuex
Vue.use(vuex);
// 导入user
import user from "./user";
// 创建vuex四大护法
/**
 * 使用vuex 的步骤
 * 1. 在actions中书写逻辑,可以进行异步请求
 * 2. 在需要保存的地方派发actions eg:this.$store.dispatch("action")
 * 3. 触发actions事件,事件触发,发送请求,获取结果,将结果提交mutations eg:commit("MUTATIONS",data)
 * 4. 在mutations中拿到数据,将state修改, eg:MUTATIONS(state, data){state.date = data}
 */
// 储存数据仓库
const state = {};
// 修改state的唯一手段
const mutations = {};
// 处理action,可以书写自己的业务逻辑
const actions = {};
// 相当于计算属性
const getters = {};
export default new vuex.Store({
  modules: {
    user
  }
});
