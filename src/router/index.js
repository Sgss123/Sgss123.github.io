import { createRouter, createWebHistory } from "vue-router";

const routes = [{
    path: "/",
    name: "Index",
    component: () => import('~/pages/Index.vue')
},
{
    path: "/about",
    name: "About",
    component: () => import('~/pages/AboutMe.vue')
},
{
    path: "/blog",
    name: "List",
    component: () => import('~/pages/Blog.vue')
}, {
    path: "/post/:id",
    name: "Blog",
    component: () => import('~/pages/ViewBlog.vue')
}, {
    path: "/css",
    name: "Css",
    component: () => import('~/pages/CssView.vue')
}, 
{
    path: "/css/:id",
    name: "CssView",
    component: () => import('~/pages/ViewCSS.vue')
}, {
    path: "/playground",
    name: "Editor",
    component: () => import('~/components/Editor.vue')
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
