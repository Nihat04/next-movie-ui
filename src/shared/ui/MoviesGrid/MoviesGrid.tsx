import styles from "./MoviesGrid.module.css";
import Link from "next/link";
import { ArtWork } from "@/entities/artWork";

function MoviesGrid({ movies }: { movies: ArtWork[] }) {
    return (
        <div>
            <ul className={styles["list"]}>
                {movies.map((movie) => (
                    <li
                        key={movie.id}
                        className={styles["item"]}
                        style={{ backgroundImage: `url(${movie.cover})` }}
                    >
                        <Link href={`/mov/${movie.id}`}>
                            <p className={styles["name"]}>{movie.name}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MoviesGrid;
