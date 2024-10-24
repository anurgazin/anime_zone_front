"use client"
import { useEffect, useState } from "react";
import DisplaySingle from "@/components/characters/displaySingle";
import { getSingleCharacter } from "@/lib/api";
import { CharacterAPI } from "@/lib/types";

export default function SingleCharacter({ params }: { params: { character_id: string } }) {
    const character_id = params.character_id;
    const [character, setCharacter] = useState<CharacterAPI>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const response = await getSingleCharacter(character_id); // Fetch single character data by ID
                setCharacter(response.data); // Store the fetched anime data
                setLoading(false); // Set loading to false once data is fetched
            } catch (err) {
                setError("Failed to fetch character.");
                setLoading(false);
            }
        };

        fetchCharacter();
    }, [character_id]); // Re-fetch if character_id changes

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    if (character) {
        return (
            <div>
                <DisplaySingle character={character} />
            </div>
        );
    }

    return <p>Character not found.</p>; // If no character data found
}
