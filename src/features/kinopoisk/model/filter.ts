import { ArtGenres } from '@/entities/artWork';

export interface filters {
    year: string;
    'releaseYears.start': number;
    'releaseYears.end': number;
    type: 'movie' | 'tv-series' | 'cartoon' | 'animated-series' | 'anime';
    isSeries: boolean;
    ageRating: '12' | '16' | '18';
    'genres.name': ArtGenres;
}
