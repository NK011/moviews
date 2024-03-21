"use client";

import MovieList from "@/components/Home/MovieList";
import { trpc } from "..//server/client";
import Image from "next/image";
import Header from "@/components/Home/Header";
import SearchBar from "@/components/Home/SearchBar";
import { Suspense } from "react";
import Loading from "./loading";

export default function Home() {
    const data = trpc.movies.getMovies.useQuery();
    return (
        <div className="flex-column justify-between">
            <SearchBar />
            <Suspense fallback={<Loading />}>
                <MovieList />
            </Suspense>
        </div>
    );
}
