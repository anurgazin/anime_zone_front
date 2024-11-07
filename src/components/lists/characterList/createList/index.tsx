"use client";

import { useState, FormEvent, useEffect } from "react";
import { CharacterAPI, PostListRequest } from "@/lib/types";
import { useRouter } from "next/navigation";
import { getAllCharacters, postCharacterList } from "@/lib/api";

export default function CreateCharacterListForm() {
    const [listTitle, setListTitle] = useState<string>("");
    const [selectedAnimeIds, setSelectedAnimeIds] = useState<string[]>([]);
    const [characters, setCharacters] = useState<CharacterAPI[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    // Fetch list of characters on component mount
    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await getAllCharacters(); // Fetches characters
                setCharacters(response.data);
            } catch (err) {
                setError("Failed to load characters");
            }
        };
        fetchCharacters();
    }, []);

    const handleCheckboxChange = (animeId: string) => {
        setSelectedAnimeIds((prev) =>
            prev.includes(animeId)
                ? prev.filter((id) => id !== animeId) // Remove if already selected
                : [...prev, animeId] // Add if not selected
        );
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        const formData: PostListRequest = {
            title: listTitle,
            content_list: selectedAnimeIds,
        };

        try {
            const response = await postCharacterList(formData);
            if (response.status === 201) {
                router.push("/dashboard"); // Redirect to dashboard
            } else {
                setError("Failed to create anime list");
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error)
            setError(error.response?.data?.error || "An error occurred while creating the list");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6">
            <h2 className="text-2xl font-semibold text-center text-gray-800">Create Character List</h2>

            <div className="flex flex-col space-y-2">
                <label htmlFor="listTitle" className="text-gray-700 font-medium">List Title:</label>
                <input
                    type="text"
                    id="listTitle"
                    value={listTitle}
                    onChange={(e) => setListTitle(e.target.value)}
                    required
                    className="p-3 border rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
                    placeholder="Enter a title for your list"
                />
            </div>

            <div className="flex flex-col space-y-2 h-[50vh] overflow-y-auto">
                <label className="text-xl text-gray-700 font-medium">Select Characters:</label>
                {characters.length > 0 ? (
                    characters.map((character) => (
                        <div key={character.id} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id={character.id}
                                value={character.id}
                                onChange={() => handleCheckboxChange(character.id)}
                                checked={selectedAnimeIds.includes(character.id)}
                                className="w-4 h-4 text-orange-500 focus:ring-2 focus:ring-orange-400 border-gray-300 rounded"
                            />
                            <label htmlFor={character.id} className="text-gray-700">{character.last_name} {character.first_name}</label>
                        </div>
                    ))
                ) : (
                    <p>Loading characters list...</p>
                )}
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 text-white font-medium p-3 rounded-md hover:bg-orange-600 transition duration-300"
            >
                {loading ? "Creating List..." : "Create List"}
            </button>
        </form>
    );
}
