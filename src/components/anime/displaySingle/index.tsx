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
        <div className="grid grid-cols-5 grid-rows-7 gap-4">
            {/* Top Banner */}
            <div className="col-span-5 row-span-2 relative overflow-hidden -z-10">
                <Image src={logo} layout="fill" objectFit="cover" className="blur-sm" alt="Anime Banner" />
            </div>
            {/* Information */}
            <div className='col-span-5 row-span-5 row-start-3 grid grid-cols-5 grid-rows-5 gap-4 px-10'>
                {/* Logo section */}
                <div className="row-span-3">
                    <Image src={logo} width={250} height={250} className="rounded-lg shadow-lg" alt="Anime Logo" />
                </div>
                {/* Data info */}
                <div className="col-span-2 row-span-3">
                    <h1 className="text-4xl font-anton text-gray-800">{anime.title}</h1>
                    <div className="space-y-2">
                        <p className="text-gray-600 font-antonio"><span className="font-anton">Rating:</span> {anime.rating} / 10</p>
                        <p className="text-gray-600 font-antonio"><span className="font-anton">Studio:</span> {studio}</p>
                        <p className="text-gray-600 font-antonio"><span className="font-anton">Type:</span> {anime.type.toUpperCase()}</p>
                        <p className="text-gray-600 font-antonio"><span className="font-anton">Genres:</span> {genre}</p>
                        <p className="text-gray-600 font-antonio"><span className="font-anton">Release Date:</span> {anime.release_date}</p>
                        <p className="text-gray-600 font-antonio"><span className="font-anton">Status:</span> {anime.status}</p>
                        <p className="text-gray-600 font-antonio"><span className="font-anton">Number of Episodes:</span> {anime.episodes}</p>
                        <p className="text-gray-600 font-antonio"><span className="font-anton">Duration:</span> {anime.duration} mins</p>
                        <p className="text-gray-600 font-antonio"><span className="font-anton">ESRB:</span> {anime.esrb}</p>
                    </div>
                </div>
                {/* Media Section */}
                <div className='row-span-5 col-start-5'>
                    <h2 className="text-2xl font-antonio text-gray-800">Media</h2>
                    <div className="flex flex-col">
                        {media.map((screen, i) => (
                            <Image key={i} src={screen} width={321} height={171} className="rounded-md shadow-md" alt={`Media ${i}`} />
                        ))}
                    </div>
                </div>
                {/* Description */}
                <div className="col-span-4 row-span-2 row-start-4">
                    <h2 className="text-2xl font-anton text-gray-800">Description</h2>
                    <p className="text-gray-700 mt-2">{anime.description}</p>
                </div>
            </div>
        </div>
    );
}
