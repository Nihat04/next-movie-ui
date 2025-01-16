'use client';

import { WheelOfFortune } from '@/features/randomizer';
import React from 'react';

export default function RoulettPage() {
    return (
        <main>
            <section>
                <WheelOfFortune />
            </section>
        </main>
    );
}
