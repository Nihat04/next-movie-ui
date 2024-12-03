import { ArtWork } from "../../artWork";

type SequelPart = {
    id: number;
    isUploaded: boolean
    name: string;
    path?: string;
}


export type Movie = ArtWork & {
    path: string;
    isSequel: boolean;
    moviesOfSeries?: SequelPart[]
};
