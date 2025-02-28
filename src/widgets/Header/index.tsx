import Link from 'next/link';
import React, { ReactElement } from 'react';

import LocalMoviesRoundedIcon from '@mui/icons-material/LocalMoviesRounded';
import FolderIcon from '@mui/icons-material/Folder';
import BackButton from './ui/BackButton';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

type Link = {
    label: string;
    path: string;
    icon: ReactElement;
};

const NAV_LINKS: Link[] = [
    { label: 'Кинопоиск', path: '/kp', icon: <LocalMoviesRoundedIcon /> },
    { label: 'Папки', path: '/folder', icon: <FolderIcon /> },
    { label: 'Профиль', path: '/profile', icon: <PersonRoundedIcon /> },
];

export default function Header() {
    return (
        <header className="sm:sticky top-2 m-2 mb-5 z-50">
            <div className="navbar bg-slate-200 dark:bg-base-100 p-2 rounded-2xl">
                <BackButton />
                <div className="flex-1">
                    <Link
                        href="/"
                        className="btn btn-ghost text-xl self-center"
                    >
                        Kino Next
                    </Link>
                </div>
                <nav className="fixed w-screen bottom-0 left-1/2 -translate-x-1/2 sm:static sm:w-auto sm:translate-x-0 flex-none z-40">
                    <ul className="menu w-full menu-horizontal bg-base-200 sm:rounded-box justify-between">
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
