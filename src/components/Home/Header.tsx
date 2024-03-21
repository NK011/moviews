import Link from "next/link";
import React from "react";

function Header() {
    return (
        <div className="flex justify-between items-center p-5 bg-cyan-300">
            <Link href={"/"}>
            
            <h1 className="grow-0 font-mono font-bold text-xl">Moviews</h1>
            </Link>
            <div className="flex justify-between grow max-w-72">
                <Link href={"/movie/create"}>
                    <button className="px-4 py-1 bg-white border-2 border-blue-400 text-blue-400 font-semibold hover:bg-blue-400 hover:text-white">
                        Add Moview
                    </button>
                </Link>
                <Link href={"/review/create"}>
                    <button className="px-4 py-1 bg-blue-400 border-2 border-white text-white font-semibold hover:bg-white hover:text-blue-400">
                        Add Review
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Header;
