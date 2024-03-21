import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "../components/trpcProvider";
import Header from "@/components/Home/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Moviews",
    description: "Moviews for all movies",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} h-screen`}>
                <Provider>
                    <div className="h-full">
                        <Header />
                        {children}
                    </div>
                </Provider>
            </body>
        </html>
    );
}
