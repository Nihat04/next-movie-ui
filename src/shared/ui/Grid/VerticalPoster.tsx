import Link from 'next/link';
import React, { ReactNode } from 'react';

export function VerticalPoster({
    href,
    name,
    cover,
    children,
}: {
    href: string;
    name: string;
    cover: string;
    children?: ReactNode;
}) {
    return (
        <li className="relative cursor-pointer">
            {children}
            <Link href={href} className="btn p-0 block w-full h-full">
                <div
                    className="aspect-[440/647] bg-cover bg-no-repeat bg-center-bottom rounded-[5px]"
                    style={{
                        backgroundImage: cover
                            ? `url(${cover})`
                            : `url(/assets/img/not-found-light.png)`,
                    }}
                >
                    <p className="absolute left-1/2 bottom-[10px] px-2 text-center text-white font-semibold text-[15px] line-clamp-2 bg-[rgba(0,0,0,0.6)] rounded-[15px] transform -translate-x-1/2">
                        {name}
                    </p>
                </div>
            </Link>
        </li>
    );
}
