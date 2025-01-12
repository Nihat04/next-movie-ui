import { ArtWork } from '@/entities/artWork';
import kinopoiskApi from '@/shared/api/instances/kinopoisk';
import { Table } from '@/shared/database';
import { KpMovieToArtWork } from '@/shared/DTO';

const table = new Table<ArtWork>('artworks');

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const id = Number((await params).id);

    if (!id) {
        return new Response(JSON.stringify({ error: 'id must be a number' }), {
            status: 400,
        });
    }

    try {
        let result;

        try {
            result = await table.getById(id);
        } catch (err) {
            result = KpMovieToArtWork(
                await (
                    await kinopoiskApi.get(`/movie/${id}`)
                ).data
            );

            if (err instanceof ReferenceError) {
                table.create(result);
            }
        }

        return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return new Response(error.message, { status: 500 });
        }
    }
}
