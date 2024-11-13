"use client"
import Loading from "@/components/loading";
import Error from "@/components/error";
import WriteReviewList from "@/components/review/writeReviewList";
import { getAllAnime } from "@/lib/api";
import { AnimeAPI } from "@/lib/types";
import { useEffect, useState } from "react";

export default function Review() {
    const [anime, setAnime] = useState<AnimeAPI[]>()
    const [loading, setLoading] = useState<boolean>(true); // State for loading status
    const [error, setError] = useState<string>(""); // State for error handling

    useEffect(() => {
        const fetchAnime = async () => {
            try {
                const anime_response = await getAllAnime()
                setAnime(anime_response.data)
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch anime.");
                setLoading(false);
            }
        }
        fetchAnime();
    }, [])

    if (loading) return <Loading />;
    if (error) return <Error error={error} />;

    if (anime) {
        return (
            <div>
                <WriteReviewList anime={anime} />
            </div>
        );
    }

    return <p>Anime not found.</p>;
}