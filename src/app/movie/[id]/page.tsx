'use client';

import React, { use } from 'react';
import { notFound } from 'next/navigation';

import Image from 'next/image';

import { FolderAddModal } from '@/entities/folder';
import { ArtWork } from '@/entities/artWork';
import fetcher from '@/shared/api/fetcher';
import useSWR from 'swr';

export default function ArtWorkPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const numberId = Number(id);

    if (!numberId) {
        notFound();
    }

    const { data, isLoading, error } = useSWR<ArtWork>(
        `/api/kp/movie/${id}`,
        fetcher
    );

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
                <span>Ошибка, не удалось найти фильм</span>
            </div>
        );
    }

    if (isLoading || !data)
        return (
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="loading loading-ring loading-lg" />
            </div>
        );

    return (
        <>
            <main>
                <section>
                    <div className="flex gap-5 flex-col md:flex-row">
                        <div className="">
                            <Image
                                className="mb-3 w-full sm:w-auto"
                                src={
                                    data.cover ||
                                    '/assets/img/not-found-light.png'
                                }
                                alt="постер фильма"
                                width={300}
                                height={100}
                            />
                            <FolderAddModal artWorkId={numberId} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <h2 className="text-3xl mb-3 text-center font-bold border-b-2 sm:text-left">
                                {data.name}
                            </h2>
                            {data.description && (
                                <div className="text-gray-400 p-2 bg-base-300 rounded-lg">
                                    <p>{data.description}</p>
                                </div>
                            )}
                            <p>
                                год выхода: <b>{data.year}</b>
                            </p>
                            <p>
                                жанры: <b>{data.genres.join(', ')}</b>
                            </p>
                            <p>
                                рейтинги: Кинопоиск - <b>{data.kpRating}</b> |
                                KinoNext - <b>{data.knRating}</b>
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
