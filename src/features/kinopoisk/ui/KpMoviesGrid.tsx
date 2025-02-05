import React from 'react';

import { KpMovieToArtWork } from '@/shared/DTO';
import { Grid, VerticalPoster } from '@/shared/ui/Grid';
import { KpMovie } from '../model';

export function KpMoviesGrid({ movies }: { movies: KpMovie[] }) {
    return (
        <div className="mb-20">
            <Grid>
                {movies.map((movie) => {
                    const artWork = KpMovieToArtWork(movie);
                    return (
                        <VerticalPoster
                            key={artWork.id}
                            href={`/movie/${artWork.id}`}
                            name={artWork.name}
                            cover={artWork.cover}
                        />
                    );
                })}
            </Grid>
        </div>
    );
}
