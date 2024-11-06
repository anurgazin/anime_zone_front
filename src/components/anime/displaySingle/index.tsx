"use client";
import Image from 'next/image';
import { AnimeAPI, AnimeList, CharacterAPI, Comment, Rating } from "@/lib/types";
import { useState } from 'react';
import Modal from '@/components/modal';
import CommentComponent from '@/components/comments';
import RatingComponent from '@/components/review';
import AnimeListDisplay from '@/components/lists/animeList/displayList';
import CharacterFromAnimeCard from './charactersFrom';
// import { Separator } from "@/components/ui/separator"

type img = {
    src: string;
    width: number;
    height: number;
}

type DisplaySingleProps = {
    anime: AnimeAPI;
    comments: Comment[] | undefined;
    rating: Rating[] | undefined;
    animeList: AnimeList[] | undefined;
    characters: CharacterAPI[] | undefined;
};

export default function DisplaySingle({ anime, comments, rating, animeList, characters }: DisplaySingleProps) {
    const genre = anime.genre.length > 1 ? anime.genre.join(", ") : anime.genre.toString();
    const studio = anime.studio.length > 1 ? anime.studio.join(", ") : anime.studio.toString();

    const [selectedImage, setSelectedImage] = useState<img | null>(null);

    const handleImageClick = (image: img) => {
        setSelectedImage(image);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 grid-rows-auto gap-4">
            {/* Top Banner */}
            <div className="relative overflow-hidden -z-10 h-48 sm:h-56 lg:col-span-5">
                <Image src={anime.logo} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" fill={true} className="blur-sm object-cover" alt="Anime Banner" />
            </div>

            {/* Information */}
            <div className="lg:col-span-5 grid grid-cols-1 lg:grid-cols-6 lg:grid-rows-auto gap-5 justify-self-center px-4 sm:px-10 py-4">
                {/* Logo section */}
                <div className="flex justify-center lg:justify-start relative shadow-md bg-white lg:w-full h-[350px]"
                    onClick={() => handleImageClick({
                        src: anime.logo,
                        width: 0,
                        height: 0
                    })}
                >
                    <Image src={anime.logo} priority fill={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="rounded-lg lg:shadow-lg object-contain lg:object-fill lg:hover:scale-[1.10] transition-scale duration-200" alt="Anime Logo" />
                </div>

                {/* Data info */}
                <div className="lg:col-span-3 lg:row-span-1 p-4 rounded-lg border-2 border-orange-200 lg:border-none">
                    <h1 className="text-2xl sm:text-3xl font-anton text-gray-800 mb-4">{anime.title}</h1>
                    <div className="text-lg sm:text-xl text-gray-600 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:border-2 lg:border-orange-200 shadow-md bg-white p-2 rounded-lg">
                        <div>
                            <p><span className="font-semibold">Rating:</span> {anime.average_rating > 0 ? `${anime.average_rating} / 10` : "Not Available"}</p>
                            <p><span className="font-semibold">Studio:</span> {studio}</p>
                            <p><span className="font-semibold">Type:</span> {anime.type.toUpperCase()}</p>
                            <p><span className="font-semibold">Genres:</span> {genre}</p>
                            <p><span className="font-semibold">ESRB:</span> {anime.esrb}</p>
                        </div>
                        <div>
                            <p><span className="font-semibold">Release Date:</span> {new Date(anime.release_date).toLocaleDateString()}</p>
                            <p><span className="font-semibold">Status:</span> {anime.status.toUpperCase()}</p>
                            <p><span className="font-semibold">Number of Episodes:</span> {anime.episodes}</p>
                            <p><span className="font-semibold">Duration:</span> {anime.duration} mins</p>
                        </div>
                    </div>
                </div>

                {/* Media Section */}
                <div className="lg:col-span-2 lg:row-span-3 flex flex-col">
                    <h2 className="text-xl sm:text-2xl font-anton text-gray-800 mb-2">Media</h2>
                    <div className="grid grid-cols-subgrid space-y-2">
                        {anime.media.map((mediaItem, i) => {
                            const isYouTubeLink = mediaItem.includes("youtube.com") || mediaItem.includes("youtu.be");

                            return (
                                <div key={i} className="col-start-2">
                                    {isYouTubeLink ? (
                                        // Render YouTube iframe for YouTube links
                                        <iframe
                                            src={mediaItem.includes("youtu.be")
                                                ? mediaItem.replace("youtu.be/", "www.youtube.com/embed/")
                                                : mediaItem.replace("watch?v=", "embed/")
                                            }
                                            width="320"
                                            height="240"
                                            className="rounded-md shadow-md border-2 border-orange-200 hover:scale-[1.05] transition-scale duration-200"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            title={`YouTube video ${i}`}
                                        ></iframe>
                                    ) : (
                                        // Render image for non-YouTube links
                                        <div
                                            onClick={() => handleImageClick({
                                                src: mediaItem,
                                                width: 320,
                                                height: 240
                                            })}
                                        >
                                            <Image
                                                src={mediaItem}
                                                width={320}
                                                height={240}
                                                className="rounded-md shadow-md border-2 border-orange-200 lg:hover:scale-[1.10] transition-scale duration-200"
                                                alt={`Media ${i}`}
                                            />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Description */}
                <div className="lg:col-span-4 lg:row-start-2 border-2 border-orange-200 p-4 shadow-md bg-white rounded-lg">
                    <h2 className="text-xl sm:text-2xl font-anton text-gray-800 mb-2 underline decoration-orange-300 underline-offset-8">Description</h2>
                    <p className="text-gray-700 whitespace-pre-wrap">{anime.description}</p>
                </div>

                {/* Characters */}
                <div className="lg:col-span-4 lg:row-start-3 border-2 border-orange-200 p-6 rounded-lg shadow-md bg-white">
                    <h2 className="text-xl sm:text-2xl font-anton text-gray-800 mb-6 underline decoration-orange-300 underline-offset-4">Characters</h2>
                    <div className="flex flex-row flex-wrap gap-6 items-center ">
                        {characters && characters.length > 0 ? (
                            characters.map((c, i) => (
                                <CharacterFromAnimeCard key={i} character={c} />
                            ))
                        ) : (
                            <p className="text-gray-600 italic">No characters added yet.</p>
                        )}
                    </div>
                </div>


                {/* Reviews */}
                <div className="lg:col-span-4 lg:row-start-4 border-2 border-orange-200 shadow-md bg-white p-4 rounded-lg">
                    <h2 className="text-xl sm:text-2xl font-anton text-gray-800 mb-4 underline decoration-orange-300 underline-offset-8">Reviews</h2>
                    {rating && rating.length > 0 ? (
                        rating.map((r, i) => (
                            <RatingComponent key={i} rating={r} />
                        ))
                    ) : (
                        <p className="text-gray-600 italic">No reviews yet.</p>
                    )}
                </div>

                {/* Comments and Lists Section */}
                <div className="lg:col-span-4 lg:row-start-5 grid grid-cols-1 lg:grid-cols-2 grid-rows-auto gap-2">
                    {/* Comments */}
                    <div className="border-2 border-orange-200 p-4 shadow-md bg-white rounded-lg">
                        <h2 className="text-xl sm:text-2xl font-anton text-gray-800 mb-4 underline decoration-orange-300 underline-offset-8">Comments</h2>
                        {comments && comments.length > 0 ? (
                            comments.map((comment, i) => (
                                <CommentComponent key={i} comment={comment} />
                            ))
                        ) : (
                            <p className="text-gray-600 italic">No comments yet.</p>
                        )}
                    </div>

                    {/* AnimeLists */}
                    <div className="border-2 border-orange-200 p-4 shadow-md bg-white rounded-lg">
                        <h2 className="text-xl sm:text-2xl font-anton text-gray-800 mb-4 underline decoration-orange-300 underline-offset-8">Anime Lists</h2>
                        {animeList && animeList.length > 0 ? (
                            animeList.map((a, i) => (
                                <AnimeListDisplay key={i} animeList={a} />
                            ))
                        ) : (
                            <p className="text-gray-600 italic">No anime lists yet.</p>
                        )}
                    </div>
                </div>
            </div>
            {selectedImage && <Modal modalContent={selectedImage} onClose={() => setSelectedImage(null)} />}
        </div>
    );
}
