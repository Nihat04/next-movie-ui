"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { Search } from "@/features/kinopoisk";

import SearchIcon from "@mui/icons-material/Search";
import { VertcalGrid } from "@/shared/ui/MoviesGrid";
import { KpMovieToArtWork } from "@/shared/DTO";
import Loader from "@/shared/ui/Loader/Loader";
import fetcher from "@/shared/api/fetcher";
import useSWR, { mutate } from "swr";

type formParams = {
    search: string;
};

export default function KinopoiskPage() {
    const { register, handleSubmit } = useForm<formParams>();
    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const { data, isLoading } = useSWR<Search>(
        `/api/kp/movie?query=${search}&page=${page}&pageLimit=${30}`,
        fetcher
    );

    const onSubmit = (data: formParams) => {
        setSearch(data.search);
        mutate(`/api/kp/movie?query=${search}&page=${page}&pageLimit=${30}`);
    };

    const nextPage = () => {
        if (data && data.page < data.pages) {
            setPage(data.page + 1);
            mutate(
                `/api/kp/movie?query=${search}&page=${page}&pageLimit=${30}`
            );
        }
    };

    const prevPage = () => {
        if (data && data.page < data.pages) {
            setPage(data.page - 1);
            mutate(
                `/api/kp/movie?query=${search}&page=${page}&pageLimit=${30}`
            );
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

    if (isLoading) {
        return <Loader />;
    }

    return (
        <main>
            <section className="flex justify-center mb-10">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex items-center gap-3"
                >
                    <input
                        {...register("search", { required: true })}
                        type="search"
                        placeholder="Поиск"
                        className="input input-ghost input-bordered border-1 border-[#9EA5B2] w-full max-w-xs text-2xl"
                    />
                    <button className="btn btn-circle btn-outline">
                        <SearchIcon />
                    </button>
                </form>
            </section>
            <section className="mb-20">
                {data && data.docs && (
                    <>
                        {paginator()}
                        <div className="mb-20">
                            <VertcalGrid
                                movies={data.docs.map((movie) =>
                                    KpMovieToArtWork(movie)
                                )}
                            />
                        </div>
                        {paginator()}
                    </>
                )}
            </section>
        </main>
    );
}
