"use client";

import { ArtWork } from "@/entities/artWork";
import { Folder, removeArtWorkFromFolder } from "@/entities/folder";
import fetcher from "@/shared/api/fetcher";
import Loader from "@/shared/ui/Loader/Loader";
import { VertcalGrid } from "@/shared/ui/MoviesGrid";
import { notFound } from "next/navigation";
import React, { use, useState } from "react";
import useSWR, { mutate } from "swr";

export default function FolderPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);

    if (!Number(id)) {
        notFound();
    }

    const { data, isLoading, error } = useSWR<Folder>(
        `/api/folder/${id}`,
        fetcher
    );
    const [editWork, setEditWork] = useState<ArtWork | null>(null);

    if (error) {
        return (
            <div role="alert" className="alert alert-error">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <span>Ошибка, не удалось найти папку</span>
            </div>
        );
    }

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
