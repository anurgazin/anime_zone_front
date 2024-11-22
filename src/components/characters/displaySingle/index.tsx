"use client";
import Image from 'next/image';
import { CharacterAPI, CharacterList, Comment } from "@/lib/types";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Modal from '@/components/modal';
import Link from 'next/link';
import CharacterListDisplay from '@/components/lists/characterList/displayList';
import CommentComponent from '@/components/comments/displayComments';
import WriteComment from '@/components/comments/writeComment';
import AddToCharactersList from '@/components/lists/characterList/addToList';
import { useRouter } from 'next/navigation';

type img = {
    src: string;
    width: number;
    height: number;
}

type DisplaySingleProps = {
    character: CharacterAPI;
    comments: Comment[] | undefined;
    lists: CharacterList[] | undefined;
    user: string;
};

export default function DisplaySingle({ character, comments, lists, user }: DisplaySingleProps) {
    const from_anime_links = character.from_anime.map((anime) => (
        <Link key={anime.id} href={`/anime/${anime.id}`} className="underline">
            {anime.title}
        </Link>
    ));

    const router = useRouter()
    const handleReload = () => {
        router.refresh();
    };

    const [show, setShow] = useState(false);
    const toggleShow = () => {
        setShow(!show);
    }

    const [selectedImage, setSelectedImage] = useState<img | null>(null);
    const handleImageClick = (image: img) => {
        setSelectedImage(image);
    }

    return (
        <div className="grid grid-cols-1 grid-rows-auto gap-4">
            {/* Top Banner */}
            <div className="relative overflow-hidden -z-10 h-24 sm:h-48">
                <Image src={character.logo} fill={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="blur-sm object-cover" alt="Character Banner" />
            </div>

            {/* Information */}
            <div className="flex flex-col gap-4 pt-1 p-6">
                <div className='grid grid-cols-1 lg:grid-cols-10 gap-8'>
                    {/* Logo section */}
                    <div className='lg:col-span-2 flex justify-center'>
                        <div className="relative w-full h-[350px]"
                            onClick={() => handleImageClick({
                                src: character.logo,
                                width: 0,
                                height: 0
                            })}
                        >
                            <Image src={character.logo} priority fill={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="rounded-lg object-contain lg:hover:scale-[1.025] active:scale-[1.025] transition-scale duration-200" alt={`${character.first_name} ${character.last_name}`} />
                        </div>
                    </div>

                    {/* Data info */}
                    <div className="lg:col-span-8 p-4 rounded-lg border-2 border-orange-200 lg:border-none">
                        <h1 className="text-2xl sm:text-3xl font-anton text-gray-800 mb-4">{character.first_name} {character.last_name}</h1>
                        <div className="text-lg sm:text-xl font-antonio text-gray-600 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <p><span className="font-semibold">First Name:</span> {character.first_name}</p>
                                <p><span className="font-semibold">Last Name:</span> {character.last_name}</p>
                                <p><span className="font-semibold">From:</span> {from_anime_links}</p>
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
                </div>

                {/* Media Section */}
                <div className="border-2 border-orange-200 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl sm:text-2xl font-anton text-gray-800 mb-2 underline decoration-orange-300 underline-offset-8">
                        Media
                    </h2>
                    <div className="flex gap-4 mb-2 overflow-x-auto overflow-y-hidden snap-x snap-mandatory">
                        {character.media.map((screen, i) => (
                            <div key={i} onClick={() => handleImageClick({
                                src: screen,
                                width: 1280,
                                height: 720,
                            })} className="flex-shrink-0 snap-center snap-always scroll-smooth lg:snap-align-none relative w-[300px] lg:w-[320px] h-[180px]">
                                <Image src={screen}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="rounded-md object-cover hover:scale-[1.025] active:scale-[1.025] transition-transform duration-200"
                                    alt={`Media ${i}`} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Description */}
                <div className='border-2 border-orange-200 p-4 shadow-md bg-white rounded-lg'>
                    <h2 className="text-xl sm:text-2xl font-anton text-gray-800 mb-2 lg:underline lg:decoration-orange-300 lg:underline-offset-8">Biography</h2>
                    <p className="text-gray-700 whitespace-pre-wrap">{character.bio}</p>
                </div>

                {/* Comments and Lists Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-auto gap-2">
                    {/* Comments */}
                    <div className="border-2 border-orange-200 p-4 shadow-md bg-white rounded-lg space-y-4">
                        <h2 className="text-xl sm:text-2xl font-anton text-gray-800 mb-4 underline decoration-orange-300 underline-offset-8">Comments</h2>
                        {user.length > 0 ? (<WriteComment contentType='character' contentId={character.id} handleReload={handleReload} />) : (
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

                    {/* CharacterLists */}
                    <div className="border-2 border-orange-200 p-4 shadow-md bg-white rounded-lg">
                        <h2 className="text-xl sm:text-2xl font-anton text-gray-800 mb-4 underline decoration-orange-300 underline-offset-8">Character Lists</h2>
                        {user && <AddToCharactersList characterId={character.id} handleReload={handleReload} />}
                        {lists && lists.length > 0 ? (
                            lists.map((a, i) => (
                                <CharacterListDisplay key={i} characterList={a} />
                            ))
                        ) : (
                            <p className="text-gray-600 italic">No character lists yet.</p>
                        )}
                    </div>
                </div>
            </div>
            {selectedImage && <Modal modalContent={selectedImage} onClose={() => setSelectedImage(null)} />}
        </div>
    );
}
