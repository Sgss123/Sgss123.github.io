import { createRouter, createWebHistory } from "vue-router";

const routes = [{
    path: "/",
    name: "Index",
    component: () => import('~/pages/Index.vue')
},
{
    path: "/about",
    component: () => import('~/pages/AboutMe.vue')
},
{
    path: "/blog",
    component: () => import('~/pages/Blog.vue')
}, {
    path: "/post/:id",
    name:"blog",
    component: () => import('~/pages/ViewBlog.vue')
},
{
    path: '/:pathMatch(.*)*',
    component: () => import('~/pages/404.vue')
}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
