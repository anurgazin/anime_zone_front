import Image from 'next/image';
import { Anime } from "@/lib/types";
import logo from "@/tmp_data/anime/images/logos/jjk2.jpg";
import { media } from '@/tmp_data/anime/images/media/media';

type DisplaySingleProps = {
    anime: Anime;
};

export default function DisplaySingle({ anime }: DisplaySingleProps) {
    const genre = anime.genre.length > 1 ? anime.genre.join(", ") : anime.genre.toString();
    const studio = anime.studio.length > 1 ? anime.studio.join(", ") : anime.studio.toString();

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 grid-rows-auto gap-4">
            {/* Top Banner */}
            <div className="relative overflow-hidden -z-10 h-48 sm:h-56 lg:col-span-5">
                <Image src={logo} fill={true} objectFit="cover" className="blur-sm" alt="Anime Banner" />
            </div>

            {/* Information */}
            <div className="lg:col-span-5  grid grid-cols-1 lg:grid-cols-5 lg:grid-rows-auto gap-5 px-4 sm:px-10 py-4">
                {/* Logo section */}
                <div className="lg:col-span-1 flex justify-center lg:justify-start">
                    <Image src={logo} objectFit='cover' className="rounded-lg shadow-lg" alt="Anime Logo" />
                </div>

                {/* Data info */}
                <div className="lg:col-span-2 lg:row-span-1 p-4 rounded-lg border-2 border-orange-200 p-4 rounded-lg lg:border-none">
                    <h1 className="text-2xl sm:text-3xl font-anton text-gray-800 mb-4">{anime.title}</h1>
                    <div className="text-lg sm:text-xl text-gray-600 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <p><span className="font-semibold">Rating:</span> {anime.rating > 0 ? `${anime.rating} / 10` : "Not Available"}</p>
                            <p><span className="font-semibold">Studio:</span> {studio}</p>
                            <p><span className="font-semibold">Type:</span> {anime.type.toUpperCase()}</p>
                            <p><span className="font-semibold">Genres:</span> {genre}</p>
                            <p><span className="font-semibold">ESRB:</span> {anime.esrb}</p>
                        </div>
                        <div>
                            <p><span className="font-semibold">Release Date:</span> {anime.release_date}</p>
                            <p><span className="font-semibold">Status:</span> {anime.status.toUpperCase()}</p>
                            <p><span className="font-semibold">Number of Episodes:</span> {anime.episodes}</p>
                            <p><span className="font-semibold">Duration:</span> {anime.duration} mins</p>
                        </div>
                    </div>
                </div>

                {/* Media Section */}
                <div className="lg:col-span-1 lg:row-span-2 flex flex-col space-y-2">
                    <h2 className="text-xl sm:text-2xl font-antonio text-gray-600 mb-2">Media</h2>
                    <div className="grid grid-cols-2 gap-2 lg:flex lg:flex-col">
                        {media.map((screen, i) => (
                            <Image key={i} src={screen} width={321} height={171} className="rounded-md shadow-md border-2 border-orange-200" alt={`Media ${i}`} />
                        ))}
                    </div>
                </div>

                {/* Description */}
                <div className="lg:col-span-4 lg:row-start-2 border-2 border-orange-200 p-4 rounded-lg lg:border-none">
                    <h2 className="text-xl sm:text-2xl font-anton text-gray-800 mb-2 lg:underline lg:decoration-orange-300 lg:underline-offset-8">Description</h2>
                    <p className="text-gray-700 whitespace-pre-wrap">{anime.description}</p>
                </div>
            </div>
        </div>
    );
}
