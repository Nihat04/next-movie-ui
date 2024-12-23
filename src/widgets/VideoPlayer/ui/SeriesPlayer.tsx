"use client";

import "swiper/css";

import { useState } from "react";

import { Episode } from "../../../entities/series";

import { VideoPlayer } from "./VideoPlayer";

export const SeriesPlayer = ({ episodes }: { episodes: Episode[] }) => {
    const [currentEpisode, setCurrentEpisdoe] = useState(episodes[0]);
    const [seriesMenuOpen, setSeriesMenuOpen] = useState<boolean>(false);

    return (
        <div className="relative">
            <div>
                <VideoPlayer src={currentEpisode.path} />
            </div>
            <div className="absolute hidden top-0 left-0">
                <button className="px-5 py-2 bg-sky-600 rounded-lg" onClick={() => setSeriesMenuOpen(!seriesMenuOpen)}>Серии</button>
                <ul className="hidden">
                    {episodes.map((episode) => (
                        <li key={episode.number}>
                            <button
                                className="p-10 bg-sky-300 br-100%"
                                onClick={() => setCurrentEpisdoe(episode)}
                            >{`Серия ${episode.number}`}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
