import { router } from "./trpc";
import { moviesRouter } from "./routers/movies";
import { reviewsRouter } from "./routers/reviews";

export const appRouter = router({
    movies: moviesRouter,
    reviews: reviewsRouter
});

export type AppRouter = typeof appRouter;
