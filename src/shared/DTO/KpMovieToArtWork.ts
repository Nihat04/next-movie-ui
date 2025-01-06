import { ArtTypes, ArtWork } from "@/entities/artWork";
import { KpMovie } from "@/features/kinopoisk";

export function KpMovieToArtWork(movie: KpMovie): ArtWork {
    return {
        id: movie.id,
        name: movie.name,
        cover: getCover(movie),
        globalType: movie.isSeries ? "Сериал" : "Фильм",
        type: getType(movie.type, movie.isSeries),
        genres: movie.genres.map((genre) => genre.name),
        year: movie.year,
        description: movie.description,
    };
}

function getType(type: string, isSeries: boolean) {
    switch (type) {
        case "anime":
            if (isSeries) return ArtTypes.animeSeries;
            return ArtTypes.animeMovie;
        case "tv-series":
            return ArtTypes.series;
        case "movie":
            return ArtTypes.movie;
        case "cartoon":
            if (isSeries) return ArtTypes.cartoonSeries;
            return ArtTypes.cartoonMovie;
        case "animated-series":
            return ArtTypes.cartoonSeries;
        default:
            throw new ReferenceError(`type of "${type}" not handled`);
    }
}

function getCover(movie: KpMovie) {
    if (movie.poster) {
        return movie.poster.url;
    }

    return "";
}
