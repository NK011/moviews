// Assume you have a Prisma model for Movie and Review
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Function to calculate the average rating of a movie
const calculateAverageRating = async (movieId: number): Promise<number | null> => {
  const reviews = await prisma.reviews.findMany({
    where: { movie_id: movieId },
  });

  if (reviews.length === 0) {
    return null; // No reviews, return null
  }

  const totalRating = reviews.reduce((acc, review) => acc + Number(review.rating), 0);
  const averageRating = totalRating / reviews.length;
  return averageRating;
};

// Function to update the average rating of a movie
const updateAverageRating = async (movieId: number): Promise<void> => {
  const averageRating = await calculateAverageRating(movieId);
  await prisma.movies.update({
    where: { id: movieId },
    data: { average_rating: averageRating },
  });
};

export default updateAverageRating

// Example usage:
// Call this function whenever a new review is submitted or deleted for a movie
// updateAverageRating(movieId);
