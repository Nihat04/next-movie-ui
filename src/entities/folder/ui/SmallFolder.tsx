import React from "react";

import FolderIcon from "@/shared/assets/svg/FolderIcon";
import { Folder } from "../model/types";
import Link from "next/link";

export default function SmallFolder({ folder }: { folder: Folder }) {
    return (
        <Link href={`/folder/${folder.id}`}>
            <div className="p-5 bg-white/[.06] rounded-lg">
                <div className="h-20 w-full flex justify-center">
                    <FolderIcon />
                </div>
                <p className="font-bold text-center">{folder.name}</p>
            </div>
        </Link>
    );
}
