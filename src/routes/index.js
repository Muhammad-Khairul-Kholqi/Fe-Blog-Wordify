import {
    createRouter,
    createWebHistory
} from "vue-router"
import LandingLayout from "../layouts/LandingLayout.vue"

import App from "../App.vue"

const routes = [{
    path: "/",
    component: LandingLayout,
    children: [{
            path: "",
            component: App
        },
    ]
}]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
