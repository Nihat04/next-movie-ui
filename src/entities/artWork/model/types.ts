export enum ArtTypes {
    series = "Сериал",
    movie = "Фильм",
    animeSeries = "Аниме",
    animeMovie = "Аниме фильм",
    cartoonSeries = "Мультсериал",
    cartoonMovie = "Мальтфильм",
}

export enum ArtGenres {
    drama = "драма",
    horror = "хоррор",
    comedy = "комедия",
    adventure = "приключение",
    medieval = "средневековье",
    romantic = "романтика",
    scifi = "научная фантастика",
    documentary = "документальный",
    action = "экшен",
    fantasy = "фэнтези",
    games = "игры",
}

export interface ArtWork {
    id: number;
    name: string;
    cover: string;
    year: number;
    genres: ArtGenres[] | string;
    globalType: "Фильм" | "Сериал";
    type: ArtTypes;
}
