import { ArtWork } from "@/entities/artWork";

type FolderItem = {
    art: ArtWork;
};

export type Folder = {
    id: number
    name: string;
    items: FolderItem[];
};
