import axios from 'axios';
import store from '@/store';
import {
    API_PARAM_PAGE,
    API_URL_TOP_AWAIT_FILMS,
    API_URL_TOP_100_POPULAR_FILMS,
    API_URL_CATEGORY_FILMS,
    API_URL_STAFF,
    API_URL_SEARCH_FILMS,
    API_URL_PERSON,
    API_PARAM_SHOT_IMAGES
} from '../constants';

const KinoPoiskClient = axios.create({
    baseURL: 'https://kinopoiskapiunofficial.tech/api',
    timeout: 1500,
    headers: {
        'X-API-KEY': 'd88e3828-0227-47ab-98b1-22311eec5864',
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
            if (err.response.data.error) {
                const data = err.response.data;
                store.dispatch('setError', { 'text': data.error, 'status': data.status })
            } else {
                return err.response.data;
            }
        } else {
            store.dispatch('setError', err.message);
        }
    } finally {
        store.dispatch('setLoading', false);
    }
}

export const getAwaitMovies = async page => {
    return await getData(API_URL_TOP_AWAIT_FILMS + page);
    // return await getData(API_URL_FILMS_PRIMIERES + '2022' + API_PARAM_MONTH + getCurrentMonth());
};

export const getTop100Movies = async page => {
    return await getData(API_URL_TOP_100_POPULAR_FILMS + page);
}

const getStaffByMovieId = async id => {
    return await getData(API_URL_STAFF + id)
}

const getTrailerByMovieId = async id => {
    return await getData(`${API_URL_CATEGORY_FILMS}/${id}/videos`);
}

const getShotImagesByMovieId = async id => {
    return await getData(`${API_URL_CATEGORY_FILMS}/${id}${API_PARAM_SHOT_IMAGES}${API_PARAM_PAGE}1`);
}

export const getMovieById = async id => {
    const data = [];
    const mainData = await getData(`${API_URL_CATEGORY_FILMS}/${id}`);
    const staff = await getStaffByMovieId(id);
    const raw = await getTrailerByMovieId(id);
    const trailers = raw.items.filter(item => item.site === 'YOUTUBE' && item.name.toLowerCase().includes('трейлер'))
        .map(item => ({
            title: item.name,
            videoId: item.url.slice(item.url.length - 11)
        }))
    const shots = await getShotImagesByMovieId(id);
    data.push(mainData, staff, trailers, shots);
    return data;
};

export const getVideosFromYoutube = async(movieTitle, releaseYear) => {
    try {
        const videosAll = await YouTubeClient.get(`search?part=snippet&q=Трейлер ${movieTitle} ${releaseYear}&type=video&videoDuration=short&maxResults=1&key=AIzaSyAQdRphaSUuFoKjC7O_UF4IK5d1pcEw5QU`)
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