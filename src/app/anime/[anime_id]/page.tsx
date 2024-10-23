"use client"
import { useEffect, useState } from "react";
import DisplaySingle from "@/components/anime/displaySingle";
import { getSingleAnime } from "@/lib/api"; // Import the API function
import { AnimeAPI } from "@/lib/types";

export default function SingleAnime({ params }: { params: { anime_id: string } }) {
    const anime_id = params.anime_id;
    const [anime, setAnime] = useState<AnimeAPI>(); // State to store the fetched anime data
    const [loading, setLoading] = useState<boolean>(true); // State for loading status
    const [error, setError] = useState<string>(""); // State for error handling

    useEffect(() => {
        const fetchAnime = async () => {
            try {
                const response = await getSingleAnime(anime_id); // Fetch single anime data by ID
                setAnime(response.data); // Store the fetched anime data
                setLoading(false); // Set loading to false once data is fetched
            } catch (err) {
                setError("Failed to fetch anime.");
                setLoading(false);
            }
        };

        fetchAnime();
    }, [anime_id]); // Re-fetch if anime_id changes

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    if (anime) {
        return (
            <div>
                <DisplaySingle anime={anime} />
            </div>
        );
    }

    return <p>Anime not found.</p>; // If no anime data found
}
