"use client";
import Image from 'next/image';
import { AnimeList, CharacterList, Comment, Rating, User } from "@/lib/types";
import { useState } from 'react';
import Modal from '@/components/modal';
import CharacterListDisplay from '@/components/lists/characterList/displayListTitle';
import CommentComponent from '@/components/comments/displayComments';
import AnimeListDisplay from '@/components/lists/animeList/displayListTitle';
import RatingComponent from '@/components/review/displayReview';

type img = {
    src: string;
    width: number;
    height: number;
}

type UserPageProps = {
    user: User;
    comments: Comment[] | undefined;
    character_lists: CharacterList[] | undefined;
    anime_lists: AnimeList[] | undefined;
    reviews: Rating[] | undefined;
};

export default function UserPage({ user, comments, character_lists, anime_lists, reviews }: UserPageProps) {
    const [selectedImage, setSelectedImage] = useState<img | null>(null);
    const handleImageClick = (image: img) => {
        setSelectedImage(image);
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 grid-rows-auto gap-4">
            {/* Top Banner */}
            <div className="relative overflow-hidden -z-10 h-48 sm:h-56 lg:col-span-5">
                <Image src={user.logo} fill={true} className="blur-sm object-cover" alt="User Banner" />
            </div>

            {/* Information */}
            <div className="lg:col-span-5 grid grid-cols-1 lg:grid-cols-5 lg:grid-rows-auto gap-5 px-4 sm:px-10 py-4">
                {/* Logo section */}
                <div className="lg:col-span-1 flex justify-center lg:justify-start relative w-full h-[350px]"
                    onClick={() => handleImageClick({
                        src: user.logo,
                        width: 0,
                        height: 0
                    })}
                >
                    <Image src={user.logo} priority fill={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="rounded-lg shadow-lg object-cover" alt="User Logo" />
                </div>

                {/* Data info */}
                <div className="lg:col-span-2 lg:row-span-1 p-4 rounded-lg border-2 border-orange-200 p-4 rounded-lg lg:border-none">
                    <h1 className="text-2xl sm:text-3xl font-anton text-gray-800 mb-4">{user.username}</h1>
                    <div className="text-lg sm:text-xl font-antonio text-gray-600 grid grid-cols-1 gap-4">
                        <p><span className="font-semibold">Role:</span> {user.role}</p>
                    </div>
                </div>

                {/* Description */}
                <div className="lg:col-span-5 lg:row-start-2 border-2 border-orange-200 p-4 rounded-lg">
                    <h2 className="text-xl sm:text-2xl font-anton text-gray-800 mb-2 lg:underline lg:decoration-orange-300 lg:underline-offset-8">Bio</h2>
                    <p className="text-gray-700 whitespace-pre-wrap">{user.bio}</p>
                </div>

                {/* Comments and Reviews Section */}
                <div className="lg:col-span-5 lg:row-start-3 grid grid-cols-1 lg:grid-cols-2 grid-rows-auto gap-2">
                    {/* Comments */}
                    <div className="border-2 border-orange-200 p-4 shadow-md bg-white rounded-lg">
                        <h2 className="text-xl sm:text-2xl font-anton text-gray-800 mb-4 underline decoration-orange-300 underline-offset-8">Comments</h2>
                        <div className='pr-4 max-h-[400px] overflow-x-hidden overflow-y-auto'>
                            {comments && comments.length > 0 ? (
                                comments.map((comment, i) => (
                                    <CommentComponent key={i} comment={comment} />
                                ))
                            ) : (
                                <p className="text-gray-600 italic">No comments yet.</p>
                            )}
                        </div>
                    </div>
                    {/* Reviews */}
                    <div className="border-2 border-orange-200 shadow-md bg-white p-4 rounded-lg">
                        <h2 className="text-xl sm:text-2xl font-anton text-gray-800 mb-4 underline decoration-orange-300 underline-offset-8">Reviews</h2>
                        <div className='pr-4 max-h-[400px] overflow-x-hidden overflow-y-auto'>
                            {reviews && reviews.length > 0 ? (
                                reviews.map((r, i) => (
                                    r.review && (<RatingComponent key={i} rating={r} />)
                                ))
                            ) : (
                                <p className="text-gray-600 italic">No reviews yet.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Lists */}
                <div className="lg:col-span-5 lg:row-start-4 grid grid-cols-1 lg:grid-cols-2 grid-rows-auto gap-2">
                    {/* AnimeLists */}
                    <div className="border-2 border-orange-200 p-4 shadow-md bg-white rounded-lg">
                        <h2 className="text-xl sm:text-2xl font-anton text-gray-800 mb-4 underline decoration-orange-300 underline-offset-8">Character Lists</h2>
                        <div className='pr-4 max-h-[400px] overflow-x-hidden overflow-y-auto'>
                            {anime_lists && anime_lists.length > 0 ? (
                                anime_lists.map((a, i) => (
                                    <AnimeListDisplay key={i} animeList={a} />
                                ))
                            ) : (
                                <p className="text-gray-600 italic">No character lists yet.</p>
                            )}
                        </div>
                    </div>

                    {/* CharacterLists */}
                    <div className="border-2 border-orange-200 p-4 shadow-md bg-white rounded-lg">
                        <h2 className="text-xl sm:text-2xl font-anton text-gray-800 mb-4 underline decoration-orange-300 underline-offset-8">Character Lists</h2>
                        <div className='pr-4 max-h-[400px] overflow-x-hidden overflow-y-auto'>
                            {character_lists && character_lists.length > 0 ? (
                                character_lists.map((a, i) => (
                                    <CharacterListDisplay key={i} characterList={a} />
                                ))
                            ) : (
                                <p className="text-gray-600 italic">No character lists yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {selectedImage && <Modal modalContent={selectedImage} onClose={() => setSelectedImage(null)} />}
        </div >
    );
}
