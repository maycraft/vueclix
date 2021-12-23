import { createStore } from 'vuex';
import { getGenres } from '@/api';
export default createStore({
    state: {
        genres: [],
    },
    getters: {
        genres: state => state.genres,
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
