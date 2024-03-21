import { trpc } from "@/server/client";
import { TrashIcon } from "@heroicons/react/24/solid";
import React from "react";

interface props {
    id: number;
    rating: string;
    reviewer: string;
    comments: string;
}
function Review({ id, rating, reviewer, comments }: props) {
    const deleteReview = trpc.reviews.deleteReview.useMutation();
    return (
        <li className="py-3 px-5 bg-amber-200 min-w-64">
            <p>{comments}</p>
            <div className="flex justify-between">
                <p>
                    Ratings: <b>{rating}</b>
                </p>
                <p>
                    By: <i>{reviewer}</i>
                </p>
            </div>
            <div className="mt-2 flex justify-end">
                <button onClick={() => deleteReview.mutate({ id })}>
                    <TrashIcon height={16} className="m-1" />
                </button>
            </div>
        </li>
    );
}

export default Review;
