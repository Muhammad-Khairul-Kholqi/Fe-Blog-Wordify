import {
    createRouter,
    createWebHistory
} from "vue-router"
import AuthApi from "../api/authApi"

import LandingLayout from "../layouts/LandingLayout.vue"
import AdminLayout from "../layouts/AdminLayout.vue"

import Home from "../views/public/Home.vue"
import Blog from "../views/public/Blog.vue"
import DetailBlog from "../views/public/DetailBlog.vue"

import Login from "../views/private/Login.vue"
import Dashboard from "../views/private/admin/Dashboard.vue"

const routes = [{
        path: "/",
        component: LandingLayout,
        children: [{
                path: "",
                component: Home,
                meta: {
                    title: "Home"
                },
            },
            {
                path: "blog",
                component: Blog,
                meta: {
                    title: "Blog"
                },
            },
            {
                path: "blog/detail",
                component: DetailBlog,
                meta: {
                    title: "Detail Blog"
                },
            },
        ],
    },
    {
        path: "/private/page/login",
        component: Login,
        meta: {
            title: "Login",
            guest: true 
        },
    },
    {
        path: "/private/page/admin",
        component: AdminLayout,
        meta: {
            requiresAuth: true 
        },
        children: [{
            path: "dashboard",
            component: Dashboard,
            meta: {
                title: "Dashboard",
                requiresAuth: true
            },
        }, ],
    },
    {
        path: "/private/page/admin/",
        redirect: "/private/page/admin/dashboard"
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = AuthApi.isAuthenticated()

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isAuthenticated) {
            next({
                path: '/private/page/login',
                query: {
                    redirect: to.fullPath
                } 
            })
            return
        }
    }

    if (to.matched.some(record => record.meta.guest)) {
        if (isAuthenticated) {
            next('/private/page/admin/dashboard')
            return
        }
    }

    next()
})

router.afterEach((to) => {
    const defaultTitle = "Wordify"
    document.title = to.meta.title ? `${to.meta.title} | Wordify` : defaultTitle
})

export default router