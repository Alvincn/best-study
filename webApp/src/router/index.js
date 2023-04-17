// 引入Vue
import Vue from 'vue';
// 引入VueRouter
import VueRouter from 'vue-router';
// 使用VueRouter
Vue.use(VueRouter);
//引入路由配置文件
import routes from "@/router/routers";

let router = new VueRouter({
    routes,
    scrollBehavior(from, to, next) {
        return {y: 0}
    }
});
// 前置路由守卫，将会判断的需要校验的页面是否已登录，如果未登录，则跳转到登录界面
router.beforeEach((to,from,next)=>{
    next()
})

export default router
