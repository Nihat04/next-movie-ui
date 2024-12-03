'use client'

import "swiper/css";
import styles from "../styles/SeriesPlayer.module.css";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Episode } from "../../../entities/series";

import { VideoPlayer } from "./VideoPlayer";

export const SeriesPlayer = ({ episodes, displayImg }: { episodes: Episode[], displayImg?: string }) => {
    const [currentEpisode, setCurrentEpisdoe] = useState(episodes[0]);

    return (
        <div>
            <div className={styles["video-player"]}>
                <VideoPlayer src={currentEpisode.path} displayImg={displayImg} />
            </div>
            <div className={styles["episodes-selector"]}>
                <Swiper
                    slidesPerView={8}
                    spaceBetween={30}
                    className={styles["episodes__list"]}
                >
                    {episodes.map((episode) => (
                        <SwiperSlide
                            key={episode.number}
                            className={styles["episodes__item"]}
                        >
                            <button
                                onClick={() => setCurrentEpisdoe(episode)}
                            >{`Серия ${episode.number}`}</button>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};
