import { createStore } from 'vuex';
import { getAwaitMovies, getTop100Movies, getSearchMovies } from '@/api';
// import { getSearchMovies, } from '@/api';
import { getMovieById, getActorById } from '../api';
export default createStore({
    state: {
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
        async getMovies({ commit }, payload) {
            const { category, page = 1, query = '' } = payload;
            let fetchMovies = '';
            commit('setMovies', null);
            switch (category) {
                case 'await':
                    fetchMovies = getAwaitMovies;
                    break;
                case 'top100':
                    fetchMovies = getTop100Movies;
                    break;
                case 'search':
                    fetchMovies = getSearchMovies;
                    break;
            }
            try {
                if (category === 'search') {
                    const { films } = await getSearchMovies(query);
                    commit('setMovies', films);
                } else {
                    // fetchMovies = require('@/data.json');
                    // const { pagesCount, films } = fetchMovies;
                    const { pagesCount, films } = await fetchMovies(page);
                    commit('setPage', page);
                    commit('setTotalPages', pagesCount);
                    commit('setMovies', films);
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
            const movieArr = await getMovieById(id);
            // console.log('data', movieArr);
            // const movieArr = require('@/movie-data.json');
            const {
                nameRu,
                nameOriginal,
                year,
                slogan,
                posterUrl,
                genres,
                coverUrl,
                countries,
                description,
                ratingKinopoisk,
            } = movieArr[0];
            const staff = { actors: [], crew: [] };
            movieArr[1].forEach(item => {
                if (item.professionKey.toLowerCase() === 'actor') {
                    staff.actors.push(item);
                } else {
                    staff.crew.push(item);
                }
            })
            const { items } = movieArr[2];
            const ownVideos = items
                .filter(item => item.site === 'YOUTUBE' && item.name.toLowerCase().includes('трейлер'))
                .map(item => ({
                    title: item.name,
                    videoId: item.url.split('v=')[1] || item.url.split('youtu.be/')[1]
                }))

            const movie = {
                id,
                title: nameRu,
                originalTitle: nameOriginal,
                year,
                slogan,
                posterUrl,
                genres,
                coverUrl,
                countries,
                description,
                actors: staff.actors.slice(0, 12),
                crew: staff.crew,
                rating: ratingKinopoisk,
                videos: ownVideos || []
            };
            commit('setMovie', movie);
        },
        setSearchQuery({ commit }, query) {
            commit('setSearchQuery', query);
        },
        async fetchActorByID({ commit }, id) {
            commit('setActor', null);
            const {
                nameRu,
                sex,
                facts,
                birthday,
                death,
                birthplace,
                posterUrl,
                films,
            } = await getActorById(id);
            const actor = {
                id,
                nameRu,
                sex,
                facts,
                birthday: new Date(birthday).toLocaleString('ru', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                }),
                death: death ?
                    new Date(death).toLocaleString('ru', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    }) : null,
                place: birthplace,
                poster: posterUrl,
                movies: films
                    .map(movie => ({
                        id: movie.filmId,
                        title: movie.nameRu,
                        originalTitle: movie.nameEn,
                        rating: movie.rating,
                        role: movie.description,
                    }))
            };
            commit('setActor', actor);
        },
    },
    modules: {},
});