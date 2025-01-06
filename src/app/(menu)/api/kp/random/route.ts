import kinopoiskApi from "@/shared/api/instances/kinopoisk";

export async function GET() {
    try {
        const response = await await kinopoiskApi.get(`/movie/random`);
        return new Response(JSON.stringify(response.data), { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return new Response(JSON.stringify({ error: error.message }), {
                status: 500,
            });
        }
    }
}
