"use client";
import Image from 'next/image';
import { AnimeAPI, Comment } from "@/lib/types";
import { useState } from 'react';
import Modal from '@/components/modal';

type img = {
    src: string;
    width: number;
    height: number;
}

type DisplaySingleProps = {
    anime: AnimeAPI;
    comments: Comment[] | undefined;
};

export default function DisplaySingle({ anime, comments }: DisplaySingleProps) {
    const genre = anime.genre.length > 1 ? anime.genre.join(", ") : anime.genre.toString();
    const studio = anime.studio.length > 1 ? anime.studio.join(", ") : anime.studio.toString();

    const [selectedImage, setSelectedImage] = useState<img | null>(null);

    const handleImageClick = (image: img) => {
        setSelectedImage(image);
    };
    console.log(comments)

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 grid-rows-auto gap-4">
            {/* Top Banner */}
            <div className="relative overflow-hidden -z-10 h-48 sm:h-56 lg:col-span-5">
                <Image src={anime.logo} fill={true} className="blur-sm object-cover" alt="Anime Banner" />
            </div>

            {/* Information */}
            <div className="lg:col-span-5 grid grid-cols-1 lg:grid-cols-5 lg:grid-rows-auto gap-5 px-4 sm:px-10 py-4">
                {/* Logo section */}
                <div className="lg:col-span-1 flex justify-center lg:justify-start relative w-full h-[200px] sm:h-[400px]"
                    onClick={() => handleImageClick({
                        src: anime.logo,
                        width: 0,
                        height: 0
                    })}
                >
                    <Image src={anime.logo} fill={true} className="rounded-lg shadow-lg object-cover" alt="Anime Logo" />
                </div>

                {/* Data info */}
                <div className="lg:col-span-2 lg:row-span-1 p-4 rounded-lg border-2 border-orange-200 lg:border-none">
                    <h1 className="text-2xl sm:text-3xl font-anton text-gray-800 mb-4">{anime.title}</h1>
                    <div className="text-lg sm:text-xl text-gray-600 grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <div className="lg:col-span-1 lg:row-span-2 flex flex-col space-y-2">
                    <h2 className="text-xl sm:text-2xl font-antonio text-gray-600 mb-2">Media</h2>
                    <div className="grid grid-cols-2 gap-2 lg:flex lg:flex-col">
                        {anime.media.map((mediaItem, i) => {
                            const isYouTubeLink = mediaItem.includes("youtube.com") || mediaItem.includes("youtu.be");

                            return (
                                <div key={i} className="media-item">
                                    {isYouTubeLink ? (
                                        // Render YouTube iframe for YouTube links
                                        <iframe
                                            src={mediaItem.includes("youtu.be")
                                                ? mediaItem.replace("youtu.be/", "www.youtube.com/embed/")
                                                : mediaItem.replace("watch?v=", "embed/")
                                            }
                                            className="rounded-md shadow-md border-2 border-orange-200"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            title={`YouTube video ${i}`}
                                        ></iframe>
                                    ) : (
                                        // Render image for non-YouTube links
                                        <div
                                            onClick={() => handleImageClick({
                                                src: mediaItem,
                                                width: 321,
                                                height: 171
                                            })}
                                        >
                                            <Image
                                                src={mediaItem}
                                                width={320}
                                                height={240}
                                                className="rounded-md shadow-md border-2 border-orange-200"
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
                <div className="lg:col-span-4 lg:row-start-2 border-2 border-orange-200 p-4 rounded-lg lg:border-none">
                    <h2 className="text-xl sm:text-2xl font-anton text-gray-800 mb-2 lg:underline lg:decoration-orange-300 lg:underline-offset-8">Description</h2>
                    <p className="text-gray-700 whitespace-pre-wrap">{anime.description}</p>
                </div>
            </div>
            {selectedImage && <Modal modalContent={selectedImage} onClose={() => setSelectedImage(null)} />}
        </div>
    );
}
