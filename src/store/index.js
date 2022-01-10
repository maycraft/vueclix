import { createStore } from 'vuex';
import { getGenres, getNewMovies, getSearchMovies } from '@/api';
import { getMovieById } from '../api';
export default createStore({
    state: {
        genres: [],
        page: 1,
        total: 1,
        movies: [],
        loading: false,
        movie: null,
        error: null,
        searchQuery: '',
    },
    getters: {
        genres: state => state.genres,
        movies: state => state.movies,
        currentPage: state => state.page,
        totalPages: state => state.total,
        movie: state => state.movie,
        loading: state => state.loading,
        error: state => state.error,
        searchQuery: state => state.searchQuery,
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
        setMovie(state, movieObj) {
            state.movie = movieObj;
        },
        setLoading(state, isLoaded) {
            state.loading = isLoaded;
        },
        setError(state, error) {
            state.error = error;
        },
        setSearchQuery(state, query) {
            state.searchQuery = query;
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
            commit('setLoading', true);
            commit('setMovie', null);
            commit('setError', null);
            try {
                const req = await getMovieById(id);
                const {
                    title,
                    original_title,
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
                    original_title,
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
                commit('setLoading', false);
                commit('setMovie', movie);
            } catch (err) {
                commit('setLoading', false);
                commit('setError', err.message);
            }
        },
        async getQueryMovies({ commit }, query) {
            commit('setLoading', true);
            commit('setMovies', null);
            try {
                const { results } = await getSearchMovies(query);
                commit('setLoading', false);
                commit('setMovies', results);
            } catch (err) {
                commit('setLoading', false);
                commit('setError', err.message);
            }
        },
        setSearchQuery({ commit }, query) {
            commit('setSearchQuery', query);
        },
    },
    modules: {},
});
