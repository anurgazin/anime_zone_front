"use client";

import { useState, useEffect, FormEvent } from "react";
import { CharacterAPI, PostListRequest } from "@/lib/types";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { getAllCharacters, postCharacterList } from "@/lib/api";

export default function CreateCharacterListForm() {
    const [listTitle, setListTitle] = useState<string>("");
    const [listPublic, setListPublic] = useState<boolean>(false);
    const [selectedCharacterIds, setSelectedCharacterIds] = useState<string[]>([]);
    const [characters, setCharacters] = useState<CharacterAPI[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const router = useRouter();

    // Fetch list of characters on component mount
    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await getAllCharacters();
                setCharacters(response.data);
            } catch (err) {
                setError("Failed to load characters. Please try again later.");
            } finally {
                setIsFetching(false);
            }
        };
        fetchCharacters();
    }, []);

    const handleCheckboxChange = (characterId: string) => {
        setSelectedCharacterIds((prev) =>
            prev.includes(characterId)
                ? prev.filter((id) => id !== characterId) // Remove if already selected
                : [...prev, characterId] // Add if not selected
        );
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        const formData: PostListRequest = {
            title: listTitle,
            content_list: selectedCharacterIds,
            public: listPublic,
        };

        try {
            const response = await postCharacterList(formData);
            if (response.status === 201) {
                router.push("/dashboard"); // Redirect to the dashboard
            } else {
                setError("Failed to create character list. Please try again.");
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.response?.data?.error || "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6"
        >
            <h2 className="text-2xl font-semibold text-center text-gray-800">
                Create Character List
            </h2>

            {/* List Title */}
            <div className="flex flex-col space-y-2">
                <label htmlFor="listTitle" className="text-gray-700 font-medium">
                    List Title:
                </label>
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

            {/* Character Selection */}
            <div className="flex flex-col space-y-2 h-[50vh] overflow-y-auto">
                <label className="text-xl text-gray-700 font-medium">
                    Select Characters:
                </label>
                {isFetching ? (
                    <p className="text-gray-500">Loading characters...</p>
                ) : characters.length > 0 ? (
                    characters.map((character) => (
                        <div key={character.id} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id={character.id}
                                value={character.id}
                                onChange={() => handleCheckboxChange(character.id)}
                                checked={selectedCharacterIds.includes(character.id)}
                                className="w-4 h-4 text-orange-500 focus:ring-2 focus:ring-orange-400 border-gray-300 rounded"
                            />
                            <label
                                htmlFor={character.id}
                                className="text-gray-700 cursor-pointer"
                            >
                                {character.last_name} {character.first_name}
                            </label>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No characters available to display.</p>
                )}
            </div>

            {/* Public/Private Switch */}
            <div className="flex items-center justify-between">
                <label htmlFor="listPublic" className="text-gray-700 font-medium">
                    Make List Public:
                </label>
                <Switch
                    id="listPublic"
                    checked={listPublic}
                    onCheckedChange={setListPublic}
                />
            </div>

            {/* Error Message */}
            {error && (
                <p className="text-red-500 text-sm text-center">
                    {error}
                </p>
            )}

            {/* Submit Button */}
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 text-white font-medium p-3 rounded-md hover:bg-orange-600 transition duration-300 disabled:opacity-50"
            >
                {loading ? "Creating List..." : "Create List"}
            </button>
        </form>
    );
}
