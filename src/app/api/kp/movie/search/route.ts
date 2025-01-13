import { kinopoiskInstance as kinopoiskApi } from '@/shared/api';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const page = searchParams.get('page');
    const pageLimit = searchParams.get('pageLimit');

    if (!query || !page || !pageLimit) {
        return new Response(
            JSON.stringify({ error: 'all parameters is required' }),
            { status: 400 }
        );
    }

    try {
        const response = await await kinopoiskApi.get(`/movie/search`, {
            params: { page, limit: pageLimit, query: query },
        });
        return new Response(JSON.stringify(response.data), { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return new Response(JSON.stringify({ error: error.message }), {
                status: 500,
            });
        }
    }
}
