"use client";

import Review from "@/components/Reviews/Review";
import { trpc } from "@/server/client";
import React, { Suspense } from "react";

type review = {
    id: number;
    movie_id: number;
    rating: string;
    reviewer_name: string | null;
    review_comments: string | null;
};

function MovieReviews({ params }: { params: { movie_id: string } }) {
    const movieData = trpc.movies.getMovie.useQuery({
        id: parseInt(params.movie_id),
    }).data;
    const movieReviews = trpc.reviews.getMovieReviews.useQuery({
        movie_id: parseInt(params.movie_id),
    }).data;

    return (
        <div>
            <Suspense fallback={<h2>Loadingggg............</h2>}>
                <div className="bg-gray-100 px-4 py-7 my-5">
                    <h2 className="font-sans font-bold text-xl">
                        {movieData?.name}
                    </h2>
                    <p>
                        <b>Release Date:</b>{" "}
                        {movieData?.release_date.slice(0, 10)}
                    </p>
                    <p>
                        Rating: <b>{movieData?.average_rating || "0"}</b>
                    </p>
                </div>
            </Suspense>
            <div className="px-4 py-7 my-5">
                <p className="pl-3 font-sans font-semibold text-lg">Reviews:</p>
                <ul className="px-4 grid grid-cols-3 gap-3">
                    <Suspense fallback={<p>Loadingggggg..........</p>}>
                        {movieReviews?.length
                            ? movieReviews?.map((review: review, key) => (
                                  <Review
                                      id={review.id}
                                      rating={review.rating}
                                      reviewer={review.reviewer_name || ""}
                                      comments={review.review_comments || ""}
                                      key={key}
                                  />
                              ))
                            : "No reviews found!!"}
                    </Suspense>
                </ul>
            </div>
        </div>
    );
}

export default MovieReviews;
