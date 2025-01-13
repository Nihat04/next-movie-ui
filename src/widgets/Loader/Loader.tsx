import React from 'react';

export default function Loader() {
    return (
        <div className="flex-col gap-4 w-full flex items-center justify-center">
            <span className="loading loading-spinner loading-xs size-10" />
        </div>
    );
}
