'use client';

import React from 'react';
import useSWR from 'swr';

import { FolderCreateModal, FolderType, SmallFolder } from '@/entities/folder';

import Loader from '@/widgets/Loader/Loader';
import { foldersKey } from '@/shared/swr';

export default function FoldersPage() {
    const { data, isLoading } = useSWR<FolderType[]>(foldersKey());

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
                    <div>
                        <ul className="grid gap-5 list-none grid-cols-1 xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                            {data &&
                                data.map((folder) => (
                                    <li key={folder.id} className="">
                                        <SmallFolder folder={folder} />
                                    </li>
                                ))}
                            <li className="p-5 w-full flex justify-center items-center">
                                <FolderCreateModal />
                            </li>
                        </ul>
                    </div>
                </section>
            </main>
        </>
    );
}
