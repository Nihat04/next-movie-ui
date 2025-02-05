import { ObjToSearchParams } from '@/shared/DTO';
import { SearchParams } from '@/shared/types';

export const foldersKey = () => '/api/folder';

export const folderKey = (id: number) => `/api/folder/${id}`;

export const movieKey = (id: number) => `/api/kp/movie/${id}`;

export const searchKey = ({
    query,
    page,
    pageLimit = 30,
}: {
    query: string;
    page: number;
    pageLimit?: number;
}) => {
    const searchParamsString = ObjToSearchParams({
        query: query,
        page: page.toString(),
        pageLimit: pageLimit.toString(),
    });

    return `/api/kp/movie/search?${searchParamsString}`;
};

export const kpKey = ({
    page,
    pageLimit = 30,
    filters,
}: {
    page: number;
    pageLimit?: number;
    filters?: SearchParams;
}) => {
    const searchParamsString = ObjToSearchParams({
        page: page.toString(),
        pageLimit: pageLimit.toString(),
        ...filters,
    });

    return `/api/kp/movie?${searchParamsString}`;
};
