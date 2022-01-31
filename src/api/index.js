import axios from 'axios';
import store from '@/store';
import {
    API_URL_MOVIE,
    API_CONSTANT,
    API_URL_GENRE,
    API_URL_NOW_PLAYING,
    API_URL_SEARCH,
    API_URL_UPCOMING,
    API_URL_GENERATE_SESSION,
} from '../constants';

function handleError(err) {
    throw err;
}

async function getData(url) {
    store.dispatch('setLoading', true);
    store.dispatch('setError', null);
    try {
        const res = await axios.get(url);
        if (res.status === 200) {
            return res.data;
        } else {
            throw new Error(`Не удалось получить данные с ${url}`);
        }
    } catch (err) {
        handleError(err);
    } finally {
        store.dispatch('setLoading', false);
    }
}

export const getGenres = async () => {
    const res = await getData(API_URL_GENRE);
    return res.genres;
};
export const getNewMovies = async page => {
    return await getData(API_URL_NOW_PLAYING + page);
};
export const getUpcomingMovies = async page => {
    return await getData(API_URL_UPCOMING + page);
};
export const getMovieById = async id => {
    return await getData(`${API_URL_MOVIE}/${id}${API_CONSTANT}&append_to_response=videos,credits`);
};
export const getSearchMovies = async query => {
    return await getData(API_URL_SEARCH + query);
};

export const generateSessionID = async () => {
    const res = await axios.get(API_URL_GENERATE_SESSION);
    return res.data.guest_session_id;
};
