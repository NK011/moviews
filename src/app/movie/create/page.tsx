"use client";
import AddEditMovie from "@/components/Forms/AddEditMovie";
import { trpc } from "@/server/client";
import React, { FormEvent, useRef, useState } from "react";
type Args = {
    movieName: string;
    releaseDate: string;
};
function MovieForm() {
    const createMovie = trpc.movies.addMovie.useMutation();
    const handleSubmit = async (
        event: FormEvent,
        movieName: string,
        releaseDate: string
    ) => {
        event.preventDefault();

        try {
            const res = await createMovie.mutate({
                name: movieName,
                releaseDate: releaseDate,
            });
        } catch (err) {
            console.log(err);
        }
    };
    return <AddEditMovie handleSubmit={handleSubmit} />;
}

export default MovieForm;
