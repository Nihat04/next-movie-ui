import { FolderItemType } from '../types';
import { Folder } from './Folder';

export class FolderItem {
    private folderItem: FolderItemType;
    private folder: Folder;

    constructor(folderItem: FolderItemType) {
        this.folderItem = folderItem;
        this.folder = new Folder(folderItem.id);
    }

    delete() {
        this.folder.removeFolderItem(this.folderItem.id);
    }
}
