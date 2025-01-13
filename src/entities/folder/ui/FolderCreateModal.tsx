import React from 'react';

import { serverInstance } from '@/shared/api';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';

import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

type formProps = {
    folderName: string;
};

export function FolderCreateModal() {
    const { register, handleSubmit } = useForm<formProps>();

    const onSubmit = (data: formProps) => {
        serverInstance
            .post('/api/folder/', {
                name: data.folderName,
            })
            .then(() => (mutate('api/folder'), changeModal(false)));
    };

    const changeModal = (status: boolean) => {
        const el = document.getElementById('create_modal');
        if (el && el instanceof HTMLDialogElement) {
            if (status) {
                el.showModal();
            } else {
                el.close();
            }
        }
    };

    return (
        <>
            <button
                className="btn btn-ghost btn-circle w-20 h-20"
                onClick={() => changeModal(true)}
                title="Создать папку"
            >
                <AddCircleOutlineRoundedIcon
                    sx={{ width: '100%', height: '100%' }}
                />
            </button>
            <dialog
                className="modal modal-top sm:modal-middle"
                id="create_modal"
            >
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Создать папку</h3>
                    <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
                        <div className="label">
                            <span className="label-text">Название папки</span>
                        </div>
                        <input
                            {...register('folderName', {
                                required: true,
                                maxLength: 40,
                            })}
                            type="text"
                            className="input input-bordered input-primary w-full"
                        />
                        <div className="modal-action">
                            <button className="btn" type="submit">
                                Создать
                            </button>
                            <button
                                className="btn"
                                type="reset"
                                onClick={() => changeModal(false)}
                            >
                                Закрыть
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    );
}
