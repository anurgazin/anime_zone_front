"use client";

import { AnimeListAPI } from "@/lib/types";
import { useRouter } from "next/navigation";
import AnimeListDisplay from "../displayListTitle";
import Image from "next/image";

type DisplayAnimeListProps = {
  animeList: AnimeListAPI[];
  user?: string;
};

export default function DisplayAnimeLists({ animeList, user }: DisplayAnimeListProps) {
  const router = useRouter();

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
              <div key={anime.id} className="flex-shrink-0">
                <Image
                  src={anime.logo}
                  width={112} // Tailwind `w-28`
                  height={112} // Tailwind `h-28`
                  alt={anime.title}
                  priority
                  className="rounded-lg object-cover border border-gray-300"
                />
              </div>
            ))}
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
