'use client';

import { useState, useEffect } from 'react';

export const VideoPlayer = ({ src }: { src: string }) => {
    const [videoSrc, setVideoSrc] = useState<string>('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setVideoSrc(`${window.location.origin}/${src}`);
        }
    }, [src]);

    return (
        <div className="overflow-hidden">
            <video
                style={{
                    width: '100dvw',
                    height: '100dvh',
                    overflow: 'hidden',
                }}
                src={videoSrc ? videoSrc : '#'}
                controls
            />
        </div>
    );
};
