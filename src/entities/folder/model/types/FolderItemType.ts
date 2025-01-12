import { ArtStatuses, ArtWork } from '@/entities/artWork';

export type FolderItemType = {
    id: number;
    artWorkId: number;
    folderId: number;
    artWork: ArtWork;
    createdAt: Date;
    status?: ArtStatuses;
    priority?: 1 | 2 | 3 | 4 | 5;
    customPriority?: number;
};
