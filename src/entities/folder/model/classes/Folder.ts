import { ArtWork } from '@/entities/artWork';
import { FolderType } from '../types';
import axios, { AxiosInstance } from 'axios';

export class Folder {
    private id: number;
    private axiosInstance: AxiosInstance;

    constructor(id: number) {
        this.id = id;
        this.axiosInstance = axios.create({
            baseURL: `/api/folder`,
        });
        console.log(this.id);
    }

    async get(): Promise<FolderType> {
        return (await this.axiosInstance.get(`/${this.id}`)).data;
    }

    async addFolderItem(artWork: ArtWork) {
        const res = await this.axiosInstance.post('/item', {
            artWorkId: artWork.id,
            createdAt: new Date().toISOString().split('T')[0],
            folderId: this.id,
        });

        if (res.status === 200) return true;

        return false;
    }

    async removeFolderItem(id: number) {
        const res = await this.axiosInstance.delete(`/item/${id}`);

        if (res.status === 200) return true;

        return false;
    }

    static async deleteFolder(id: number) {
        'use server';
        await axios.delete(`/api/folder/${id}`);
    }
}
