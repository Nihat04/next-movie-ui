import Link from "next/link";
import { ArtWork } from "@/entities/artWork";

export function VertcalGrid({ movies }: { movies: ArtWork[] }) {
    return (
        <div>
            <ul className="grid gap-[30px] list-none xl:grid-cols-10 lg:grid-cols-6 md:grid-cols-4 grid-cols-2">
                {movies.map((movie) => (
                    <li
                        key={movie.id}
                        className="relative p-[15px] aspect-[440/647] bg-cover bg-center-bottom rounded-[5px] cursor-pointer transition-all duration-100 ease-linear hover:scale-110 hover:z-[10]"
                        style={{
                            backgroundImage: movie.cover
                                ? `url(${movie.cover})`
                                : "none",
                        }}
                    >
                        <Link
                            href={`/movie/${movie.id}`}
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
