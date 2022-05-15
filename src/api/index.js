import axios from 'axios';
import store from '@/store';
import {
    API_PARAM_PAGE,
    API_URL_TOP_100_POPULAR_FILMS,
    API_URL_CATEGORY_FILMS,
    API_URL_STAFF,
    API_URL_SEARCH_FILMS,
    API_URL_PERSON
} from '../constants';

const KinoPoiskClient = axios.create({
    baseURL: 'https://kinopoiskapiunofficial.tech/api',
    timeout: 1500,
    headers: {
        'X-API-KEY': process.env.VUE_APP_KINOPOISK_API_KEY,
        'Content-Type': 'application/json',
    },
})

const YouTubeClient = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/'
})

async function getData(url) {
    store.dispatch('setLoading', true);
    store.dispatch('setError', null);
    try {
        const res = await KinoPoiskClient.get(url);
        if (res.status === 200) {
            return res.data;
        } else {
            console.log('errer');
            throw new Error(`Не удалось получить данные с ${url}`);
        }
    } catch (err) {
        console.log('error2', err.response);
        if (err.response) {
            return err.response.data;
        } else {
            store.dispatch('setError', err.message);
        }
    } finally {
        store.dispatch('setLoading', false);
    }
}

export const getNewMovies = async page => {
    return await getData(API_URL_TOP_100_POPULAR_FILMS + page);
    // return await getData(API_URL_FILMS_PRIMIERES + '2022' + API_PARAM_MONTH + getCurrentMonth());
};

const getStaffByMovieId = async id => {
    return await getData(API_URL_STAFF + id)
}

const getTrailerByMovieId = async id => {
    return await getData(`${API_URL_CATEGORY_FILMS}/${id}/videos`);
}

export const getMovieById = async id => {
    const data = [];
    const mainData = await getData(`${API_URL_CATEGORY_FILMS}/${id}`);
    const staff = await getStaffByMovieId(id);
    const trailers = await getTrailerByMovieId(id);
    data.push(mainData, staff, trailers)
    return data;
};

export const getVideosByName = async movieTitle => {
    try {
        const videosAll = await YouTubeClient.get(`search?part=snippet&q=Трейлер ${movieTitle}&type=video&key=${process.env.VUE_APP_YOUTUBE_API_KEY}`)
        return videosAll.data.items.map(item => ({
            videoId: item.id.videoId,
            title: item.snippet.title,
            thumbnailUrl: item.snippet.thumbnails.high.url
        }))
    } catch (err) {
        return [];
    }
}

export const getSearchMovies = async query => {
    return await getData(API_URL_SEARCH_FILMS + query + API_PARAM_PAGE + '1');
};

export const getActorById = async id => {
    return await getData(API_URL_PERSON + id);
};