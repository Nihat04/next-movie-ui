'use client';

import { WheelOfFortune } from '@/features/randomizer';
import React from 'react';

export default function RoulettPage() {
    const segments = [
        'Happy',
        'Angry',
        'Sad',
        'Frustration',
        'Emptyness',
        'HUY',
    ];
    const segColors = [
        '#EE4040',
        '#F0CF50',
        '#815CD1',
        '#3DA5E0',
        // "#34A24F",
        // "#F9AA1F",
        // "#EC3F3F",
        '#FF9000',
    ];
    const onFinished = (winner: string) => {
        console.log(winner);
    };

    return (
        <main>
            <section>
                <div className="text-center">
                    <WheelOfFortune
                        segments={segments}
                        segColors={segColors}
                        winningSegment=""
                        onFinished={(winner) => onFinished(winner)}
                    />
                </div>
            </section>
        </main>
    );
}
