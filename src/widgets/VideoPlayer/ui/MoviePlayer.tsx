import { VideoPlayer } from "./VideoPlayer";

export const MoviePlayer = ({ src, displayImg }: { src: string, displayImg?: string }) => {
    return <VideoPlayer src={src} displayImg={displayImg} />;
};
