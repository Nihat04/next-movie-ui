import SmallFolder from "@/entities/folder/ui/SmallFolder";
import React from "react";

const testFolders = [
    { name: "НН" },
    { name: "Новый год" },
    { name: "Мультики" },
    { name: "Комедия" },
    { name: "Ностальгия" },
    { name: "Ностальгия" },
    { name: "Ностальгия" },
    { name: "Ностальгия" },
    { name: "Ностальгия" },
    { name: "Ностальгия" },
    { name: "Ностальгия" },
    { name: "Ностальгия" },
    { name: "Ностальгия" },
    { name: "Ностальгия" },
    { name: "Ностальгия" },
    { name: "Ностальгия" },
    { name: "Ностальгия" },
    { name: "Ностальгия" },
    { name: "Ностальгия" },
];

export default function FoldersPage() {
    return (
        <main>
            <section>
                <div className="">
                    <ul className="grid gap-5 list-none grid-cols-1 xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                        {testFolders.map((folder, index) => (
                            <li key={index} className="">
                                <SmallFolder name={folder.name} />
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </main>
    );
}
