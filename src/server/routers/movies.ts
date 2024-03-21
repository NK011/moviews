import { procedure, router } from "../trpc";
import { z } from "zod";
import prisma from "../../lib/prisma";

// utils
export const movieSchema = z.object({
    id: z.number(),
    name: z.string(),
    releaseDate: z.string(),
    averageRating: z.number().nullable(),
});

export const createMovieInputSchema = z.object({
    name: z.string(),
    releaseDate: z.string(),
});

export const updateMovieInputSchema = z.object({
    id: z.number(),
    name: z.string().optional(),
    releaseDate: z.string().optional(),
});

// routes
export const moviesRouter = router({
    getMovies: procedure.query(() => {
        return prisma.movies.findMany();
    }),
    getMovie: procedure
        .input(z.object({ id: z.number() }))
        .query(async ({ input }) =>
            prisma.movies.findUnique({ where: { id: input.id } })
        ),
    addMovie: procedure
        .input(createMovieInputSchema)
        .mutation(async ({ input }) => {
            return await prisma.movies.create({
                data: {
                    name: input.name,
                    release_date: new Date(input.releaseDate).toISOString(),
                },
            });
        }),
    updateMovie: procedure
        .input(updateMovieInputSchema)
        .mutation(async ({ input }) => {
            return prisma.movies.update({
                where: { id: input.id },
                data: {
                    name: input.name,
                    release_date: input?.releaseDate
                        ? new Date(input.releaseDate)
                        : undefined,
                },
            });
        }),
    deleteMovie: procedure
        .input(z.object({ id: z.number() }))
        .mutation(async ({ input }) => {
            await prisma.movies.delete({ where: { id: input.id } });
            return true;
        }),
});
