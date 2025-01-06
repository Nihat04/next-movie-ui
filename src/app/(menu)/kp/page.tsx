"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { Kinopoisk, Search } from "@/features/kinopoisk";

import SearchIcon from "@mui/icons-material/Search";
import { VertcalGrid } from "@/shared/ui/MoviesGrid";
import { KpMovieToArtWork } from "@/shared/DTO";

type formParams = {
    search: string;
};

export default function KinopoiskPage() {
    const { register, handleSubmit } = useForm<formParams>();
    const [searchResult, setSearchResult] = useState<Search | null>(null);
    const [page, setPage] = useState<number>(1);

    const onSubmit = (data: formParams) => {
        Kinopoisk.find(data.search, page).then((res) => setSearchResult(res));
    };

    // const updateSearchResult = () => {
    //     Kinopoisk.find(data.search, page).then((res) => setSearchResult(res));
    // };

    const nextPage = () => {
        if (searchResult && searchResult.page < searchResult.pages) {
            setPage(searchResult.page + 1);
        }
    };

    const prevPage = () => {
        if (searchResult && searchResult.page > searchResult.pages) {
            setPage(searchResult.page - 1);
        }
    };

    return (
        <main>
            <section className="flex justify-center mb-20">
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
                {searchResult && (
                    <>
                        <div className="mb-20">
                            <VertcalGrid
                                movies={searchResult.docs.map((movie) =>
                                    KpMovieToArtWork(movie)
                                )}
                            />
                        </div>
                        <div className="mb-20 flex justify-center">
                            <div className="join">
                                <button
                                    className={`join-item btn`}
                                    onClick={() => prevPage()}
                                >
                                    «
                                </button>
                                <button className="join-item btn">
                                    {`Страница ${page} из ${searchResult?.pages}`}
                                </button>
                                <button
                                    className={`join-item btn `}
                                    onClick={() => nextPage()}
                                >
                                    »
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </section>
        </main>
    );
}
