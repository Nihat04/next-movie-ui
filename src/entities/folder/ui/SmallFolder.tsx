import React from 'react';

import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import { FolderType } from '../model/types';
import Link from 'next/link';

export function SmallFolder({ folder }: { folder: FolderType }) {
    return (
        <Link href={`/folder/${folder.id}`}>
            <div className="btn w-full h-full p-5 bg-base-300 rounded-lg shadow-xl">
                <div className=" w-full h-20 flex justify-center">
                    <FolderOutlinedIcon
                        sx={{ width: '100%', height: '100%' }}
                    />
                </div>
                <p className="font-bold text-center text-xl">{folder.name}</p>
            </div>
        </Link>
    );
}
