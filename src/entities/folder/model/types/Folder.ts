import { FolderItem } from "./FolderItem";

export type Folder = {
    id: number;
    name: string;
    items: FolderItem[];
};
