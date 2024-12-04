import { promises as fs } from "fs";
import { Folder } from "./types";

export async function getFolders(): Promise<Folder[]> {
    const folders = await fs.readFile(
        process.cwd() + "/src/shared/db/folders.json",
        "utf-8"
    );

    return JSON.parse(folders);
}

export async function getFolder(id: number): Promise<Folder> {
    const folders = JSON.parse(
        await fs.readFile(
            process.cwd() + "/src/shared/db/folders.json",
            "utf-8"
        )
    );

    return folders.find((folder: Folder) => folder.id === id);
}
