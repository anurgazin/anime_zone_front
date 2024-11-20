import Image from 'next/image';
import { AnimeAPI } from "@/lib/types";
import Link from 'next/link';

type Props = {
    anime: AnimeAPI
}

export default function SimilarAnimeCard({ anime }: Props) {
    return (
        <div className="max-w-[240px] bg-white shadow-md hover:scale-105 active:scale-100 transition-transform duration-200 ease-in-out">
            <Link href={`/anime/${anime.id}`} className="block">
                {/* Image */}
                <div className="relative w-[240px] h-[320px]">
                    <Image
                        src={anime.logo}
                        fill={true}
                        alt={anime.title}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                        className="rounded-t-lg object-cover"
                    />
                </div>
                {/* Card Content */}
                <div className="p-4 flex flex-col flex-wrap">
                    <h1 className="lg:text-lg font-anton text-gray-900 mb-2">
                        {anime.title}
                    </h1>
                </div>
            </Link>
        </div>
    );
}
