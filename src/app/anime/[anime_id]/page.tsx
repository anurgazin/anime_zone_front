"use client"
import { useEffect, useState } from "react";
import DisplaySingle from "@/components/anime/displaySingle";
import { getAllComments, getSingleAnime } from "@/lib/api"; // Import the API function
import { AnimeAPI, Comment } from "@/lib/types";

export default function SingleAnime({ params }: { params: { anime_id: string } }) {
    const anime_id = params.anime_id;
    const [anime, setAnime] = useState<AnimeAPI>(); // State to store the fetched anime data
    const [comments, setComments] = useState<Comment[]>()
    const [loading, setLoading] = useState<boolean>(true); // State for loading status
    const [error, setError] = useState<string>(""); // State for error handling

    useEffect(() => {
        const fetchAnime = async () => {
            try {
                const anime_response = await getSingleAnime(anime_id);
                const comment_response = await getAllComments("anime", anime_id);
                setAnime(anime_response.data);
                setComments(comment_response.data);
                setLoading(false);
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
                <DisplaySingle anime={anime} comments={comments} />
            </div>
        );
    }

    return <p>Anime not found.</p>;
}
