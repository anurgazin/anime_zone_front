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
            <div className="relative overflow-hidden -z-10 col-span-5 row-span-1">
                <Image src={logo} layout="fill" objectFit="cover" className="blur-sm" alt="Anime Banner" />
            </div>
            {/* Information */}
            <div className='col-span-5 row-span-5 row-start-2 grid grid-cols-5 grid-rows-5 gap-5 px-10'>
                {/* Logo section */}
                <div className="row-span-3">
                    <Image src={logo} width={250} height={250} className="rounded-lg shadow-lg" alt="Anime Logo" />
                </div>
                {/* Data info */}
                <div className="col-span-2 row-span-3">
                    <h1 className="text-4xl font-anton text-gray-800">{anime.title}</h1>
                    <div className="text-xl text-gray-600 font-antonio grid grid-cols-2 gap-1">
                        <div>
                            <p><span className="font-anton">Rating:</span> {anime.rating > 0 ? `${anime.rating} / 10` : "Not Available"}</p>
                            <p><span className="font-anton">Studio:</span> {studio}</p>
                            <p><span className="font-anton">Type:</span> {anime.type.toUpperCase()}</p>
                            <p><span className="font-anton">Genres:</span> {genre}</p>
                            <p><span className="font-anton">ESRB:</span> {anime.esrb}</p>
                        </div>
                        <div>
                            <p><span className="font-anton">Release Date:</span> {anime.release_date}</p>
                            <p><span className="font-anton">Status:</span> {anime.status.toUpperCase()}</p>
                            <p><span className="font-anton">Number of Episodes:</span> {anime.episodes}</p>
                            <p><span className="font-anton">Duration:</span> {anime.duration} mins</p>
                        </div>
                    </div>
                </div>
                {/* Media Section */}
                <div className='row-span-5 col-start-5'>
                    <h2 className="text-2xl font-antonio text-gray-600">Media</h2>
                    <div className="flex flex-col space-y-1">
                        {media.map((screen, i) => (
                            <Image key={i} src={screen} width={321} height={171} className="rounded-md shadow-md border-2 border-orange-200" alt={`Media ${i}`} />
                        ))}
                    </div>
                </div>
                {/* Description */}
                <div className="col-span-4 row-span-2 row-start-4 border-2 border-orange-200 space-y-2">
                    <h2 className="text-2xl font-anton text-gray-800">Description</h2>
                    <p className="text-gray-700 mt-2 whitespace-pre-line">{anime.description}</p>
                </div>
            </div>
        </div>
    );
}
