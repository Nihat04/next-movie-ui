import { kinopoiskInstance as kinopoiskApi } from '@/shared/api';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');
    const pageLimit = searchParams.get('pageLimit');

    if (!page || !pageLimit) {
        return new Response(
            JSON.stringify({ error: 'all parameters is required' }),
            { status: 400 }
        );
    }

    const params: Record<string, string | null> = {
        page,
        limit: pageLimit,
    };

    searchParams.forEach((value, key) => {
        if (key !== 'page' && key !== 'pageLimit') {
            params[key] = value;
        }
    });

    try {
        const response = await kinopoiskApi.get(`/movie`, {
            params,
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
