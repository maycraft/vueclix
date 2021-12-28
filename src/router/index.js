import { createRouter, createWebHistory } from 'vue-router';
import Movies from '@/views/Movies.vue';

const routes = [
    {
        path: '/',
        redirect: { name: 'now-playing', query: { page: 1 } },
    },
    {
        path: '/now_playing',
        name: 'now-playing',
        component: Movies,
    },
    {
        path: '/popular',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
