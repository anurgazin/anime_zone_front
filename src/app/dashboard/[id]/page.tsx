"use client"
import { useEffect, useState } from "react";
import { getAllAnimeListsByUserId, getAllCharacterListsByUserId, getAllCommentsByUser, getAnimeRatingByUser, getUser } from "@/lib/api"; // Import the API function
import { AnimeList, CharacterList, Comment, Rating, User } from "@/lib/types";
import Loading from "@/components/loading";
import Error from "@/components/error";
import DashboardUser from "@/components/user/dashboard";

export default function Dashboard({ params }: { params: { id: string } }) {
    const user_id = params.id;
    const [user, setUser] = useState<User>(); // State to store the fetched anime data
    const [comments, setComments] = useState<Comment[]>()
    const [rating, setRating] = useState<Rating[]>()
    const [animeLists, setAnimeLists] = useState<AnimeList[]>()
    const [characters, setCharacters] = useState<CharacterList[]>();
    const [loading, setLoading] = useState<boolean>(true); // State for loading status
    const [error, setError] = useState<string>(""); // State for error handling

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user_response = await getUser(user_id)
                const comment_response = await getAllCommentsByUser(user_id);
                const rating_response = await getAnimeRatingByUser(user_id);
                const anime_list_response = await getAllAnimeListsByUserId(user_id);
                const characters_response = await getAllCharacterListsByUserId(user_id);
                setUser(user_response.data);
                setComments(comment_response.data);
                setRating(rating_response.data);
                setAnimeLists(anime_list_response.data);
                setCharacters(characters_response.data)
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch user.");
                setLoading(false);
            }
        };

        fetchUser();
    }, [user_id]); // Re-fetch if anime_id changes

    if (loading) return <Loading />;
    if (error) return <Error error={error} />;

    if (user) {
        return (
            <div>
                <DashboardUser user={user} comments={comments} reviews={rating} anime_lists={animeLists} character_lists={characters} />
            </div>
        );
    }

    return <p>User not found.</p>;
}
