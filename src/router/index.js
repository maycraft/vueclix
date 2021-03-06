import { createRouter, createWebHistory } from 'vue-router';
import Movies from '@/views/Movies.vue';
import ItemDescription from '@/views/ItemDescription.vue';
import NotFound from '@/views/NotFound.vue';
import ActorDetails from '@/views/ActorDetails.vue';
const routes = [{
        path: '/',
        name: 'home',
        redirect: { path: '/movies/await', query: { page: 1 } },
    },
    {
        path: '/movies/:category',
        name: 'movies',
        component: Movies,
    },
    {
        path: '/movie/:id',
        name: 'movie',
        component: ItemDescription,
    },
    {
        path: '/actor/:id',
        name: 'actor',
        component: ActorDetails,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
    },
    // {
    //     path: '/popular',
    //     name: 'About',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    // },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;