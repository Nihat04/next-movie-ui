import { getFolder } from "@/entities/folder/model/controller";
import MoviesGrid from "@/shared/ui/MoviesGrid/MoviesGrid";
import React from "react";

export default async function FolderPage({
    params,
}: {
    params: { id: string };
}) {
    const { id } = await params;
    const folder = await getFolder(Number(id));
    return (
        <main>
            <MoviesGrid movies={folder.items.map((item) => item.art)} />
        </main>
    );
}
