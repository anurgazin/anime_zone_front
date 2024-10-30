import Image from 'next/image';
import { AnimeAPI } from "@/lib/types";
import Link from 'next/link';

type Props = {
    anime: AnimeAPI
}

export default function Card({ anime }: Props) {
    return (
        <div key={anime.id} className='bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300'>
            <Link href={`/anime/${anime.id}`} className="block">
                {/* Image */}
                <div className="relative lg:w-full h-[400px]">
                    <Image
                        src={anime.logo}
                        fill={true}
                        alt={anime.title}
                        priority
                        className="rounded-t-lg object-contain lg:object-cover"
                    />
                </div>
                {/* Card Content */}
                <div className="p-4">
                    <h1 className='text-base sm:text-lg font-anton text-gray-900 mb-2'>{anime.title}</h1>
                    <h2 className='text-sm text-gray-700 mb-2 font-antonio'>Rating: {anime.average_rating} / 10</h2>
                    <p className='text-xs sm:text-sm text-gray-600'>{anime.description.slice(0, 150)}...</p>
                </div>
            </Link>
        </div>
    );
}
