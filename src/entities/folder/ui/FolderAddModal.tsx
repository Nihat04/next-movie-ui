'use client';

import React from 'react';
import useSWR from 'swr';

import { FolderType } from '../model';
import { addFolderItem, deleteFolderItem } from '../model';
import { FolderAction } from './FolderAction';

import Loader from '@/widgets/Loader/Loader';

import FolderIcon from '@mui/icons-material/Folder';
import { foldersKey } from '@/shared/swr';
import { useModal } from '@/shared/model';

export function FolderAddModal({ artWorkId }: { artWorkId: number }) {
    const { data, isLoading, mutate } = useSWR<FolderType[]>(foldersKey());
    const modal = useModal('folder_add_modal');

    const addToFolder = async (folder: FolderType): Promise<boolean> => {
        const res = await addFolderItem(folder.id, artWorkId);
        mutate();
        return res;
    };

    const removeFromFolder = async (folder: FolderType): Promise<boolean> => {
        const folderItem = folder.items?.find(
            (item) => item.artWorkId === artWorkId
        );

        if (folderItem) {
            const res = await deleteFolderItem(folderItem.id);
            mutate();
            return res;
        }

        return false;
    };

    return (
        <>
            <button className="btn w-full" onClick={modal.open}>
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
                                              item.artWork.id === artWorkId
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
