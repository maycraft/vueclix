import axios from 'axios';
import {
    API_URL_MOVIE,
    API_CONSTANT,
    API_URL_GENRE,
    API_URL_NOW_PLAYING,
    API_URL_SEARCH,
} from '../constants';

function handleError(err) {
    throw err;
}

async function getData(url) {
    try {
        const res = await axios.get(url);
        if (res.status === 200) {
            return res.data;
        } else {
            throw new Error(`Не удалось получить данные с ${url}`);
        }
    } catch (err) {
        handleError(err);
    }
}

export const getNewMovies = page => {
    return getData(API_URL_NOW_PLAYING + page);
};
export const getGenres = async () => {
    const res = await getData(API_URL_GENRE);
    return res.genres;
};
export const getMovieById = async id => {
    return await getData(`${API_URL_MOVIE}/${id}${API_CONSTANT}&append_to_response=videos,credits`);
};
export const getSearchMovies = async query => {
    return await getData(API_URL_SEARCH + query);
};

// getUpcomingMovies(page) {}
