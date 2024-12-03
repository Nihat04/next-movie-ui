'use client'

import styles from "../styles/VideoPlayer.module.css";

export const VideoPlayer = ({
    src,
    displayImg,
}: {
    src: string;
    displayImg?: string;
}) => {
    return (
        <div className={styles["video-player"]}>
            <video width={document.body.clientWidth} height={document.body.clientHeight / 4} src={src} controls />
        </div>
    );
};
