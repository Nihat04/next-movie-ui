import { VideoPlayer } from "./VideoPlayer";

export const MoviePlayer = ({ src }: { src: string }) => {
    return <VideoPlayer src={src} />;
};
