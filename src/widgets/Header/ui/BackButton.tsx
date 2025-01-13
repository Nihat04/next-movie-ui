'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';

export default function BackButton() {
    const router = useRouter();

    return (
        <>
            <button
                className="hidden sm:block btn btn-circle"
                onClick={() => router.back()}
            >
                <ArrowBackIosNewRoundedIcon />
            </button>
        </>
    );
}
