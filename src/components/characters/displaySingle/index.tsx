"use client";
import Image from 'next/image';
import { CharacterAPI } from "@/lib/types";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Modal from '@/components/modal';

type img = {
    src: string;
    width: number;
    height: number;
}

type DisplaySingleProps = {
    character: CharacterAPI;
};

export default function DisplaySingle({ character }: DisplaySingleProps) {
    const from_anime = character.from_anime.length > 1 ? character.from_anime.join(", ") : character.from_anime.toString();

    const [show, setShow] = useState(false);
    const toggleShow = () => {
        setShow(!show);
    }

    const [selectedImage, setSelectedImage] = useState<img | null>(null);
    const handleImageClick = (image: img) => {
        setSelectedImage(image);
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 grid-rows-auto gap-4">
            {/* Top Banner */}
            <div className="relative overflow-hidden -z-10 h-48 sm:h-56 lg:col-span-5">
                <Image src={character.logo} fill={true} className="blur-sm object-cover" alt="Anime Banner" />
            </div>

            {/* Information */}
            <div className="lg:col-span-5  grid grid-cols-1 lg:grid-cols-5 lg:grid-rows-auto gap-5 px-4 sm:px-10 py-4">
                {/* Logo section */}
                <div className="lg:col-span-1 flex justify-center lg:justify-start relative w-full h-[200px] sm:h-[400px]"
                    onClick={() => handleImageClick({
                        src: character.logo,
                        width: 0,
                        height: 0
                    })}
                >
                    <Image src={character.logo} fill={true} className="rounded-lg shadow-lg object-cover" alt="Anime Logo" />
                </div>

                {/* Data info */}
                <div className="lg:col-span-2 lg:row-span-1 p-4 rounded-lg border-2 border-orange-200 p-4 rounded-lg lg:border-none">
                    <h1 className="text-2xl sm:text-3xl font-anton text-gray-800 mb-4">{character.first_name} {character.last_name}</h1>
                    <div className="text-lg sm:text-xl font-antonio text-gray-600 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <p><span className="font-semibold">First Name:</span> {character.first_name}</p>
                            <p><span className="font-semibold">Last Name:</span> {character.last_name}</p>
                            <p><span className="font-semibold">From:</span> {from_anime}</p>
                        </div>
                        <div>
                            <p><span className="font-semibold">Age:</span> {character.age}</p>
                            <p><span className="font-semibold">Gender:</span> {character.gender}</p>
                            <p><span className="font-semibold">Status:</span>
                                <Button onClick={toggleShow} variant="link" className='text-lg sm:text-xl'>
                                    {show ? (character.status.toUpperCase()) : ("SHOW")}
                                </Button>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="lg:col-span-4 lg:row-start-2 border-2 border-orange-200 p-4 rounded-lg lg:border-none">
                    <h2 className="text-xl sm:text-2xl font-anton text-gray-800 mb-2 lg:underline lg:decoration-orange-300 lg:underline-offset-8">Description</h2>
                    <p className="text-gray-700 whitespace-pre-wrap">{character.bio}</p>
                </div>

                {/* Media Section */}
                <div className="lg:col-span-1 lg:row-span-2 flex flex-col space-y-2">
                    <h2 className="text-xl sm:text-2xl font-antonio text-gray-600 mb-2">Media</h2>
                    <div className="grid grid-cols-2 gap-2 lg:flex lg:flex-col">
                        {character.media.map((screen, i) => (
                            <div key={i} onClick={() => handleImageClick({
                                src: screen,
                                width: 320,
                                height: 240
                            })}>
                                <Image src={screen} width={321} height={171} className="rounded-md shadow-md border-2 border-orange-200" alt={`Media ${i}`} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {selectedImage && <Modal modalContent={selectedImage} onClose={() => setSelectedImage(null)} />}
        </div>
    );
}
