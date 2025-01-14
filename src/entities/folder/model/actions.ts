import { serverInstance } from '@/shared/api';
import { FolderType } from './types';

async function getFolder(id: number): Promise<FolderType> {
    return (await serverInstance.get(`/${id}`)).data;
}

async function addFolderItem(folderId: number, artWorkId: number) {
    const res = await serverInstance.post('/api/folder/item', {
        artWorkId: artWorkId,
        createdAt: new Date().toISOString().split('T')[0],
        folderId: folderId,
    });

    if (res.status === 200) return true;

    return false;
}

async function deleteFolderItem(id: number) {
    const res = await serverInstance.delete(`/api/folder/item/${id}`);

    if (res.status === 200) return true;

    return false;
}

async function deleteFolder(id: number) {
    await serverInstance.delete(`/api/folder/${id}`);
}

export { getFolder, addFolderItem, deleteFolderItem, deleteFolder };
