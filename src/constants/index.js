export const API_KEY = '?api_key=' + process.env.VUE_APP_MOVIEDB_API_KEY;

const API_URL = 'https://api.themoviedb.org/3';

const API_CATEGORY_MOVIE = '/movie';

const API_CATEGORY_GENRE = '/genre/movie/list';

const API_TYPE_AUTH = '/authentication/guest_session/new';

const API_TYPE_MOVIE = '/movie';

const API_TYPE_UPCOMING = '/upcoming';

const API_TYPE_SEARCH = '/search';

const API_TYPE_NOW_PLAYING = '/now_playing';

// const API_REGION_RU = '&language=ru&region=ru'
const API_REGION_RU = '&language=ru-RU&region=RU';

const API_PAGE_PARAM = '&page=';

const API_QUERY_PARAM = '&query=';

export const API_CONSTANT = API_KEY + API_REGION_RU;

export const API_URL_MOVIE = API_URL + API_TYPE_MOVIE;

export const API_URL_UPCOMING = API_URL_MOVIE + API_TYPE_UPCOMING + API_CONSTANT + API_PAGE_PARAM;

export const API_URL_NOW_PLAYING =
    API_URL_MOVIE + API_TYPE_NOW_PLAYING + API_CONSTANT + API_PAGE_PARAM;

export const API_URL_GENRE = API_URL + API_CATEGORY_GENRE + API_CONSTANT;

export const API_URL_AUTH = API_URL + API_TYPE_AUTH + API_KEY;

export const API_URL_SEARCH =
    API_URL + API_TYPE_SEARCH + API_CATEGORY_MOVIE + API_CONSTANT + API_QUERY_PARAM;

export const API_URL_RATING = API_URL + API_TYPE_MOVIE;

export const POSTER_URL_SM = 'https://image.tmdb.org/t/p/w300';

export const POSTER_URL_MD = 'https://image.tmdb.org/t/p/w500';

export const POSTER_URL_ORIGINAL = 'https://image.tmdb.org/t/p/original/';

export const YOUTUBE_URL = 'https://www.youtube.com/embed/';
