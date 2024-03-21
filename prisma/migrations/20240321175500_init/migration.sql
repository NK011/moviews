-- CreateTable
CREATE TABLE "movies" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "release_date" DATE NOT NULL,
    "average_rating" DECIMAL(3,2),

    CONSTRAINT "movies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" SERIAL NOT NULL,
    "movie_id" INTEGER NOT NULL,
    "reviewer_name" VARCHAR(255),
    "rating" DECIMAL(3,2) NOT NULL,
    "review_comments" TEXT,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "movie_id" ON "reviews"("movie_id");

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_ibfk_1" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
