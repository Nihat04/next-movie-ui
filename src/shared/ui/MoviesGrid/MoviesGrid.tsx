import Link from "next/link";
import { ArtWork } from "@/entities/artWork";

function MoviesGrid({ movies }: { movies: ArtWork[] }) {
    return (
        <div>
            <ul className="grid gap-[30px] list-none grid-cols-1 xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                {movies.map((movie) => (
                    <li
                        key={movie.id}
                        className="relative p-[15px] aspect-[16/9] bg-cover bg-center-bottom rounded-[5px] cursor-pointer transition-all duration-100 ease-linear hover:scale-110 hover:shadow-[0_0_200px_rgba(5,9,70,0.7)] hover:z-[10]"
                        style={{
                            backgroundImage: movie.cover
                                ? `url(${movie.cover})`
                                : "none",
                        }}
                    >
                        <Link
                            href={`/mov/${movie.id}`}
                            className="block w-full h-full"
                        >
                            <p className="absolute left-1/2 bottom-[10px] px-[10px] text-center text-white font-semibold text-[15px] bg-[rgba(0,0,0,0.6)] rounded-[15px] transform -translate-x-1/2">
                                {movie.name}
                            </p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MoviesGrid;
