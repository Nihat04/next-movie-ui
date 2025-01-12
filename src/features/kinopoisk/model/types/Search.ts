import { KpMovie } from './Movie';

export type Search = {
    docs: KpMovie[];
    limit: number;
    page: number;
    pages: number;
    total: number;
};
