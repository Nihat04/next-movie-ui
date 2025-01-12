import { ArtWork } from '@/entities/artWork';
import { FolderItemArt } from '@/entities/folder';

export function ArtWorkToFolderArt(artWork: ArtWork) {
    return artWork as FolderItemArt;
}
