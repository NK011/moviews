"use client";
import { trpc } from "@/server/client";
import React, { FormEvent, useEffect, useRef, useState } from "react";

type updateMovieInputSchema = {
    id: number;
    movieName: string;
    releaseDate: string;
};

type Props = {
    handleSubmit: Function;
    movie?: updateMovieInputSchema;
};

function AddEditMovie({
    handleSubmit,
    movie = {
        id: -1,
        movieName: "",
        releaseDate: "",
    },
}: Props) {
    const movieName = useRef<HTMLInputElement>(null);
    const releaseDate = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (movie.id > -1) {
            if (movieName.current) {
                movieName.current.value = movie.movieName;
            }
            if (releaseDate.current) {
                if (movie.releaseDate === "") {
                    releaseDate.current.value = movie.releaseDate;
                } else {
                    const date = new Date(movie.releaseDate);
                    const formattedDatetime = date.toISOString().slice(0, 16);
                    releaseDate.current.value = formattedDatetime;
                }
            }
        }
    }, [movie]);


    return (
        <div className="h-full flex justify-center items-center bg-slate-100 font-sans text-base">
            <form className="h-fit border-2 border-blue-300 p-5 px-8">
                <h2 className="text-lg">{movie.id > -1 ? "Edit" : "Add"} movie</h2>
                <div className="flex-column my-5">
                    <input
                        type="text"
                        placeholder="Enter Movie Name"
                        ref={movieName}
                        className="px-2 py-1"
                        required
                    />
                </div>
                <div className="flex-column my-5">
                    <input
                        type="datetime-local"
                        placeholder="Enter release date"
                        required
                        ref={releaseDate}
                        className="px-2 py-1"
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        className="bg-white border-2 border-blue-400 px-5 py-1 mr-0"
                        type="submit"
                        onClick={(e) =>
                            handleSubmit(
                                e,
                                movieName.current?.value,
                                releaseDate.current?.value
                            )
                        }
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddEditMovie;
