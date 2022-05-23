const API_VERSION_V1 = '/v1';
const API_VERSION_V21 = '/v2.1';
const API_VERSION_V22 = '/v2.2';

export const API_PARAM_PAGE = '&page=';
export const API_PARAM_FILM_ID = '?filmId=';
export const API_PARAM_YEAR = '?year=';
export const API_PARAM_MONTH = '&month=';
const API_PARAM_IMAGES = '/images';
export const API_PARAM_SHOT_IMAGES = API_PARAM_IMAGES + '?type=STILL';

const API_CATEGORY_FILMS = '/films';

export const API_URL_CATEGORY_FILMS = API_VERSION_V22 + API_CATEGORY_FILMS;

const API_TOP_FILMS = API_VERSION_V22 + API_CATEGORY_FILMS + '/top';

export const API_URL_TOP_250_BEST_FILMS =
    API_TOP_FILMS + '?type=TOP_250_BEST_FILMS' + API_PARAM_PAGE;

export const API_URL_TOP_100_POPULAR_FILMS =
    API_TOP_FILMS + '?type=TOP_100_POPULAR_FILMS' + API_PARAM_PAGE;

export const API_URL_TOP_AWAIT_FILMS = API_TOP_FILMS + '?type=TOP_AWAIT_FILMS' + API_PARAM_PAGE;

export const API_URL_SEARCH_FILMS =
    API_VERSION_V21 + API_CATEGORY_FILMS + '/search-by-keyword?keyword=';

export const API_URL_FILMS_PRIMIERES =
    API_VERSION_V22 + API_CATEGORY_FILMS + '/premieres' + API_PARAM_YEAR;

export const API_URL_REVIEWS_FILMS = API_VERSION_V1 + '/reviews' + API_PARAM_FILM_ID;

export const API_URL_STAFF = API_VERSION_V1 + '/staff' + API_PARAM_FILM_ID;

export const API_URL_PERSON = API_VERSION_V1 + '/staff/';