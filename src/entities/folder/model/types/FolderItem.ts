import { ArtStatuses, ArtWork } from "@/entities/artWork";

export type FolderItem = {
    art: ArtWork;
    addDate: Date;
    status?: ArtStatuses;
    priority?: 1 | 2 | 3 | 4 | 5;
    customPriority?: number;
};
