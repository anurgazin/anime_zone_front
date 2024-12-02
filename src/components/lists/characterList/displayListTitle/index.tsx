"use client";

import { useState } from "react";
import { CharacterList, ListRatingAction, RatingAction } from "@/lib/types";
import Link from "next/link";
import { rateList } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { getCookie } from "cookies-next";
type CharacterListProps = {
    characterList: CharacterList;
    handleReload?: () => void;
    user?: string;
}

export default function CharacterListDisplay({ characterList, handleReload }: CharacterListProps) {
    const { toast } = useToast()
    const user = getCookie("access_token") || "";
    const user_id = getCookie("id") || "";
    const [loading, setLoading] = useState<boolean>(false);
    const handleRate = async (action: string) => {
        setLoading(true);
        const payload: ListRatingAction = {
            list_type: "character_list",
            action: action as RatingAction["action"]
        }
        try {
            await rateList(payload, characterList.id)
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
    const rating_color = characterList.rating > 0
        ? "text-green-500"
        : characterList.rating < 0
            ? "text-red-500"
            : "text-gray-500";
    return (

        <div className="pb-4 mb-4">
            {/* Header with List Name */}
            <div className="flex justify-between items-center">
                <div className="flex flex-row items-center gap-1 text-orange-600">
                    <Link href={`/list/characters/${characterList.id}`} className="font-anton break-words text-gray-800 text-lg max-w-full">{characterList.name}</Link>
                    {user_id === characterList.user.user_id && <p>&#128394;</p>}
                </div>
                <p className="font-antonio text-sm text-gray-500">{characterList.user.username}</p>
            </div>
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
                    {characterList.rating}
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
