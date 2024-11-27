"use client";

import { AnimeList } from "@/lib/types";
import { useRouter } from "next/navigation";
import AnimeListDisplay from "../displayListTitle";

type DisplayAnimeListProps = {
    animeList: AnimeList[];
    user?: string;
};

export default function DisplayAnimeLists({ animeList, user }: DisplayAnimeListProps) {
    const router = useRouter();

    const handleReload = () => {
        router.refresh();
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-4">
            {animeList.map((list) => (
                <AnimeListDisplay
                    key={list.id}
                    animeList={list}
                    handleReload={handleReload}
                    user={user}
                />
            ))}
        </div>
    );
}
