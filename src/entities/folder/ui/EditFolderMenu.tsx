import React from 'react';

import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CasinoOutlinedIcon from '@mui/icons-material/CasinoOutlined';

export function EditFolderMenu() {
    const changeModal = (status: boolean, modalName: string) => {
        const el = document.getElementById(modalName);
        if (el && el instanceof HTMLDialogElement) {
            if (status) {
                el.showModal();
            } else {
                el.close();
            }
        }
    };

    return (
        <div>
            <button
                className="btn btn-circle btn-outline"
                onClick={() => changeModal(true, 'folder_edit_modal')}
            >
                <BorderColorIcon />
            </button>
            <dialog
                className="modal modal-bottom sm:modal-middle"
                id="folder_edit_modal"
            >
                <div className="modal-box">
                    <div className="">
                        <h3 className="bg-inherit font-bold text-lg mb-3">
                            Редактировать папку
                        </h3>
                        <div className="flex flex-col gap-5">
                            <ul className="menu gap-3 bg-base-200 rounded-box w-full">
                                <li>
                                    <button
                                        className="btn btn-sm btn-outline justify-start"
                                        onClick={() => (
                                            changeModal(
                                                false,
                                                'folder_edit_modal'
                                            ),
                                            changeModal(
                                                true,
                                                'folder_rename_modal'
                                            )
                                        )}
                                    >
                                        Переименовать
                                    </button>
                                </li>
                                <li>
                                    <button className="btn btn-sm btn-outline justify-between text-[#DAA520] dark:text-[#FFD700]">
                                        Открыть в колесе удачи
                                        <CasinoOutlinedIcon />
                                    </button>
                                </li>
                            </ul>
                            <ul className="menu bg-base-200 rounded-box w-full">
                                <li>
                                    <button className="btn btn-sm btn-outline btn-error">
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
            <dialog
                className="modal modal-top sm:modal-middle"
                id="folder_rename_modal"
            >
                <div className="modal-box">
                    <form method="dialog">
                        <input
                            type="text"
                            className="input input-bordered input-primary w-full"
                            placeholder="Новое название"
                        />
                        <div className="modal-action">
                            <button className="btn" type="submit">
                                Создать
                            </button>
                            <button
                                className="btn"
                                type="reset"
                                onClick={() =>
                                    changeModal(false, 'folder_rename_modal')
                                }
                            >
                                Закрыть
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
}
