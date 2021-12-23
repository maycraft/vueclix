import { createStore } from 'vuex';
import { getGenres } from '@/api';
export default createStore({
    state: {
        genres: [],
        page: 1,
        total: 1,
        movies: [],
    },
    getters: {
        genres: state => state.genres,
        movies: state => state.movies,
        currentPage: state => state.page,
        totalPages: state => state.total,
    },
    mutations: {
        setGenres(state, genres) {
            state.genres = genres;
        },
    },
    actions: {
        async getGenres({ commit }) {
            const genres = await getGenres();
            commit('setGenres', genres);
        },
    },
    modules: {},
});
