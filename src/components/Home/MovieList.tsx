"use client";
import { trpc } from "@/server/client";
import React from "react";
import MovieCard from "./MovieCard";

type movie = {
    id: number;
    name: string;
    release_date: string;
    average_rating: string | null;
}

function MovieList() {
    const { data } = trpc.movies.getMovies.useQuery();
    return (
        <div className="mx-8 p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.map((movie : movie, id: number) => (
                <MovieCard
                    key={id}
                    id={movie.id}
                    title={movie.name}
                    date={movie.release_date}
                    rating={
                        movie.average_rating
                            ? parseInt(movie.average_rating)
                            : 0
                    }
                />
            ))}
        </div>
    );
}

export default MovieList;
