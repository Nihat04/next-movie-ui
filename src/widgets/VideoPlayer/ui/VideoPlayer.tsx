'use client'

export const VideoPlayer = ({
    src,
    displayImg,
}: {
    src: string;
    displayImg?: string;
}) => {
    return (
        <div>
            <video width={document.body.clientWidth} height={document.body.clientHeight / 4} src={src} controls />
        </div>
    );
};
