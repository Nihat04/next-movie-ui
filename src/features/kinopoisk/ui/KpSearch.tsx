import React from 'react';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';

import { Kinopoisk } from '../model';
import { kpKey } from '@/shared/swr/model/keys';
import { useRouter } from 'next/navigation';

import SearchIcon from '@mui/icons-material/Search';
import { KpFilter } from './KpFilter';

type formParams = {
    search: string;
};

export function KpSearch({ page }: { page: number }) {
    const { register, handleSubmit } = useForm<formParams>();
    const router = useRouter();

    const onSubmit = async (data: formParams) => {
        const newData = Kinopoisk.find(data.search, page);
        mutate(kpKey({ page }), newData, false);
        router.push(`?q=${encodeURIComponent(data.search)}&page=${page}`);
    };

    return (
        <div className="flex gap-3">
            <KpFilter />
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex items-center gap-3"
            >
                <input
                    {...register('search', { required: true })}
                    type="search"
                    placeholder="Поиск"
                    className="input input-ghost input-bordered border-1 border-[#000] dark:border-[#9EA5B2] w-full max-w-xs text-2xl"
                />
                <button className="btn btn-circle btn-outline">
                    <SearchIcon />
                </button>
            </form>
        </div>
    );
}
