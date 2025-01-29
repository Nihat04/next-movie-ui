'use client';

import { WheelOfFortune } from '@/features/randomizer';
import React from 'react';

export default function WheelPage() {
    return (
        <main>
            <section>
                <div className="text-center">
                    <WheelOfFortune />
                </div>
            </section>
        </main>
    );
}
