"use client";

import { Folder } from "@/entities/folder";
import fetcher from "@/shared/api/fetcher";
import Loader from "@/shared/ui/Loader/Loader";
import { VertcalGrid } from "@/shared/ui/MoviesGrid";
import React, { use } from "react";
import useSWR from "swr";

export default function FolderPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const { data, isLoading } = useSWR<Folder>(`/api/folder/${id}`, fetcher);

    if (isLoading || !data)
        return (
            <div className="absolute inset-0 flex items-center justify-center">
                <Loader />
            </div>
        );

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
                        />
                    )}
                </section>
            </main>
        </>
    );
}
