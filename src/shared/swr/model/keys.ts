const BASE_URL = process.env.NEXT_PUBLIC_API;

export const foldersKey = () => '/api/folder';

export const folderKey = (id: number) => `/api/folder/${id}`;

export const movieKey = (id: number) => `/api/kp/movie/${id}`;

export const searchKey = (
    search: string,
    page: number,
    pageLimit: number = 30
) => `/api/kp/movie/search?query=${search}&page=${page}&pageLimit=${pageLimit}`;
