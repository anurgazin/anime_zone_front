import Image from 'next/image';
import { Anime } from "@/lib/types";
import img from "@/tmp_data/anime/images/logos/jjk2.jpg";
import Link from 'next/link';

type Props = {
    anime: Anime
}

export default function Card({anime}: Props) {
    return (
        <div key={anime.id} className='bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300'>
            <Link href={`/anime/${anime.id}`} className="block">
                {/* Image */}
                <div className="relative w-full h-[200px] sm:h-[400px]">
                    <Image
                        src={img}
                        fill={true}
                        alt={anime.title}
                        className="rounded-t-lg object-cover"
                    />
                </div>
                {/* Card Content */}
                <div className="p-4">
                    <h1 className='text-base sm:text-lg font-bold text-gray-900 mb-2'>{anime.title}</h1>
                    <h2 className='text-sm text-gray-700 mb-2'>Rating: {anime.rating} / 10</h2>
                    <p className='text-xs sm:text-sm text-gray-600'>{anime.description.slice(0, 150)}...</p>
                </div>
            </Link>
        </div>
    );
}
