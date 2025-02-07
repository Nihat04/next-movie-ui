import React, { useState } from 'react';
import { Drawer } from '@mui/material';

import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import { useRouter } from 'next/navigation';
import { ObjToSearchParams } from '@/shared/DTO';
import { FILTERS } from '../model/filter';

export function KpFilter() {
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission behavior

        const formData = new FormData(event.currentTarget); // Get form data
        const filters: Record<string, string[]> = {}; // Object to store filter values

        // Iterate over the form data and group values by filter name
        formData.forEach((value, key) => {
            if (!filters[key]) {
                filters[key] = [];
            }
            filters[key].push(value as string);
        });

        // Convert filters object to URL query parameters
        const queryParams = ObjToSearchParams(filters);

        // Update the URL with the new query parameters
        router.push(`?${queryParams.toString()}`);

        // Close the drawer
        setMenuOpen(false);
    };

    return (
        <div>
            <button
                className="btn btn-circle btn-outline"
                onClick={() => setMenuOpen(true)}
                type="button"
            >
                <TuneRoundedIcon />
            </button>
            <Drawer
                open={menuOpen}
                onClose={() => setMenuOpen(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        maxWidth: '70vw',
                        '@media (prefers-color-scheme: dark)': {
                            backgroundColor: '#1f2937',
                        },
                    },
                }}
            >
                <div className="p-5">
                    <form onSubmit={onSubmit} className="mb-10">
                        <div className="mb-4 flex flex-col gap-3">
                            {FILTERS.map((filter, index) => (
                                <div
                                    key={index}
                                    className="collapse bg-base-200"
                                >
                                    <input type="checkbox" />
                                    <div className="dark:text-white collapse-title text-xl font-medium">
                                        {filter.title}
                                    </div>
                                    <div className="collapse-content">
                                        {filter.values.map((value, index) => (
                                            <label
                                                key={index}
                                                className="label cursor-pointer gap-3 justify-start"
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
