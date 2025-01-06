import React from "react";
import { notFound } from "next/navigation";

import Image from "next/image";

import { Kinopoisk } from "@/features/kinopoisk";
import { AddModal } from "@/entities/folder";
import { Table } from "@/shared/database";
import { ArtWork } from "@/entities/artWork";

export default async function ArtWorkPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    if (!Number(id)) {
        notFound();
    }
    const intId = Number(id);
    let artWork;

    try {
        artWork = await Table.getById<ArtWork>("artWorks", intId);
    } catch (err) {
        artWork = await Kinopoisk.getById(Number(id));

        if (err instanceof ReferenceError) {
            Table.create<ArtWork>("artWorks", artWork);
        }
    }

    return (
        <>
            <main>
                <section>
                    <div className="flex gap-5 flex-col md:flex-row">
                        <div className="">
                            <Image
                                className="mb-3 w-full sm:w-auto"
                                src={artWork.cover}
                                alt="постер фильма"
                                width={300}
                                height={100}
                            />
                            <AddModal artWork={artWork} />
                        </div>
                        <div className="">
                            <h2 className="text-3xl mb-3 text-center font-bold border-b-2 sm:text-left">
                                {artWork.name}
                            </h2>
                            <p>
                                год выхода: <b>{artWork.year}</b>
                            </p>
                            <p>
                                Жанры: <b>{artWork.genres.join(", ")}</b>
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
