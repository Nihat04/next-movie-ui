import React, { useState } from 'react';
import { Drawer } from '@mui/material';

import TuneRoundedIcon from '@mui/icons-material/TuneRounded';

type filter = {
    name: string;
    title: string;
    type: 'radio' | 'checkbox';
    values: filterValue[];
};

type filterValue = {
    name: string;
    label?: string;
};

const FILTERS: filter[] = [
    {
        name: 'genres.name',
        title: 'Жанры',
        type: 'checkbox',
        values: [{ name: 'драма' }, { name: 'хоррор' }],
    },
    {
        name: 'type',
        title: 'Тип',
        type: 'checkbox',
        values: [
            { name: 'movie' },
            { name: 'tv-series' },
            { name: 'cartoon' },
            { name: 'animated-series' },
            { name: 'anime' },
        ],
    },
];

export function KpFilter() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div>
            <button
                className="btn btn-circle btn-outline"
                onClick={() => setMenuOpen(true)}
                type="button"
            >
                <TuneRoundedIcon />
            </button>
            <Drawer open={menuOpen} onClose={() => setMenuOpen(false)}>
                <div className="p-5 dark:bg-base-100 h-full shadow-inner">
                    <form>
                        <div className="mb-4 flex flex-col gap-3">
                            {FILTERS.map((filter, index) => (
                                <div
                                    key={index}
                                    className="collapse bg-base-200"
                                >
                                    <input
                                        type="checkbox"
                                        name="my-accordion-1"
                                    />
                                    <div className="dark:text-white collapse-title text-xl font-medium">
                                        {filter.title}
                                    </div>
                                    <div className="collapse-content">
                                        {filter.values.map((value, index) => (
                                            <label
                                                key={index}
                                                className="label cursor-pointer gap-1"
                                            >
                                                <input
                                                    name={filter.name}
                                                    value={value.name}
                                                    type="checkbox"
                                                    className="checkbox"
                                                />
                                                <span className="label-text">
                                                    {value.label || value.name}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="btn sm:btn-sm md:btn-md lg:btn-lg">
                            Применить
                        </button>
                    </form>
                </div>
            </Drawer>
        </div>
    );
}
