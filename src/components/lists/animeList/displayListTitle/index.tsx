"use client";

import { useState } from "react";
import { AnimeList, ListRatingAction, RatingAction } from "@/lib/types";
import Link from "next/link";
import { rateList } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { getCookie } from "cookies-next";
type AnimeListProps = {
    animeList: AnimeList;
    handleReload?: () => void;
    user?: string;
}

export default function AnimeListDisplay({ animeList, handleReload }: AnimeListProps) {
    const { toast } = useToast()
    const user = getCookie("access_token") || "";
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const handleRate = async (action: string) => {
        setError(null);
        setLoading(true);
        const payload: ListRatingAction = {
            list_type: "anime_list",
            action: action as RatingAction["action"]
        }
        try {
            await rateList(payload, animeList.id)
            if (handleReload) {
                toast({
                    title: "Success",
                    description: 'Thank you for rating',
                })
                handleReload()
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data || 'Failed to rate list',
                variant: "destructive",
            })
        } finally {
            setLoading(false);
        }
    }
    // Rating color based on its value
    const rating_color = animeList.rating > 0
        ? "text-green-500"
        : animeList.rating < 0
            ? "text-red-500"
            : "text-gray-500";
    return (
        <div className="pb-4 mb-4">
            {error && <p className="text-red-500">{error}</p>}
            {/* Header with List Name */}
            <Link href={`/list/anime/${animeList.id}`} className="block" >
                <div className="flex justify-between items-center">
                    <p className="font-anton break-words text-gray-800 text-lg max-w-full">{animeList.name}</p>
                    <p className="font-antonio text-sm text-gray-500">{animeList.user.username}</p>
                </div>
            </Link>
            {/* Rating */}
            <div className="flex items-center space-x-2">
                <Button
                    type="button"
                    onClick={() => handleRate("decrement")}
                    disabled={loading || !user}
                    variant="ghost"
                    className="text-gray-600 hover:text-red-600 p-2"
                >
                    -
                </Button>
                <p className={`font-semibold ${rating_color} text-lg`}>
                    {animeList.rating}
                </p>
                <Button
                    type="button"
                    onClick={() => handleRate("increment")}
                    disabled={loading || !user}
                    variant="ghost"
                    className="text-gray-600 hover:text-green-600 p-2"
                >
                    +
                </Button>
            </div>
        </div>
    );
};
