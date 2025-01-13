import { FolderType } from '@/entities/folder';
import { Table } from '@/shared/database';
import { NextRequest } from 'next/server';

const table = new Table<FolderType>('folders');

export async function GET(
    request: NextRequest,
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
        data.items = await Table.query(
            `SELECT * FROM folderitems WHERE folderId = ${id}`
        );
        for (const item of data.items) {
            item.artWork = await Table.getById('artworks', item.artWorkId);
        }

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

    const body: FolderType = await request.json();

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

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const id = Number((await params).id);

    try {
        await Table.query(`DELETE FROM folderitems WHERE folderId = ${id};`);
        await table.delete(id);

        return new Response(null, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return new Response(error.message, { status: 500 });
        }
    }
}

function validateId(id: number): { status: number; msg?: string } {
    if (!id) {
        return { msg: 'id must exist', status: 400 };
    }

    if (!(typeof id === 'number')) {
        return { msg: 'id must be a number', status: 400 };
    }

    return { status: 200 };
}
