"use client"
import { useEffect, useState } from "react";
import DisplaySingle from "@/components/anime/displaySingle";
import { getAllAnimeListsByAnimeId, getAllCharactersFromAnime, getAllComments, getAnimeRating, getSingleAnime } from "@/lib/api"; // Import the API function
import { AnimeAPI, AnimeList, CharacterAPI, Comment, Rating } from "@/lib/types";
import Loading from "@/components/loading";
import Error from "@/components/error";

export default function SingleAnime({ params }: { params: { anime_id: string } }) {
    const anime_id = params.anime_id;
    const [anime, setAnime] = useState<AnimeAPI>(); // State to store the fetched anime data
    const [comments, setComments] = useState<Comment[]>()
    const [rating, setRating] = useState<Rating[]>()
    const [animeLists, setAnimeLists] = useState<AnimeList[]>()
    const [characters, setCharacters] = useState<CharacterAPI[]>();
    const [loading, setLoading] = useState<boolean>(true); // State for loading status
    const [error, setError] = useState<string>(""); // State for error handling

    useEffect(() => {
        const fetchAnime = async () => {
            try {
                const anime_response = await getSingleAnime(anime_id);
                const comment_response = await getAllComments("anime", anime_id);
                const rating_response = await getAnimeRating(anime_id);
                const anime_list_response = await getAllAnimeListsByAnimeId(anime_id);
                const characters_response = await getAllCharactersFromAnime(anime_id);
                setAnime(anime_response.data);
                setComments(comment_response.data);
                setRating(rating_response.data);
                setAnimeLists(anime_list_response.data);
                setCharacters(characters_response.data)
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch anime.");
                setLoading(false);
            }
        };

        fetchAnime();
    }, [anime_id]); // Re-fetch if anime_id changes

    if (loading) return <Loading />;
    if (error) return <Error error={error} />;

    if (anime) {
        return (
            <div>
                <DisplaySingle anime={anime} comments={comments} rating={rating} animeList={animeLists} characters={characters} />
            </div>
        );
    }

    return <p>Anime not found.</p>;
}
