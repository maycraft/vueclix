const months = [
    'JANUARY',
    'FEBRUARY',
    'MARCH',
    'APRIL',
    'MAY',
    'JUNE',
    'JULY',
    'SEPTEMBER',
    'OCTOBER',
    'NOVEMBER',
    'DECEMBER',
];

export const getCurrentMonth = () => {
    const date = new Date();
    return months[date.getMonth()];
};

export const getMovieGenres = genresArr => {
    const res = [];
    genresArr.forEach(item => {
        res.push(item.genre);
    });
    return res.join(', ');
};

export const mapCrewItem = (items, department) => {
    return items
        .filter(item => item.professionKey === department)
        .map(item => item.nameRu || item.nameEn)
        .join(', ');
};

export const getMovieCountries = countriesArr => {
    return countriesArr.map(item => item.country).join(', ');
};

export const getReleaseDate = str => (str ? str.split('-')[0] : '');

export const showGenres = genres => genres.map(genre => genre.name).join(', ');

export const mapItems = items => items.map(item => item.name).join(', ');

export const isNumeric = value =>
    !isNaN(value) && parseInt(value[0]) !== 0 ? parseInt(value) : null;

export const objectSort = property => (a, b) => b[property] - a[property];