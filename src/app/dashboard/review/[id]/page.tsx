"use client"
import Loading from "@/components/loading";
import Error from "@/components/error";
import WriteReview from "@/components/review/writeReview";
import { getSingleAnime } from "@/lib/api";
import { AnimeAPI } from "@/lib/types";
import { useEffect, useState } from "react";

export default function Review({ params }: { params: { id: string } }) {
    const anime_id = params.id;
    const [anime, setAnime] = useState<AnimeAPI>()
    const [loading, setLoading] = useState<boolean>(true); // State for loading status
    const [error, setError] = useState<string>(""); // State for error handling

    useEffect(() => {
        const fetchAnime = async () => {
            try {
                const anime_response = await getSingleAnime(anime_id)
                setAnime(anime_response.data)
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch anime.");
                setLoading(false);
            }
        }
        fetchAnime();
    }, [anime_id])

    if (loading) return <Loading />;
    if (error) return <Error error={error} />;

    if (anime) {
        return (
            <div>
                <WriteReview anime={anime} />
            </div>
        );
    }

    return <p>Anime not found.</p>;
}
