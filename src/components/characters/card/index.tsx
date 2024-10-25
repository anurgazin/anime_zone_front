import Image from 'next/image';
import { CharacterAPI } from "@/lib/types";
import Link from 'next/link';

type Props = {
    character: CharacterAPI
}

export default function Card({ character }: Props) {
    const from_anime = character.from_anime.map(anime => anime.title).join(", ");
    return (
        <div key={character.id} className='bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300'>
            <Link href={`/characters/${character.id}`} className="block">
                {/* Image */}
                <div className="relative w-full h-[200px] sm:h-[400px]">
                    <Image
                        src={character.logo}
                        fill={true}
                        alt={character.first_name + " " + character.last_name}
                        className="rounded-t-lg object-cover"
                    />
                </div>
                {/* Card Content */}
                <div className="p-4">
                    <h1 className='text-base sm:text-lg font-anton text-gray-900 mb-2'>{character.first_name} {character.last_name}</h1>
                    <h2 className='text-sm text-gray-700 mb-2 font-antonio'>Age: {character.age}</h2>
                    <h2 className='text-sm text-gray-700 mb-2 font-antonio'>From: {from_anime}</h2>
                    <p className='text-xs sm:text-sm text-gray-600'>{character.bio.slice(0, 150)}...</p>
                </div>
            </Link>
        </div>
    );
}
