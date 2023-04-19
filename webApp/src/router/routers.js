// 暴露所有路由配置
export default [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        name: 'Home',
        redirect: '/todo',
        component: () => import('@/pages/Home'),
        children: [
            {
                path: '/todo',
                component: () => import('@/pages/Todo'),
            },
            {
                path: '/studyhome',
                component: () => import('@/pages/studyHome'),
            },
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/pages/Login'),
    }

]

