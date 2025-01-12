import Link from 'next/link';
import React, { ReactElement } from 'react';

import LocalMoviesRoundedIcon from '@mui/icons-material/LocalMoviesRounded';
import FolderIcon from '@mui/icons-material/Folder';
import CasinoRoundedIcon from '@mui/icons-material/CasinoRounded';

type Link = {
    label: string;
    path: string;
    icon: ReactElement;
};

const NAV_LINKS: Link[] = [
    { label: 'Папки', path: '/folder', icon: <FolderIcon /> },
    { label: 'Рулетка', path: '/roulette', icon: <CasinoRoundedIcon /> },
    { label: 'Кинопоиск', path: '/kp', icon: <LocalMoviesRoundedIcon /> },
];

export default function Header() {
    return (
        <header className="sticky top-2 m-2 mb-5 z-50">
            <div className="navbar bg-slate-200 dark:bg-base-100 p-2 rounded-2xl">
                <div className="flex-1">
                    <Link
                        href="/"
                        className="btn btn-ghost text-xl self-center"
                    >
                        Kino Next
                    </Link>
                </div>
                <nav className="flex-none">
                    <ul className="menu menu-horizontal bg-base-200 rounded-box">
                        {NAV_LINKS.map((link, index) => (
                            <li key={index}>
                                <Link href={link.path}>{link.icon}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
}
