'use client';

import useSWR from 'swr';
import { use, useState } from 'react';

import Loader from '@/widgets/Loader/Loader';
import { KpSearch, Search } from '@/features/kinopoisk';

import { kpKey, searchKey } from '@/shared/swr/model/keys';
import { KpMoviesGrid } from '@/features/kinopoisk/ui/KpMoviesGrid';
import { useRouter } from 'next/navigation';
import { ObjToSearchParams } from '@/shared/DTO';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default function KinopoiskPage({
    searchParams,
}: {
    searchParams: SearchParams;
}) {
    const [page, setPage] = useState<number>(4);
    const searchParamsUse = use(searchParams);
    const router = useRouter();

    const { data, isLoading, mutate } = useSWR<Search>(
        searchParamsUse['q']
            ? searchKey({ page, query: searchParamsUse['q'] as string })
            : kpKey({ page, filters: searchParamsUse })
    );

    const changePage = (value: number) => {
        setPage(value);
        const searchParams = ObjToSearchParams({
            ...searchParamsUse,
            page: value.toString(),
        });
        router.push(`?${searchParams}`);
    };

    const nextPage = () => {
        if (data && data.page < data.pages) {
            changePage(data.page + 1);
            mutate();
        }
    };

    const prevPage = () => {
        if (data && data.page < data.pages) {
            changePage(data.page - 1);
            mutate();
        }
    };

    const paginator = () => {
        return (
            <div className="mb-20 flex justify-center">
                <div className="join">
                    <button
                        className={`join-item btn`}
                        onClick={() => prevPage()}
                    >
                        «
                    </button>
                    <button className="join-item btn">
                        {`Страница ${page} из ${data?.pages}`}
                    </button>
                    <button
                        className={`join-item btn `}
                        onClick={() => nextPage()}
                    >
                        »
                    </button>
                </div>
            </div>
        );
    };

    return (
        <main>
            <section className="flex flex-col gap-2 items-center mb-10">
                <KpSearch page={page} />
            </section>
            <section className="mb-20">
                {!isLoading ? (
                    <>
                        {data && data.docs && (
                            <>
                                <KpMoviesGrid movies={data.docs} />
                                {paginator()}
                            </>
                        )}
                    </>
                ) : (
                    <Loader />
                )}
            </section>
        </main>
    );
}
