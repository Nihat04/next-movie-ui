"use client";

import { ArtWork } from "@/entities/artWork";
import { Folder, removeArtWorkFromFolder } from "@/entities/folder";
import fetcher from "@/shared/api/fetcher";
import Loader from "@/shared/ui/Loader/Loader";
import { VertcalGrid } from "@/shared/ui/MoviesGrid";
import React, { use, useState } from "react";
import useSWR, { mutate } from "swr";

export default function FolderPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const { data, isLoading } = useSWR<Folder>(`/api/folder/${id}`, fetcher);
    const [editWork, setEditWork] = useState<ArtWork | null>(null);

    if (isLoading || !data)
        return (
            <div className="absolute inset-0 flex items-center justify-center">
                <Loader />
            </div>
        );

    const changeModal = (status: boolean) => {
        const el = document.getElementById("folderItem_edit_modal");
        if (el && el instanceof HTMLDialogElement) {
            if (status) {
                el.showModal();
            } else {
                el.close();
            }
        }
    };

    const openModal = (artWork: ArtWork) => {
        setEditWork(artWork);
        changeModal(true);
    };

    const manipulateFolder = async (func: () => void) => {
        await func();
        mutate(`/api/folder/${id}`);
        changeModal(false);
    };

    return (
        <>
            <main>
                <section className="mb-10">
                    <h2 className="text-center sm:text-left text-6xl font-bold">
                        {data.name}
                    </h2>
                </section>
                <section>
                    {data.items && (
                        <VertcalGrid
                            movies={data.items.map((item) => item.art)}
                            menu={openModal}
                        />
                    )}
                </section>
            </main>
            <dialog
                className="modal modal-bottom sm:modal-middle"
                id="folderItem_edit_modal"
            >
                <div className="modal-box">
                    {editWork ? (
                        <div className="">
                            <h3 className="bg-inherit font-bold text-lg mb-3">
                                {editWork?.name}
                            </h3>
                            <ul className="menu bg-base-200 rounded-box w-full">
                                <li>
                                    <button
                                        className="btn btn-sm btn-outline btn-error"
                                        onClick={() =>
                                            manipulateFolder(() =>
                                                removeArtWorkFromFolder(
                                                    editWork,
                                                    data
                                                )
                                            )
                                        }
                                    >
                                        Удалиит
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <p>Произошла ошибка</p>
                    )}
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
