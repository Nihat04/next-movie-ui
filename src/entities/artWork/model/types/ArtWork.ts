import { ArtTypes } from './ArtTypes';

export interface ArtWork {
    id: number;
    name: string;
    cover: string;
    year: number;
    genres: string[];
    globalType: 'Фильм' | 'Сериал';
    type: ArtTypes | string;
    description?: string;
    kpRating: number;
    knRating: number;
}
