import { createStore } from 'vuex';
import { getGenres, getNewMovies, getSearchMovies, getUpcomingMovies } from '@/api';
import { getMovieById, getActorById } from '../api';
import { objectSort } from '@/utils';
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
        actor: null,
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
        actor: state => state.actor,
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
        setActor(state, actorObj) {
            state.actor = actorObj;
        },
    },
    actions: {
        setError({ commit }, errMsg) {
            commit('setError', errMsg);
        },
        setLoading({ commit }, isLoaded) {
            commit('setLoading', isLoaded);
        },
        async getGenres({ commit }) {
            try {
                const genres = await getGenres();
                commit('setGenres', genres);
            } catch (err) {
                commit('setError', err.message);
            }
        },
        async getMovies({ commit }, payload) {
            const { category, page = 1, query = '' } = payload;
            let fetchMovies = '';
            commit('setMovies', null);
            switch (category) {
                case 'now_playing':
                    fetchMovies = getNewMovies;
                    break;
                case 'upcoming':
                    fetchMovies = getUpcomingMovies;
                    break;
                case 'search':
                    fetchMovies = getSearchMovies;
                    break;
            }
            try {
                if (category === 'search') {
                    const { results } = await getSearchMovies(query);
                    commit('setMovies', results);
                } else {
                    const { total_pages, results } = await fetchMovies(page);
                    commit('setPage', page);
                    commit('setTotalPages', total_pages);
                    commit('setMovies', results);
                }
            } catch (err) {
                if (err.message === 'fetchMovies is not a function') {
                    commit('setError', 'Не верный url-адрес');
                } else {
                    commit('setError', err.message);
                }
            }
        },
        async changeMoviesPage({ commit, dispatch }, payload) {
            commit('setPage', payload.page);
            dispatch('getMovies', payload);
        },
        async fetchMovieByID({ commit }, id) {
            commit('setMovie', null);
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
                vote_average,
            } = await getMovieById(id);
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
                videos: videos.results.reverse(),
                cast: credits.cast.slice(0, 12),
                crew: credits.crew,
                rating: vote_average,
            };
            commit('setMovie', movie);
        },
        setSearchQuery({ commit }, query) {
            commit('setSearchQuery', query);
        },
        async fetchActorByID({ commit }, id) {
            commit('setActor', null);
            const {
                name,
                biography,
                birthday,
                deathday,
                place_of_birth,
                profile_path,
                movie_credits,
            } = await getActorById(id);
            const actor = {
                id,
                name,
                biography: biography && biography.split('\n\n'),
                birthday: new Date(birthday).toLocaleString('ru', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                }),
                deathday: deathday
                    ? new Date(deathday).toLocaleString('ru', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                      })
                    : null,
                place: place_of_birth,
                poster: profile_path,
                movies: movie_credits.cast
                    .map(movie => ({
                        id: movie.id,
                        title: movie.title,
                        released: new Date(movie.release_date).getFullYear(),
                    }))
                    .filter(movie => movie.released)
                    .sort(objectSort('released')),
            };
            commit('setActor', actor);
        },
    },
    modules: {},
});
