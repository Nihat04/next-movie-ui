'use client';

import useSWR from 'swr';
import React, { use } from 'react';
import { notFound } from 'next/navigation';

import fetcher from '@/shared/api/fetcher';
import Loader from '@/shared/ui/Loader/Loader';
import { FolderType } from '@/entities/folder';
import { Grid, VerticalPoster } from '@/shared/ui/Grid';
import { EditFolderMenu } from '@/entities/folder/ui/EditFolderMenu';
import { FolderItemMenu } from '@/entities/folder/ui/FolderItemMenu';

import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

export default function FolderPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    if (!Number(id)) {
        notFound();
    }
    const { data, isLoading, error } = useSWR<FolderType>(
        `/api/folder/${id}`,
        fetcher
    );

    if (error) {
        return (
            <div role="alert" className="alert alert-error">
                <CancelOutlinedIcon />
                <span>{`Ошибка, не удалось найти папку`}</span>
            </div>
        );
    }

    if (isLoading || !data)
        return (
            <div className="absolute inset-0 flex items-center justify-center">
                <Loader />
            </div>
        );

    return (
        <>
            <main>
                <section className="mb-10 flex justify-center sm:justify-start items-center gap-2">
                    <h2 className="text-6xl font-bold">{data.name}</h2>
                    <EditFolderMenu />
                </section>
                <section>
                    {data.items && (
                        <Grid>
                            {data.items.map((item) => (
                                <VerticalPoster
                                    key={item.id}
                                    href={`/movie/${item.artWork.id}`}
                                    name={item.artWork.name}
                                    cover={item.artWork.cover}
                                >
                                    <FolderItemMenu folderItem={item} />
                                </VerticalPoster>
                            ))}
                        </Grid>
                    )}
                </section>
            </main>
        </>
    );
}
