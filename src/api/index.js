import axios from 'axios';
import store from '@/store';
import {
    API_URL_MOVIE,
    API_CONSTANT,
    API_URL_GENRE,
    API_URL_NOW_PLAYING,
    API_URL_SEARCH,
    API_URL_UPCOMING,
    API_URL_AUTH,
    API_URL_RATING,
    API_KEY,
    API_URL_PERSON,
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
    const res = await axios.get(API_URL_AUTH);
    return res.data.guest_session_id;
};
export const postRating = async (movieID, rating, sessionID) => {
    const url = `${API_URL_RATING}/${movieID}/rating${API_KEY}&guest_session_id=${sessionID}`;
    try {
        const res = await axios.post(url, JSON.stringify({ value: parseInt(rating) }), {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            },
        });
        return res.data.success;
    } catch (err) {
        if (err.response) {
            console.error(err.response.data);
        } else {
            console.error(err.message);
        }
    }
};

export const getActorById = async id => {
    return await getData(`${API_URL_PERSON}/${id}${API_CONSTANT}&append_to_response=movie_credits`);
};
