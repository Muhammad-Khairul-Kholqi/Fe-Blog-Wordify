import {
    createRouter,
    createWebHistory
} from "vue-router"

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
            title: "Login"
        },
    },
    {
        path: "/private/page/admin",
        component: AdminLayout,
        children: [{
            path: "dashboard",
            component: Dashboard,
            meta: {
                title: "Dashboard"
            },
        }, ],
    },
]


const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.afterEach((to) => {
    const defaultTitle = "Wordify"
    document.title = to.meta.title ? `${to.meta.title} | Wordify` : defaultTitle
})

export default router
