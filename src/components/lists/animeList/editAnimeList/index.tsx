"use client";

import { useState, useEffect, FormEvent } from "react";
import { AnimeAPI, AnimeList, EditListRequest } from "@/lib/types";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";
import { getAllAnime, patchAnimeList, deleteAnimeList } from "@/lib/api"; // Add deleteAnimeList here
import { Button } from "@/components/ui/button";

type EditAnimeListFormProps = {
    existingList: AnimeList;
};

export default function EditAnimeListForm({ existingList }: EditAnimeListFormProps) {
    const [listTitle, setListTitle] = useState<string>(existingList.name);
    const [selectedAnimeIds, setSelectedAnimeIds] = useState<string[]>(existingList.anime_list);
    const [animeList, setAnimeList] = useState<AnimeAPI[]>([]);
    const [listPublic, setListPublic] = useState<boolean>(existingList.public);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const router = useRouter();

    // Fetch anime list on mount
    useEffect(() => {
        const fetchAnimeList = async () => {
            try {
                const response = await getAllAnime();
                setAnimeList(response.data);
            } catch (err) {
                setError("Failed to load anime list. Please try again later.");
            } finally {
                setIsFetching(false);
            }
        };
        fetchAnimeList();
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
        setError(null);

        const formData: EditListRequest = {
            name: listTitle,
            content: selectedAnimeIds,
            public: listPublic,
        };

        try {
            const response = await patchAnimeList(formData, existingList.id);
            if (response.status === 200) {
                router.push("/dashboard"); // Redirect to the dashboard
            } else {
                setError("Failed to update anime list. Please try again.");
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.response?.data?.error || "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this anime list?")) return;

        setLoading(true);
        setError(null);

        try {
            const response = await deleteAnimeList(existingList.id);
            if (response.status === 200) {
                router.push("/dashboard"); // Redirect to the dashboard on successful deletion
            } else {
                setError("Failed to delete anime list. Please try again.");
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
                Edit Anime List
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

            {/* Anime Selection */}
            <div className="flex flex-col space-y-2 h-[50vh] overflow-y-auto">
                <label className="text-xl text-gray-700 font-medium">
                    Select Anime:
                </label>
                {isFetching ? (
                    <p className="text-gray-500">Loading anime list...</p>
                ) : animeList.length > 0 ? (
                    animeList.map((anime) => (
                        <div key={anime.id} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id={anime.id}
                                value={anime.id}
                                onChange={() => handleCheckboxChange(anime.id)}
                                checked={selectedAnimeIds.includes(anime.id)}
                                className="w-4 h-4 text-orange-500 focus:ring-2 focus:ring-orange-400 border-gray-300 rounded"
                            />
                            <label
                                htmlFor={anime.id}
                                className="text-gray-700 cursor-pointer"
                            >
                                {anime.title}
                            </label>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No anime available to display.</p>
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

            {/* Buttons */}
            <div className="flex flex-row gap-2 justify-end">
                <Button
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={loading}
                    className="bg-red-500 text-white font-medium p-3 rounded-md hover:bg-red-600 transition duration-300 disabled:opacity-50"
                >
                    {loading ? "Deleting..." : "Delete"}
                </Button>
                <Button
                    type="submit"
                    disabled={loading}
                    className="bg-orange-500 text-white font-medium p-3 rounded-md hover:bg-orange-600 transition duration-300 disabled:opacity-50"
                >
                    {loading ? "Updating List..." : "Update List"}
                </Button>
            </div>
        </form>
    );
}
