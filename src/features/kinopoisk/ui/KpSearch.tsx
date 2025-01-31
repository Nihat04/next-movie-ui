import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Drawer } from '@mui/material';
import { mutate } from 'swr';

import SearchIcon from '@mui/icons-material/Search';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import { Kinopoisk } from '../model';
import { kpKey } from '@/shared/swr/model/keys';

type formParams = {
    search: string;
};

export function KpSearch({ page }: { page: number }) {
    const { register, handleSubmit } = useForm<formParams>();

    const [filtersMenu, setFiltersMenu] = useState(false);

    const onSubmit = async (data: formParams) => {
        const newData = Kinopoisk.find(data.search, page);
        mutate(kpKey(page), newData, false);
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex items-center gap-3"
            >
                <button
                    className="btn btn-circle btn-outline"
                    onClick={() => setFiltersMenu(true)}
                    type="button"
                >
                    <TuneRoundedIcon />
                </button>
                <input
                    {...register('search', { required: true })}
                    type="search"
                    placeholder="Поиск"
                    className="input input-ghost input-bordered border-1 border-[#000] dark:border-[#9EA5B2] w-full max-w-xs text-2xl"
                />
                <button className="btn btn-circle btn-outline">
                    <SearchIcon />
                </button>
                <Drawer
                    open={filtersMenu}
                    onClose={() => setFiltersMenu(false)}
                >
                    <div className="p-5 dark:bg-base-100 h-full shadow-inner">
                        <button className="btn sm:btn-sm md:btn-md lg:btn-lg">
                            Применить
                        </button>
                    </div>
                </Drawer>
            </form>
        </div>
    );
}
