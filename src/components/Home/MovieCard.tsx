import React from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { trpc } from "@/server/client";

type Props = {
    id: number;
    title: string;
    date: string;
    rating: number;
};
function MovieCard({ id, title, date, rating }: Props) {
    const getMovies = trpc.movies.getMovies.useQuery();
    const deleteMovie = trpc.movies.deleteMovie.useMutation({
        onSettled: () => {
            getMovies.refetch();
        },
    });
    return (
        <Link href={`/movie/${id}/reviews`}>
        <div className="flex-column justify-between p-3 min-w-80 h-fit bg-cyan-200 font-sans">
            <h3 className="text-base mt-1 mb-1">{title}</h3>
            <p className="text-sm mt-2 italic">Released Date : {date.slice(0, 10)}</p>
            <p className="text-sm mt-2 font-semibold">Rating: {rating}</p>
            <div className="flex justify-end">
                <Link href={`/movie/${id}/edit`}>
                    <PencilIcon height={16} className="m-1" />
                </Link>
                <button onClick={() => deleteMovie.mutate({ id })}>
                    <TrashIcon height={16} className="m-1" />
                </button>
            </div>
        </div>
        </Link>
    );
}

export default MovieCard;
