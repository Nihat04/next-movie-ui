'use client';

import useSWR from 'swr';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Drawer } from '@mui/material';

import Loader from '@/shared/ui/Loader/Loader';
import fetcher from '@/shared/api/fetcher';
import { Search } from '@/features/kinopoisk';
import { KpMovieToArtWork } from '@/shared/DTO';

import SearchIcon from '@mui/icons-material/Search';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import { Grid, VerticalPoster } from '@/shared/ui/Grid';

type formParams = {
    search: string;
};

export default function KinopoiskPage() {
    const { register, handleSubmit } = useForm<formParams>();

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState<string>(searchParams.get('s') || '');
    const [page, setPage] = useState<number>(1);
    const [filtersMenu, setFiltersMenu] = useState(false);

    const { data, isLoading, mutate } = useSWR<Search>(
        `/api/kp/movie?query=${search}&page=${page}&pageLimit=${30}`,
        fetcher
    );

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );

    const onSubmit = (data: formParams) => {
        setSearch(data.search);
        router.push(pathname + '?' + createQueryString('s', data.search));
        mutate();
    };

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
            <section className="flex justify-center mb-10">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex items-center gap-3"
                >
                    <button
                        className="btn btn-circle btn-outline"
                        onClick={() => setFiltersMenu(true)}
                        type="button"
                    >
                        <TuneRoundedIcon />
                    </button>
                    <input
                        {...register('search', { required: true })}
                        type="search"
                        placeholder="Поиск"
                        className="input input-ghost input-bordered border-1 border-[#000] dark:border-[#9EA5B2] w-full max-w-xs text-2xl"
                    />
                    <button className="btn btn-circle btn-outline">
                        <SearchIcon />
                    </button>
                    <Drawer
                        open={filtersMenu}
                        onClose={() => setFiltersMenu(false)}
                    >
                        <div className="p-5 dark:bg-base-100 h-full shadow-inner">
                            <button className="btn sm:btn-sm md:btn-md lg:btn-lg">
                                Применить
                            </button>
                        </div>
                    </Drawer>
                </form>
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
