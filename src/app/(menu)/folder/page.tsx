"use client";

import React from "react";
import { useForm } from "react-hook-form";
import useSWR, { mutate } from "swr";

import { Folder } from "@/entities/folder";
import fetcher from "@/shared/api/fetcher";

import SmallFolder from "@/entities/folder/ui/SmallFolder";
import RoundPlusIcon from "@/shared/assets/svg/RoundPlusIcon";
import Loader from "@/shared/ui/Loader/Loader";
import axios from "axios";

type formProps = {
    folderName: string;
};

export default function FoldersPage() {
    const { register, handleSubmit } = useForm<formProps>();

    const { data, isLoading } = useSWR<Folder[]>("api/folder", fetcher);

    const changeModal = (status: boolean) => {
        const el = document.getElementById("create_modal");
        if (el && el instanceof HTMLDialogElement) {
            if (status) {
                el.showModal();
            } else {
                el.close();
            }
        }
    };

    const onSubmit = (data: formProps) => {
        axios
            .post("/api/folder/", {
                name: data.folderName,
            })
            .then(() => (mutate("api/folder"), changeModal(false)));
    };

    if (isLoading)
        return (
            <div className="absolute inset-0 flex items-center justify-center">
                <Loader />
            </div>
        );

    return (
        <>
            <main>
                <section>
                    <div className="">
                        <ul className="grid gap-5 list-none grid-cols-1 xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                            {data &&
                                data.map((folder) => (
                                    <li key={folder.id} className="">
                                        <SmallFolder folder={folder} />
                                    </li>
                                ))}
                            <li className="p-5 w-full flex justify-center items-center">
                                <button
                                    className="w-20 h-20"
                                    onClick={() => changeModal(true)}
                                >
                                    <div className="w-full h-full">
                                        <RoundPlusIcon />
                                    </div>
                                </button>
                            </li>
                        </ul>
                    </div>
                </section>
            </main>
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
                            {...register("folderName", {
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
