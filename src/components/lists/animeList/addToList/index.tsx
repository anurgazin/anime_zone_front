import { useEffect, useState } from "react";
import { getCookie } from 'cookies-next';
import { addToAnimeList, getAllAnimeListsByUserId } from "@/lib/api";
import { AnimeList, AddToList } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

type AddToAnimeListProps = {
    animeId: string;
    handleReload: () => void;
};

export default function AddToAnimeList({ animeId, handleReload }: AddToAnimeListProps) {
    const userId = getCookie("id") || "";
    const [animeLists, setAnimeLists] = useState<AnimeList[]>([]);
    const [selectedLists, setSelectedLists] = useState<string[]>([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const { toast } = useToast();

    // Fetch the user's anime lists on component mount
    useEffect(() => {
        const fetchAnimeLists = async () => {
            if (userId) {
                const userListResponse = await getAllAnimeListsByUserId(userId);
                setAnimeLists(userListResponse.data);
            }
        };
        fetchAnimeLists();
    }, [userId]);

    // Handle adding anime to the selected list
    const handleAddToList = async () => {
        if (animeId && selectedLists.length > 0) {
            try {
                const payload: AddToList = { object_id: animeId };
                await Promise.all(
                    selectedLists.map(async (listId) => {
                        addToAnimeList(payload, listId);
                    })
                );
                toast({
                    title: "Success",
                    description: `Anime added to list(s)`,
                });
                setSelectedLists([]);
                setDropdownOpen(false);
                handleReload()
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                toast({
                    title: "Error",
                    description: error.response?.data || "Failed to add anime to the list",
                    variant: "destructive",
                });
            }
        }
    };

    return (
        <div className="relative w-full max-w-sm">
            <Button
                variant="ghost"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full font-medium p-3 rounded-md flex items-center justify-between border border-gray-300 hover:border-gray-400 transition"
            >
                {selectedLists.length > 0
                    ? `${selectedLists.length} list(s) selected`
                    : "Select a List"}
                <span className="ml-2">&#9660;</span>
            </Button>

            {dropdownOpen && (
                <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-2 max-h-64 overflow-y-auto">
                    <div className="p-4 space-y-3">
                        {animeLists.length > 0 ? (
                            animeLists.map((list) => (
                                <div key={list.id} className="flex items-center gap-2">
                                    <Checkbox
                                        id={list.id}
                                        checked={selectedLists.includes(list.id)}
                                        onCheckedChange={(checked) => {
                                            setSelectedLists((prev) =>
                                                checked
                                                    ? [...prev, list.id]
                                                    : prev.filter((l) => l !== list.id)
                                            );
                                        }}
                                    />
                                    <label
                                        htmlFor={list.id}
                                        className="text-sm cursor-pointer"
                                    >
                                        {list.name}
                                    </label>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm">No lists found</p>
                        )}
                    </div>

                    <div className="border-t border-gray-200 p-4 flex items-center justify-between">
                        {/* Link to create a new list */}
                        <Link
                            href="/dashboard/animeList"
                            className="text-orange-500 hover:text-orange-600 font-medium transition-colors"
                        >
                            + New List
                        </Link>

                        {/* Button to add anime to the selected list */}
                        <Button
                            onClick={handleAddToList}
                            className="bg-orange-400 hover:bg-orange-500 text-white font-medium rounded-md px-5 py-2 shadow-sm transition-all"
                        >
                            Add to List
                        </Button>
                    </div>

                </div>
            )}
        </div>
    );
}
