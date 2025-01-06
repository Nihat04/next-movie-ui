import kinopoiskApi from "@/shared/api/instances/kinopoisk";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const id = Number((await params).id);

    if (!id) {
        return new Response(JSON.stringify({ error: "id must be a number" }), {
            status: 400,
        });
    }

    try {
        const response = await kinopoiskApi.get(`/movie/${id}`);

        return new Response(JSON.stringify(response.data), { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return new Response(error.message, { status: 500 });
        }
    }
}
