import Link from 'next/link';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { FolderItemType } from '../model';

export function FolderItemsGrid({
    folderItem,
    menu,
}: {
    folderItem: FolderItemType[];
    menu?: (artWork: FolderItemType) => void;
}) {
    return (
        <div>
            <ul className="grid gap-[30px] list-none xl:grid-cols-10 lg:grid-cols-6 md:grid-cols-4 grid-cols-2">
                {folderItem.map((movie) => (
                    <li key={movie.id} className="relative cursor-pointer">
                        {menu && (
                            <div className="absolute top-2 right-2">
                                <button
                                    className="btn btn-circle w-6"
                                    onClick={() => menu(movie)}
                                >
                                    <MoreHorizIcon />
                                </button>
                            </div>
                        )}
                        <Link
                            href={`/movie/${movie.id}`}
                            className="btn p-0 block w-full h-full"
                        >
                            <div
                                className="aspect-[440/647] bg-cover bg-no-repeat bg-center-bottom rounded-[5px]"
                                style={{
                                    backgroundImage: movie.artWork.cover
                                        ? `url(${movie.artWork.cover})`
                                        : `url(/assets/img/not-found-light.png)`,
                                }}
                            >
                                <p className="absolute left-1/2 bottom-[10px] px-2 text-center text-white font-semibold text-[15px] line-clamp-2 bg-[rgba(0,0,0,0.6)] rounded-[15px] transform -translate-x-1/2">
                                    {movie.artWork.name}
                                </p>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
