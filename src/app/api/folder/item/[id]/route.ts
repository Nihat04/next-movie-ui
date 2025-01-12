import { Table } from '@/shared/database';
import { NextRequest } from 'next/server';

const table = new Table('folderitems');

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const id = Number((await params).id);

    try {
        console.log(id);
        await table.delete(id);

        return new Response(null, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return new Response(error.message, { status: 500 });
        }
    }
}
