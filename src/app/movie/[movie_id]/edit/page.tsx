"use client";
import AddEditMovie from "@/components/Forms/AddEditMovie";
import { trpc } from "@/server/client";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";

type Args = {
    movieName: string;
    releaseDate: string;
};

type updateMovieInputSchema = {
    id: number;
    movieName: string;
    releaseDate: string;
};

function EditMovie({ params }: { params: { movie_id: string } }) {
    const router = useRouter();
    const [movie, setMovie] = useState<updateMovieInputSchema>();
    const updateMovie = trpc.movies.updateMovie.useMutation();
    const { data } = trpc.movies.getMovie.useQuery({
        id: parseInt(params.movie_id),
    });

    const handleSubmit = async (
        event: FormEvent,
        movieName: string,
        releaseDate: string
    ) => {
        event.preventDefault();
        try {
            const res = await updateMovie.mutate({
                id: parseInt(params.movie_id),
                name: movieName,
                releaseDate: releaseDate,
            });
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        setMovie({
            id: data?.id || 0,
            movieName: data?.name || "",
            releaseDate: data?.release_date || "",
        });
    }, [data]);
    return <AddEditMovie handleSubmit={handleSubmit} movie={movie} />;
}

export default EditMovie;
