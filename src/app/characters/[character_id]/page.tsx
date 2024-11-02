"use client"
import { useEffect, useState } from "react";
import DisplaySingle from "@/components/characters/displaySingle";
import { getAllCharacterListsByCharacterId, getAllComments, getSingleCharacter } from "@/lib/api";
import { CharacterAPI, CharacterList, Comment } from "@/lib/types";
import Loading from "@/components/loading";
import Error from "@/components/error";

export default function SingleCharacter({ params }: { params: { character_id: string } }) {
    const character_id = params.character_id;
    const [character, setCharacter] = useState<CharacterAPI>();
    const [comments, setComments] = useState<Comment[]>();
    const [lists, setLists] = useState<CharacterList[]>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const character_response = await getSingleCharacter(character_id); // Fetch single character data by ID
                const comment_response = await getAllComments("character", character_id)
                const list_response = await getAllCharacterListsByCharacterId(character_id)
                setCharacter(character_response.data);
                setComments(comment_response.data);
                setLists(list_response.data)
                setLoading(false); // Set loading to false once data is fetched
            } catch (err) {
                setError("Failed to fetch character.");
                setLoading(false);
            }
        };

        fetchCharacter();
    }, [character_id]); // Re-fetch if character_id changes

    if (loading) return <Loading />;
    if (error) return <Error error={error} />;

    if (character) {
        return (
            <div>
                <DisplaySingle character={character} comments={comments} lists={lists} />
            </div>
        );
    }

    return <p>Character not found.</p>; // If no character data found
}
