'use client';

import { ReactNode } from 'react';
import { SWRConfig, SWRConfiguration } from 'swr';

const options: SWRConfiguration = {
    fetcher: (resource, init) =>
        fetch(resource, init).then((res) => res.json()),
};

export function SWRProvider({ children }: { children: ReactNode }) {
    return <SWRConfig value={options}>{children}</SWRConfig>;
}
