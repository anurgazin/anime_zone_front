import { AnimeList } from "@/lib/types";
type AnimeListProps = {
    animeList: AnimeList;
}

export default function AnimeListDisplay({ animeList }: AnimeListProps) {
    // Rating color based on its value
    const rating_color = animeList.rating > 0
        ? "text-green-500"
        : animeList.rating < 0
            ? "text-red-500"
            : "text-gray-500";
    return (
        <div className="pb-4 mb-4">
            {/* Header with List Name */}
            <div className="flex justify-between items-center">
                <p className="font-semibold text-gray-800">{animeList.name}</p>
                <p className="text-sm text-gray-500">{animeList.user.username}</p>
            </div>
            {/* Rating */}
            <p className={`font-semibold ${rating_color}`}>{animeList.rating}</p>
        </div>
    );
};
