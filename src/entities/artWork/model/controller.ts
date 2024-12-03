import { promises as fs } from "fs";
import { ArtWork } from "./types";

export async function getArtWorks(): Promise<ArtWork[]> {
    return JSON.parse(
        await fs.readFile(process.cwd() + "/public/config.json", "utf-8")
    );
}

export async function getArtWork(id: number): Promise<ArtWork | null> {
    const artWorks: ArtWork[] = JSON.parse(
        await fs.readFile(process.cwd() + "/public/config.json", "utf-8")
    );
    
    const artWork = artWorks.find((art) => art.id === id);

    if(!artWork) return null

    return artWork;
}
