import { mutate } from 'swr';

export const mutateFolders = () => mutate('/api/folder');

export const mutateFolder = (id: number) => mutate(`/api/folder/${id}`);

export const mutateMovie = (id: number) => mutate(`/api/kp/movie/${id}`);
