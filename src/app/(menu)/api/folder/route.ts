import { Table } from "@/shared/database";
import { NextRequest } from "next/server";

const table = new Table("folders");

export async function GET() {
    try {
        const data = await table.get();
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
