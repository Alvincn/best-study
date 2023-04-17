import Vue from 'vue';
import App from './App.vue';
// 引入vuex
import store from '@/store';
// 引入elementui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入axios
import Api from '@/api/index.js';
// 引入mockAjax
import mockAjax from "@/api/mockAjax";
// 提取elementUI message
Vue.prototype.$axios = Api;
Vue.prototype.$api = mockAjax
// 引入mockjs 进行数据模拟
import '@/mock/index'
// 引入路由
import router from './router';
Vue.config.productionTip = false;
Vue.use(ElementUI);
new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app');
