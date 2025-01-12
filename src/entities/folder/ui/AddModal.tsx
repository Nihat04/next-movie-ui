'use client';

import React from 'react';
import useSWR from 'swr';

import { Folder, FolderType } from '../model';
import { ArtWork } from '@/entities/artWork';
import fetcher from '@/shared/api/fetcher';
import Loader from '@/shared/ui/Loader/Loader';

import FolderIcon from '@mui/icons-material/Folder';
import { FolderAction } from './FolderAction';

export function AddModal({ artWork }: { artWork: ArtWork }) {
    const { data, isLoading, mutate } = useSWR<FolderType[]>(
        '/api/folder',
        fetcher
    );
    const changeModal = (status: boolean) => {
        const el = document.getElementById('folder_add_modal');
        if (el && el instanceof HTMLDialogElement) {
            if (status) {
                el.showModal();
            } else {
                el.close();
            }
        }
    };

    const addToFolder = async (folder: FolderType): Promise<boolean> => {
        const folderInstance = new Folder(folder.id);
        const res = await folderInstance.addFolderItem(artWork);
        mutate();
        return res;
    };

    const removeFromFolder = async (folder: FolderType): Promise<boolean> => {
        const folderItem = folder.items?.find(
            (item) => item.artWorkId === artWork.id
        );

        if (folderItem) {
            const folderInstance = new Folder(folder.id);
            const res = await folderInstance.removeFolderItem(folderItem.id);
            mutate();
            return res;
        }

        return false;
    };

    return (
        <>
            <button className="btn w-full" onClick={() => changeModal(true)}>
                Добавить в папку
                <FolderIcon />
            </button>
            <dialog
                className="modal modal-bottom sm:modal-middle"
                id="folder_add_modal"
            >
                <div className="modal-box">
                    <h3 className="bg-inherit font-bold text-lg">
                        Добавить в папку
                    </h3>
                    <ul className="flex gap-5 flex-col p-5">
                        {isLoading ? (
                            <Loader />
                        ) : (
                            data?.map((folder) => {
                                const isAdded = folder.items
                                    ? folder.items.some(
                                          (item) =>
                                              item.artWork.id === artWork.id
                                      )
                                    : false;

                                return (
                                    <li key={folder.id}>
                                        <FolderAction
                                            folder={folder}
                                            action={
                                                isAdded
                                                    ? removeFromFolder
                                                    : addToFolder
                                            }
                                            success={isAdded}
                                        />
                                    </li>
                                );
                            })
                        )}
                    </ul>
                    <form method="dialog">
                        <button className=" btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                        </button>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
}
