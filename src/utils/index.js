export const getReleaseDate = str => (str ? str.split('-')[0] : '');

export const showGenres = genres => genres.map(genre => genre.name).join(', ');

export const mapItems = items => items.map(item => item.name).join(', ');

export const mapCrewItem = (items, department) => {
    return items
        .filter(item => item.department.includes(department))
        .map(item => item.name)
        .join(', ');
};
