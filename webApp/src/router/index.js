// 引入Vue
import Vue from 'vue';
// 引入VueRouter
import VueRouter from 'vue-router';
// 使用VueRouter
Vue.use(VueRouter);
//引入路由配置文件
import routes from "@/router/routers";
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
// 对路由的push方法进行重写
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(
            this,
            location,
            () => {
            },
            () => {
            }
        );
    }
};
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(
            this,
            location,
            () => {
            },
            () => {
            }
        );
    }
};
let router = new VueRouter({
    routes,
    scrollBehavior(from, to, next) {
        return {y: 0}
    }
});
// 前置路由守卫，将会判断的需要校验的页面是否已登录，如果未登录，则跳转到登录界面
router.beforeEach((to, from, next) => {
    next()
})

export default router
