import { FolderItemType } from './FolderItemType';

export type FolderType = {
    id: number;
    name: string;
    items: FolderItemType[] | null;
};
