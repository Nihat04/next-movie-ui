import React from 'react';

import { useForm } from 'react-hook-form';

import { serverInstance } from '@/shared/api';
import { mutateFolders } from '@/shared/swr';

import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { useModal } from '@/shared/model';

type formProps = {
    folderName: string;
};

export function FolderCreateModal() {
    const { register, handleSubmit, reset } = useForm<formProps>();
    const modal = useModal('create_modal');

    const onSubmit = async (data: formProps) => {
        await serverInstance.post('/api/folder/', {
            name: data.folderName,
        });

        mutateFolders();
        modal.close();
        reset({});
    };

    return (
        <>
            <button
                className="btn btn-ghost btn-circle w-20 h-20"
                onClick={modal.open}
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
                                onClick={modal.close}
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
