import { serverInstance as serverApi } from '@/shared/api';
import { KpMovieToArtWork } from '@/shared/DTO';
import { ArtWork } from '@/entities/artWork';

export class Kinopoisk {
    static async find(name: string, page: number, pageLimit: number = 30) {
        const response = await serverApi.get(`/kp/movie`, {
            params: { page, pageLimit, query: name },
        });

        return response.data;
    }

    static async getById(id: number): Promise<ArtWork> {
        const response = await serverApi.get(`/kp/movie/${id}`);

        return KpMovieToArtWork(response.data);
    }
}
