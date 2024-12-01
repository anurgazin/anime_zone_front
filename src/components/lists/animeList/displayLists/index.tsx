"use client";

import { AnimeListAPI } from "@/lib/types";
import { useRouter } from "next/navigation";
import AnimeListDisplay from "../displayListTitle";
import Image from "next/image";
import Link from "next/link";
import { getCookie } from "cookies-next";

type DisplayAnimeListProps = {
    animeList: AnimeListAPI[];
    user?: string;
};

export default function DisplayAnimeLists({ animeList }: DisplayAnimeListProps) {
    const router = useRouter();
    const user = getCookie("access_token") || "";

    const handleReload = () => {
        router.refresh();
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
            {animeList.map((list) => (
                <div
                    key={list.anime_list.id}
                    className="bg-white shadow-md rounded-lg border border-gray-200 overflow-hidden"
                >
                    {/* Anime Thumbnails */}
                    <div className="flex gap-2 p-4 overflow-x-auto">
                        {list.anime.map((anime) => (
                            <div
                                key={anime.id}
                                className="flex-shrink-0 relative w-[120px] h-[160px]"
                            >
                                <Image
                                    src={anime.logo}
                                    fill={true}
                                    alt={anime.title}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    priority
                                    className="rounded-lg object-cover border border-gray-300"
                                />
                            </div>
                        ))}
                        {/* See More */}
                        <div className="flex-shrink-0 w-[120px] h-[160px] flex items-center justify-center bg-gray-100 border border-dashed border-gray-300 rounded-lg">
                            <Link href={`/list/anime/${list.anime_list.id}`} className="text-gray-500 text-center font-antonio text-sm px-2">
                                See More &#8680;
                            </Link>
                        </div>
                    </div>

                    {/* Anime List Details */}
                    <div className="p-4">
                        <AnimeListDisplay
                            animeList={list.anime_list}
                            handleReload={handleReload}
                            user={user}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
