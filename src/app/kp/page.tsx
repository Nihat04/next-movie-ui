'use client';

import useSWR from 'swr';
import { useState } from 'react';

import Loader from '@/widgets/Loader/Loader';
import { KpSearch, Search } from '@/features/kinopoisk';
import { KpMovieToArtWork } from '@/shared/DTO';

import { Grid, VerticalPoster } from '@/shared/ui/Grid';
import { kpKey } from '@/shared/swr/model/keys';

export default function KinopoiskPage() {
    const [page, setPage] = useState<number>(1);

    const { data, isLoading, mutate } = useSWR<Search>(kpKey(page));

    const nextPage = () => {
        if (data && data.page < data.pages) {
            setPage(data.page + 1);
            mutate();
        }
    };

    const prevPage = () => {
        if (data && data.page < data.pages) {
            setPage(data.page - 1);
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
                                <div className="mb-20">
                                    <Grid>
                                        {data.docs.map((movie) => {
                                            const artWork =
                                                KpMovieToArtWork(movie);
                                            return (
                                                <VerticalPoster
                                                    key={artWork.id}
                                                    href={`/movie/${artWork.id}`}
                                                    name={artWork.name}
                                                    cover={artWork.cover}
                                                />
                                            );
                                        })}
                                    </Grid>
                                </div>
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
