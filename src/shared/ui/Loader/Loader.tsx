import React from "react";

export default function Loader() {
    return (
        <div className="flex-col gap-4 w-full flex items-center justify-center">
            <div className="w-28 h-28 border-8 text-4xl animate-spin border-[#9EA5B2] flex items-center justify-center border-t-[#555c64] rounded-full"></div>
        </div>
    );
}
