import { ArtWork } from "../../artWork";

export type Episode = {
    name?: string;
    number: number;
    path: string;
}

type SeasonLink = {
    id: number;
    isUploaded: boolean;
    season: number;
    name?: string;
}

export type Series = ArtWork & {
    episodes: Episode[]
    totalEpisodes: number;
    multipleSeasons: boolean;
    season?: number;
    otherSeasons?: SeasonLink[];
}