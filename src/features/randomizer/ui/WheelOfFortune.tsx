'use client';

import React from 'react';
import useSWR from 'swr';
import { notFound } from 'next/navigation';

import Loader from '@/widgets/Loader/Loader';
import { PieChart } from '@/widgets/PieChart';
import { folderKey } from '@/shared/swr';
import { FolderType } from '@/entities/folder';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export function WheelOfFortune() {
    const { data, isLoading, error } = useSWR<FolderType>(folderKey(26));

    if (error) {
        notFound();
    }

    if (isLoading || !data || !data.items)
        return (
            <div className="absolute inset-0 flex items-center justify-center">
                <Loader />
            </div>
        );

    const pieData = {
        labels: data.items?.map((folderItem) => folderItem.artWork.name),
        datasets: [
            {
                label: '',
                data: data.items?.map(() => 100 / 5),
            },
        ],
    };

    const spinWheel = () => {
        console.log(data);
    };

    return (
        <div className="flex gap-6 flex-col items-center">
            <div className="relative m-10 max-w-2xl w-full">
                <div className="absolute top-[-25px] left-1/2 -translate-x-1/2 z-50 rotate-90">
                    <PlayArrowIcon fontSize="large" />
                </div>
                <div className="w-full">
                    <PieChart data={pieData} />
                </div>
            </div>
            <div>
                <button onClick={spinWheel} className="btn rounded">
                    Spin the Wheel
                </button>
            </div>
        </div>
    );
}
