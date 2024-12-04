import { getArtWorks } from "@/entities/artWork";
import MoviesGrid from "@/shared/ui/MoviesGrid/MoviesGrid";

export default async function Home() {
    const movies = await getArtWorks()

    return (
        <>
            <main className="px-7">
                <section>
                    <MoviesGrid movies={movies} />
                </section>
            </main>
        </>
    );
}
