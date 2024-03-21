"use client";
import { trpc } from "@/server/client";
import React, { FormEvent, useEffect, useRef, useState } from "react";

function ReviewForm() {
    const moviesList = trpc.movies.getMovies.useQuery().data;
    const [selectedMovie, setSelectedMovie] = useState<number | undefined>(
        undefined
    );
    const userName = useRef<HTMLInputElement>(null);
    const rating = useRef<HTMLInputElement>(null);
    const userComments = useRef<HTMLInputElement>(null);
    const [error, setError] = useState();
    const createReview = trpc.reviews.addMovieReview.useMutation();
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            const userRating = parseInt(rating.current?.value || "0");
            const res = await createReview.mutate({
                movieId: selectedMovie ? selectedMovie : 0,
                rating: isNaN(userRating) ? 0 : userRating,
                reviewComments: userComments.current?.value || "",
                reviewerName: userName.current?.value || "",
            });
            console.log(res);
        } catch (err) {
            console.log(error);
        }
    };

    return (
        <div className="h-screen flex justify-center items-center bg-slate-100 font-sans text-base">
            <form className="h-fit border-2 border-blue-300 p-5 px-8">
                <h2 className="text-lg">Add new review</h2>
                <select
                    className="px-2 py-1 w-full my-2"
                    defaultValue={0}
                    onChange={(e) => setSelectedMovie(parseInt(e.target.value))}
                >
                    <option disabled value={0}>Select movie</option>
                    {moviesList?.map((movie, id) => (
                        <option key={id} value={movie.id}>{movie.name}</option>
                    ))}
                </select>
                <div className="my-5 w-full">
                    <input
                        type="name"
                        placeholder="Enter your Name"
                        ref={userName}
                        className="px-2 py-1"
                        required
                    />
                </div>
                <div className="my-5 w-full">
                    <input
                        type="number"
                        max={10}
                        min={0}
                        placeholder="Enter raing"
                        required
                        ref={rating}
                        className="px-2 py-1"
                    />
                </div>
                <div className="my-5 w-full">
                    <input
                        type="text"
                        placeholder="Enter comments"
                        required
                        ref={userComments}
                        className="px-2 py-1"
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        className="bg-white border-2 border-blue-400 px-5 py-1 mr-0"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ReviewForm;
