"use client";
import Image from 'next/image';
import { AnimeAPI, AnimeList, CharacterAPI, Comment, Rating } from "@/lib/types";
import { useState } from 'react';
import Modal from '@/components/modal';
import CommentComponent from '@/components/comments/displayComments';
import RatingComponent from '@/components/review/displayReview';
import AnimeListDisplay from '@/components/lists/animeList/displayList';
import CharacterFromAnimeCard from './charactersFrom';
import WriteComment from '@/components/comments/writeComment';
import { getCookie } from 'cookies-next';
import Link from 'next/link';

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
    const user_exists = getCookie("token") || "";
    const genre = anime.genre.length > 1 ? anime.genre.join(", ") : anime.genre.toString();
    const studio = anime.studio.length > 1 ? anime.studio.join(", ") : anime.studio.toString();

    const [selectedImage, setSelectedImage] = useState<img | null>(null);

    const handleImageClick = (image: img) => {
        setSelectedImage(image);
    };

    return (
        <div className="grid grid-cols-1 grid-rows-auto gap-4">
            {/* Top Banner */}
            <div className="relative overflow-hidden -z-10 h-48 sm:h-56">
                <Image src={anime.logo} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" fill={true} className="blur-sm object-cover" alt="Anime Banner" />
            </div>

            {/* Main Info */}
            <div className='flex flex-col gap-4 pt-1 p-6'>
                <div className='grid grid-cols-1 lg:grid-cols-10 gap-8'>
                    {/* Logo */}
                    <div className='lg:col-span-2 flex justify-center'>
                        <div className="relative w-full h-[350px]"
                            onClick={() => handleImageClick({
                                src: anime.logo,
                                width: 0,
                                height: 0
                            })}
                        >
                            <Image src={anime.logo} priority fill={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="rounded-lg object-contain lg:hover:scale-[1.025] transition-scale duration-200" alt="Anime Logo" />
                        </div>
                    </div>
                    {/* Data info */}
                    <div className="lg:col-span-8 p-4 rounded-lg border-2 border-orange-200 lg:border-none">
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
                </div>
                {/* Media */}
                <div className="border-2 border-orange-200 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl sm:text-2xl font-anton text-gray-800 mb-2 underline decoration-orange-300 underline-offset-8">
                        Media
                    </h2>
                    <div className="flex flex-row flex-wrap gap-4 justify-center">
                        {anime.media.map((mediaItem, i) => {
                            const isYouTubeLink = mediaItem.includes("youtube.com") || mediaItem.includes("youtu.be");

                            return (
                                <div key={i}>
                                    {isYouTubeLink ? (
                                        // Render YouTube iframe for YouTube links
                                        <iframe
                                            src={
                                                mediaItem.includes("youtu.be")
                                                    ? mediaItem.replace("youtu.be/", "www.youtube.com/embed/")
                                                    : mediaItem.replace("watch?v=", "embed/")
                                            }
                                            width="320"
                                            height="180"
                                            className="rounded-md shadow-md border-2 border-orange-200 hover:scale-[1.025] transition-transform duration-200"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            title={`YouTube video ${i}`}
                                        ></iframe>
                                    ) : (
                                        // Render image for non-YouTube links
                                        <div
                                            onClick={() =>
                                                handleImageClick({
                                                    src: mediaItem,
                                                    width: 1280,
                                                    height: 720,
                                                })
                                            }
                                            className="relative w-[320px] h-[180px]">
                                            <Image
                                                src={mediaItem}
                                                fill
                                                quality={100}
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                className="rounded-md object-cover hover:scale-[1.025] transition-transform duration-200"
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
                <div className='border-2 border-orange-200 p-4 shadow-md bg-white rounded-lg'>
                    <h2 className="text-xl sm:text-2xl font-anton text-gray-800 mb-2 underline decoration-orange-300 underline-offset-8">Description</h2>
                    <p className="text-gray-700 whitespace-pre-wrap">{anime.description}</p>
                </div>
                {/* Characters */}
                <div className="border-2 border-orange-200 p-6 rounded-lg shadow-md bg-white">
                    <h2 className="text-xl sm:text-2xl font-anton text-gray-800 mb-6 underline decoration-orange-300 underline-offset-4">Characters</h2>
                    <div className="flex flex-row flex-wrap gap-4 items-center">
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
                <div className="border-2 border-orange-200 shadow-md bg-white p-4 rounded-lg">
                    <div className='flex flex-row justify-between text-xl sm:text-2xl font-anton'>
                        <h2 className="text-gray-800 mb-4 underline decoration-orange-300 underline-offset-8">Reviews</h2>
                        <Link href={`/dashboard/review/${anime.id}`} className='text-3xl text-orange-400'>+</Link>
                    </div>
                    {rating && rating.length > 0 ? (
                        rating
                            .map((r, i) => (
                                <RatingComponent key={i} rating={r} />
                            ))
                    ) : (
                        <p className="text-gray-600 italic">No reviews yet.</p>
                    )}
                </div>

                {/* Comments and Lists Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-auto gap-2">
                    {/* Comments */}
                    <div className="border-2 border-orange-200 p-4 shadow-md bg-white rounded-lg space-y-4">
                        <h2 className="text-xl sm:text-2xl font-anton text-gray-800 mb-4 underline decoration-orange-300 underline-offset-8">Comments</h2>
                        {user_exists.length > 0 ? (<WriteComment contentType='anime' contentId={anime.id} />) : (
                            <p className="text-gray-600 italic">You should be logged in to write a comment.</p>
                        )}
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
