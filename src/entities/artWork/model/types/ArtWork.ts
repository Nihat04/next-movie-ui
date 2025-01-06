import { ArtGenres } from "./ArtGenres";
import { ArtTypes } from "./ArtTypes";

export interface ArtWork {
    id: number;
    name: string;
    cover: string;
    year: number;
    genres: (ArtGenres | string)[];
    globalType: "Фильм" | "Сериал";
    type: ArtTypes | string;
    description?: string;
}
