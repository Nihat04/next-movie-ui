import { Folder } from "@/entities/folder";
import { Table } from "@/shared/database";

const table = new Table<Folder>("folders");

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const id = Number((await params).id);

    const validationResult = validateId(id);

    if (validationResult.status !== 200) {
        return new Response(JSON.stringify({ error: validationResult.msg }), {
            status: validationResult.status,
        });
    }

    try {
        const data = await table.getById(id);

        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return new Response(error.message, { status: 500 });
        }
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const id = Number((await params).id);

    const validationResult = validateId(id);

    if (validationResult.status !== 200) {
        return new Response(JSON.stringify({ error: validationResult.msg }), {
            status: validationResult.status,
        });
    }

    const body = await request.json();
    try {
        const data = await table.update(id, body);
        return new Response(JSON.stringify(data), {
            status: 200,
        });
    } catch (error) {
        if (error instanceof Error) {
            return new Response(error.message, { status: 500 });
        }
    }
}

function validateId(id: number): { status: number; msg?: string } {
    if (!id) {
        return { msg: "id must exist", status: 400 };
    }

    if (!(typeof id === "number")) {
        return { msg: "id must be a number", status: 400 };
    }

    return { status: 200 };
}
