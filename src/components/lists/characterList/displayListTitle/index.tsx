import { CharacterList } from "@/lib/types";
import Link from "next/link";
type CharacterListProps = {
    characterList: CharacterList;
}

export default function CharacterListDisplay({ characterList }: CharacterListProps) {
    // Rating color based on its value
    const rating_color = characterList.rating > 0
        ? "text-green-500"
        : characterList.rating < 0
            ? "text-red-500"
            : "text-gray-500";
    return (
        <Link href={`/list/characters/${characterList.id}`} className="pb-4 mb-4">
            {/* Header with List Name */}
            <div className="flex justify-between items-center">
                <p className="font-semibold text-gray-800">{characterList.name}</p>
                <p className="text-sm text-gray-500">{characterList.user.username}</p>
            </div>
            {/* Rating */}
            <p className={`font-semibold ${rating_color}`}>{characterList.rating}</p>
        </Link>
    );
};
