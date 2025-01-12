import { ArtWork } from '@/entities/artWork';
import { Episode } from '../types';

type SeasonLink = {
    id: number;
    isUploaded: boolean;
    season: number;
    name?: string;
};

export type Series = ArtWork & {
    episodes: Episode[];
    totalEpisodes: number;
    multipleSeasons: boolean;
    season?: number;
    otherSeasons?: SeasonLink[];
};
