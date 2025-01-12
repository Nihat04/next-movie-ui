import { ReactNode } from 'react';

export function Grid({ children }: { children: ReactNode }) {
    return (
        <div>
            <ul className="grid gap-[30px] list-none xl:grid-cols-10 lg:grid-cols-6 md:grid-cols-4 grid-cols-2">
                {children}
            </ul>
        </div>
    );
}
