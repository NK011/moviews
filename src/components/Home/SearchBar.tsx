"use Client";
import React, { useEffect, useRef, useState } from "react";

function SearchBar() {
    // const searchMovie = useRef<HTMLInputElement>(null);
    const [searchMovie, setSearchMovie] = useState("");
    const [movieName, setMovieName] = useState<String>();
    const handleSearch = (value: unknown) => {
        console.log(value);
    };

    useEffect(() => {
        const handler = setTimeout(() => handleSearch(searchMovie), 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchMovie]);
    return (
        <div className="my-6 mx-11 border-2 border-black max-w-lg grow">
            <input
                className="px-4 py-3 w-full"
                type="text"
                placeholder="Search movie"
                autoComplete="true"
                // ref={searchMovie}
                value={searchMovie}
                onChange={(e) => setSearchMovie(e.target.value)}
            />
        </div>
    );
}

export default SearchBar;
