import store from '@/store';

export const getReleaseDate = str => (str ? str.split('-')[0] : '');

export const getMovieGenres = genreIds => {
    const res = [];
    store.getters.genres.forEach(genre => {
        for (let i = 0; i < genreIds.length; i++) {
            if (genre.id === genreIds[i]) res.push(genre.name);
        }
    });
    return res.join(', ');
};

export const showGenres = genres => genres.map(genre => genre.name).join(', ');

export const mapItems = items => items.map(item => item.name).join(', ');

export const mapCrewItem = (items, department) => {
    return items
        .filter(item => item.department.includes(department))
        .map(item => item.name)
        .join(', ');
};

export const isNumeric = value =>
    !isNaN(value) && parseInt(value[0]) !== 0 ? parseInt(value) : null;

export const objectSort = property => (a, b) => b[property] - a[property];
