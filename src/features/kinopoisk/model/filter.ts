type filter = {
    name: string;
    title: string;
    type: 'radio' | 'checkbox';
    values: filterValue[];
};

type filterValue = {
    name: string;
    label?: string;
};

export const FILTERS: filter[] = [
    {
        name: 'genres.name',
        title: 'Жанры',
        type: 'checkbox',
        values: [
            { name: 'драма' },
            { name: 'аниме' },
            { name: 'боевик' },
            { name: 'фэнтези' },
            { name: 'короткометражка' },
            { name: 'триллер' },
            { name: 'приключения' },
            { name: 'мелодрама' },
            { name: 'мультфильм' },
            { name: 'cпорт' },
            { name: 'биография' },
            { name: 'семейный' },
            { name: 'мюзикл' },
            { name: 'ужасы' },
            { name: 'фантастика' },
            { name: 'криминал' },
            { name: 'детектив' },
        ],
    },
    {
        name: 'type',
        title: 'Тип',
        type: 'checkbox',
        values: [
            { name: 'movie', label: 'Фильм' },
            { name: 'tv-series', label: 'Сериал' },
            { name: 'cartoon', label: 'Мультфильм' },
            { name: 'animated-series', label: 'Мультсериал' },
            { name: 'anime', label: 'Аниме' },
        ],
    },
    {
        name: 'ageRating',
        title: 'Возрастное ограничение',
        type: 'checkbox',
        values: [
            { name: '0' },
            { name: '6' },
            { name: '12' },
            { name: '16' },
            { name: '18' },
        ],
    },
    {
        name: 'networks.items.name',
        title: 'Сервис',
        type: 'checkbox',
        values: [{ name: 'HBO' }, { name: 'Netflix' }, { name: 'Amazon' }],
    },
    {
        name: 'lists',
        title: 'Списки Кинопоиска',
        type: 'checkbox',
        values: [{ name: 'top250', label: 'Топ 250' }],
    },
];
