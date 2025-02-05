import { SearchParams } from '../types';

export function ObjToSearchParams(params: SearchParams) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, values]) => {
        if (values) {
            if (typeof values === 'string') {
                searchParams.append(key, values);
            } else {
                values.forEach((value) => searchParams.append(key, value));
            }
        } else {
            throw new Error('param undefined');
        }
    });
    return searchParams.toString();
}
