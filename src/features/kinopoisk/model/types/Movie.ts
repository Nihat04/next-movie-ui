export type KpMovie = {
    id: number;
    name: string;
    enName: string;
    alternativeName: string;
    type: string;
    genres: { name: string }[];
    description: string;
    ageRating: number;
    countries: { name: string }[];
    backdrop?: { previewUrl: string; url: string };
    poster?: { previewUrl: string; url: string };
    isSeries: boolean;
    year: number;
    rating: {
        kp: number;
        imbd: number;
        tmdb: number;
        filmCritics: number;
        russianFilmCritics: number;
        await: number;
    };
};
