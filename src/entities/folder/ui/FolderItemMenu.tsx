import React from 'react';

import { FolderItemType } from '../model';

import axios from 'axios';

import { useModal } from '@/shared/model';
import { mutateFolder } from '@/shared/swr';

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export function FolderItemMenu({ folderItem }: { folderItem: FolderItemType }) {
    const modal = useModal(`folderItem_edit_modal_${folderItem.id}`);

    const deleteItem = async () => {
        await axios.delete(`/api/folder/item/${folderItem.id}`);
        modal.close();
        mutateFolder(folderItem.folderId);
    };

    return (
        <div>
            <div className="absolute top-2 right-2">
                <button
                    className="btn btn-circle w-6"
                    onClick={() => modal.open()}
                >
                    <MoreHorizIcon />
                </button>
            </div>

            <dialog
                className="modal modal-bottom sm:modal-middle"
                id={`folderItem_edit_modal_${folderItem.id}`}
            >
                <div className="modal-box">
                    <div className="">
                        <h3 className="bg-inherit font-bold text-lg mb-3">
                            {folderItem.artWork.name}
                        </h3>
                        <div className="flex flex-col gap-5">
                            <ul className="menu gap-3 bg-base-200 rounded-box w-full">
                                <li>
                                    <button
                                        className="btn btn-sm btn-outline"
                                        onClick={() =>
                                            window.open(
                                                `/movie/${folderItem.artWork.id}`,
                                                '_blank'
                                            )
                                        }
                                    >
                                        Перейти на страницу
                                        <OpenInNewOutlinedIcon
                                            sx={{ marginLeft: 'auto' }}
                                        />
                                    </button>
                                </li>
                                <li>
                                    <button className="btn btn-sm btn-outline btn-warning">
                                        Добавить в избранное
                                        <StarBorderRoundedIcon
                                            sx={{ marginLeft: 'auto' }}
                                        />
                                    </button>
                                </li>
                            </ul>
                            <ul className="menu bg-base-200 rounded-box w-full">
                                <li>
                                    <button
                                        className="btn btn-sm btn-outline btn-error"
                                        onClick={deleteItem}
                                    >
                                        Удалить
                                        <DeleteOutlinedIcon
                                            sx={{ marginLeft: 'auto' }}
                                        />
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
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
        </div>
    );
}
