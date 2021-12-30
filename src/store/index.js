import { createStore } from 'vuex';
import { getGenres, getNewMovies } from '@/api';
import { getMovieById } from '../api';
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
        setMovies(state, movies) {
            state.movies = movies;
        },
        setPage(state, page) {
            state.page = page;
        },
        setTotalPages(state, total) {
            state.total = total;
        },
    },
    actions: {
        async getGenres({ commit }) {
            const genres = await getGenres();
            commit('setGenres', genres);
        },
        async getNewMovies({ commit }, currentPage) {
            const { total_pages, results } = await getNewMovies(currentPage);
            commit('setPage', currentPage);
            commit('setTotalPages', total_pages);
            commit('setMovies', results);
        },
        async changeNewMoviesPage({ commit, dispatch }, page) {
            commit('setPage', page);
            dispatch('getNewMovies', page);
        },
        async fetchMovieByID({ commit }, id) {
            try {
                const req = await getMovieById(id);

                const {
                    title,
                    release_date,
                    tagline,
                    poster_path,
                    genres,
                    homepage,
                    backdrop_path,
                    production_companies,
                    production_countries,
                    overview,
                    videos,
                    credits,
                } = req;
                const movie = {
                    id,
                    title,
                    release_date,
                    tagline,
                    poster_path,
                    genres,
                    homepage,
                    backdrop_path,
                    production_countries,
                    production_companies,
                    overview,
                    videos: videos.results,
                    cast: credits.cast.slice(0, 12),
                    crew: credits.crew,
                };
                commit('setMovie', movie);
            } catch (err) {
                commit('setError', err.message);
            }
        },
    },
    modules: {},
});
