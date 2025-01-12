import { FolderItemType, FolderType } from '@/entities/folder';
import { Table } from '@/shared/database';
import { NextRequest } from 'next/server';

const table = new Table<FolderType>('folders');

export async function GET() {
    try {
        const data = await table.get();

        for (const folder of data) {
            folder.items = await Table.query<FolderItemType>(
                `SELECT * FROM folderitems WHERE folderId = ${folder.id}`
            );
            for (const item of folder.items) {
                item.artWork = await Table.getById('artworks', item.artWorkId);
            }
        }

        return new Response(JSON.stringify(data), {
            status: 200,
        });
    } catch (error) {
        if (error instanceof Error) {
            return new Response(error.message, { status: 500 });
        }
    }
}

export async function POST(request: NextRequest) {
    const body = await request.json();

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
