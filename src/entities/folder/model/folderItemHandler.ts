import { Folder } from "./types";
import { ArtWork } from "@/entities/artWork";
import serverApi from "@/shared/api/instances/server";

export const updateFolderItems = async (
    artWork: ArtWork,
    folder: Folder,
    action: "add" | "remove"
): Promise<boolean> => {
    "use client";
    const updatedItems =
        action === "add"
            ? [...(folder.items || []), { art: artWork, addDate: new Date() }]
            : folder.items?.filter((item) => item.art.id !== artWork.id) ||
              null;

    const newFolder: Folder = {
        ...folder,
        items: updatedItems,
    };

    try {
        await serverApi.put(`/api/folder/${folder.id}`, newFolder);
        return true;
    } catch {
        return false;
    }
};

export const addArtWorkToFolder = async (
    artWork: ArtWork,
    folder: Folder
): Promise<boolean> => {
    return updateFolderItems(artWork, folder, "add");
};

export const removeArtWorkFromFolder = async (
    artWork: ArtWork,
    folder: Folder
): Promise<boolean> => {
    return updateFolderItems(artWork, folder, "remove");
};
