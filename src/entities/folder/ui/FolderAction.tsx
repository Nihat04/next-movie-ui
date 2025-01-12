'use client';

import React, { useState } from 'react';

import { FolderType } from '../model';

import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

export function FolderAction({
    folder,
    action,
    success = false,
    className = '',
}: {
    folder: FolderType;
    action: (folder: FolderType) => Promise<boolean>;
    success?: boolean;
    className?: string;
}) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(success);

    const click = async () => {
        try {
            setIsLoading(true);
            const actionResult = await action(folder);
            setIsLoading(false);

            if (actionResult) setIsSuccess(!isSuccess);
        } catch {
            setIsLoading(false);
        }
    };

    const getBtnContent = () => {
        if (isLoading) {
            return <span className="loading loading-spinner"></span>;
        }

        if (isSuccess) {
            return <CheckRoundedIcon />;
        }

        return <AddRoundedIcon />;
    };

    return (
        <div
            className={`flex justify-between items-center w-full ${className}`}
        >
            <p className="text-lg font-medium">{folder.name}</p>
            <button
                className={`btn btn-circle ${isSuccess && 'btn-success'}`}
                onClick={click}
            >
                {getBtnContent()}
            </button>
        </div>
    );
}
