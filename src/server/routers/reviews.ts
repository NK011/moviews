import prisma from "@/lib/prisma";
import { procedure, router } from "../trpc";
import { z } from "zod";
import updateAverageRating from "../utilities/calculateAvgRating";

// utils
const createMoviewReviewSchema = z.object({
    movieId: z.number(),
    reviewerName: z.string().nullable(),
    rating: z.number(),
    reviewComments: z.string(),
});

const updateMoviewReviewSchema = z.object({
    id: z.number(),
    reviewerName: z.string().optional(),
    rating: z.number().optional(),
    reviewComments: z.string().optional(),
});

// routes
export const reviewsRouter = router({
    getMovieReviews: procedure
        .input(
            z.object({
                movie_id: z.number(),
            })
        )
        .query(
            async ({ input }) =>
                await prisma.reviews.findMany({
                    where: {
                        movie_id: input.movie_id,
                    },
                })
        ),
    addMovieReview: procedure
        .input(createMoviewReviewSchema)
        .mutation(async ({ input }) => {
            const newReview = await prisma.reviews.create({
                data: {
                    movie_id: input.movieId,
                    reviewer_name: input.reviewerName,
                    rating: input.rating,
                    review_comments: input.reviewComments,
                },
            });
            updateAverageRating(newReview.movie_id);
            return true;
        }),
    updateReview: procedure
        .input(updateMoviewReviewSchema)
        .mutation(async ({ input }) => {
            const { id, ...data } = input;
            const updatedReivew = await prisma.reviews.update({
                where: { id },
                data,
            });
            updateAverageRating(updatedReivew.movie_id);
            return updatedReivew;
        }),
    deleteReview: procedure
        .input(
            z.object({
                id: z.number(),
            })
        )
        .mutation(async ({ input }) => {
            const deletedReview = await prisma.reviews.delete({
                where: { id: input.id },
            });
            updateAverageRating(deletedReview.movie_id);
            return true;
        }),
});
