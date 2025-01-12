import { ArtWork } from '@/entities/artWork';
import { SequelPart } from './SequelPart';

export type Movie = ArtWork & {
    path: string;
    isSequel: boolean;
    moviesOfSeries?: SequelPart[];
};
