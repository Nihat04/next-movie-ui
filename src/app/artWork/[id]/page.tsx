import { getArtWork } from "@/entities/artWork";
import { MoviePlayer, SeriesPlayer } from "@/widgets/VideoPlayer";
import { Movie } from "@/entities/movie";
import React from "react";
import { Series } from "@/entities/series";
import { notFound } from "next/navigation";

export default async function ArtWorkPage({
    params,
}: {
    params: { id: string };
}) {
    const { id } = await params;
    const artWork = await getArtWork(Number(id));

    if(!artWork) {
        notFound();
    }

    const renderVideoPlayer = () => {
        if (artWork.globalType === "Фильм") {
            const movie = artWork as Movie

            return (
                <MoviePlayer
                    src={movie.path}
                    displayImg={movie.cover}
                />
            );
        }

        if (artWork.globalType === "Сериал") {
            const series = artWork as Series

            return (
                <SeriesPlayer
                    episodes={series.episodes}
                    displayImg={series.cover}
                />
            );
        }
    };

    return (
        <>
            <main>
                <section>
                    {renderVideoPlayer()}
                </section>
            </main>
        </>
    );
}
