import { FolderItemType } from '@/entities/folder';
import { Table } from '@/shared/database';
import { NextRequest } from 'next/server';

const table = new Table('folderitems');

export async function POST(request: NextRequest) {
    const body: FolderItemType = await request.json();

    try {
        const data = await table.create(body);
        return new Response(JSON.stringify(data), {
            status: 200,
        });
    } catch (error) {
        if (error instanceof Error) {
            return new Response(error.message, { status: 500 });
        }
    }
}
