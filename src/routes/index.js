import {
    createRouter,
    createWebHistory
} from "vue-router"

import LandingLayout from "../layouts/LandingLayout.vue"
import AdminLayout from "../layouts/AdminLayout.vue"

import Home from "../views/Home.vue"
import Blog from "../views/Blog.vue"
import Login from "../views/private/Login.vue"
import Dashboard from "../views/private/admin/Dashboard.vue"

const routes = [{
        path: "/",
        component: LandingLayout,
        children: [{
                path: "",
                component: Home,
            },
            {
                path: "blog",
                component: Blog,
            },
        ],
    },
    {
        path: "/private/page/login",
        component: Login,
    },
    {
        path: "/private/page/admin",
        component: AdminLayout,
        children: [{
                path: "dashboard",
                component: Dashboard,
            },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
