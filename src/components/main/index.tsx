"use client";
import { getCharactersNameAsc, getHighestRatedAnime, getMostPopularAnime } from "@/lib/api";
import { AnimeAPI, CharacterAPI } from "@/lib/types";
import { useEffect, useState } from "react";
import Loading from "@/components/loading";
import Error from "@/components/error";
import AnimeCard from "@/components/anime/card";
import CharacterCard from "@/components/characters/card";
import Link from "next/link";

export default function MainComponent() {
    const [highest_rated_anime, setHighestRatedAnime] = useState<AnimeAPI[]>([]);
    const [popular_anime, setPopularAnime] = useState<AnimeAPI[]>([]);
    const [characters, setCharacters] = useState<CharacterAPI[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const highest_response = await getHighestRatedAnime();
                const popular_response = await getMostPopularAnime();
                const characters_response = await getCharactersNameAsc();
                setHighestRatedAnime(highest_response.data);
                setPopularAnime(popular_response.data);
                setCharacters(characters_response.data);
            } catch (error) {
                setError("Failed to load main page data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Loading and Error States
    if (loading) return <Loading />;
    if (error) return <Error error={error} />;

    return (
        <div className="container mx-auto p-6 space-y-12">
            {/* Highest Rated Anime */}
            <section>
                <Link href="/anime" className="text-2xl font-anton text-orange-400 hover:underline">
                    Highest Rated Anime:
                </Link>
                <div className="flex gap-4 overflow-x-auto overflow-y-hidden snap-x snap-mandatory py-4">
                    {highest_rated_anime.map((anime) => (
                        <div
                            key={anime.id}
                            className="flex-shrink-0 snap-center scroll-smooth lg:snap-align-none w-[240px] md:w-[300px]"
                        >
                            <AnimeCard key={anime.id} anime={anime} />
                        </div>
                    ))}
                </div>
            </section>

            {/* Popular Anime */}
            <section>
                <Link href="/anime" className="text-2xl font-anton text-orange-400 hover:underline">
                    Popular Anime:
                </Link>
                <div className="flex gap-4 overflow-x-auto overflow-y-hidden snap-x snap-mandatory py-4">
                    {popular_anime.map((anime) => (
                        <div
                            key={anime.id}
                            className="flex-shrink-0 snap-center scroll-smooth lg:snap-align-none w-[240px] md:w-[300px]"
                        >
                            <AnimeCard key={anime.id} anime={anime} />
                        </div>
                    ))}
                </div>
            </section>

            {/* Characters Ascending */}
            <section>
                <Link href="/characters" className="text-2xl font-anton text-orange-400 hover:underline">
                    Characters (Last Name Ascending):
                </Link>
                <div className="flex gap-4 overflow-x-auto overflow-y-hidden snap-x snap-mandatory py-4">
                    {characters.map((character) => (
                        <div
                            key={character.id}
                            className="flex-shrink-0 snap-center scroll-smooth lg:snap-align-none w-[240px] md:w-[300px]"
                        >
                            <CharacterCard key={character.id} character={character} />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
