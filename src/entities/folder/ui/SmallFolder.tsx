import React from "react";

import FolderIcon from "@/shared/assets/svg/FolderIcon";
import { Folder } from "../model/types";
import Link from "next/link";

export default function SmallFolder({ name }: Folder) {
    return (
        <Link href={""}>
            <div className="p-5 bg-white/[.06] rounded-lg">
                <div className="h-20 w-full flex justify-center">
                    <FolderIcon />
                </div>
                <p className="font-bold text-center">{name}</p>
            </div>
        </Link>
    );
}
