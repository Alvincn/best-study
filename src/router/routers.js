// 暴露所有路由配置
export default [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('@/pages/Home'),
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/pages/Login'),
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/pages/Register'),
    },
]

