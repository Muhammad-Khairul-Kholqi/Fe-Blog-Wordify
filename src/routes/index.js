import {
    createRouter,
    createWebHistory
} from "vue-router"

import LandingLayout from "../layouts/LandingLayout.vue"
import Home from "../views/Home.vue"
import Blog from "../views/Blog.vue"
import Login from "../views/Login.vue"

const routes = [{
        path: "/",
        component: LandingLayout,
        children: [{
                path: "",
                component: Home
            },
            {
                path: "blog",
                component: Blog
            }
        ]
    },
    {
        path: "/login",
        component: Login
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
