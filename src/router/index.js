import { createRouter, createWebHashHistory } from "vue-router";
import Root from "~/pages/Root.vue"
import Index from "~/pages/Index.vue"
import AboutMe from "~/pages/AboutMe.vue"
import NotFound from "~/pages/404.vue"

const routes = [{
    path: "/",
    component: Root,
    children: [
        {
            path: "",
            name: "Index",
            component: Index
        },
        {
            path: "about",
            name: "AboutMe",
            component: AboutMe
        }
    ]
},
{ path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
