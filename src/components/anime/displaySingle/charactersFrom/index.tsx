import Image from 'next/image';
import Link from 'next/link';
import { CharacterAPI } from "@/lib/types";
type CharacterFromAnimeProps = {
    character: CharacterAPI;
}

export default function CharacterFromAnimeCard({ character }: CharacterFromAnimeProps) {
    return (
        <Link href={`/characters/${character.id}`} className="block">
            <div className="pb-4 mb-4 lg:hover:scale-[1.10] transition-scale duration-200">
                <div className="relative w-[120px] h-[120px]">
                    <Image
                        src={character.logo}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="rounded-lg object-cover shadow-lg"
                        alt={character.first_name}
                    />
                </div>
                {/* Character's First and Last Name */}
                <div className="flex justify-between items-center">
                    <p className="font-semibold text-gray-800">{character.last_name} {character.first_name}</p>
                </div>
            </div>
        </Link>
    );
};
