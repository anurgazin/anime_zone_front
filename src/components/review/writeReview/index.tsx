"use client";

import { useState, FormEvent } from "react";
import { postAnimeRating } from "@/lib/api";
import { Button } from "../../ui/button";
import { AnimeAPI, PostRatingRequest } from "@/lib/types";
import { useRouter } from "next/navigation";
import Image from "next/image";

type WriteReviewProps = {
    anime: AnimeAPI;
}

export default function WriteReview({ anime }: WriteReviewProps) {
    const [text, setText] = useState<string>("");
    const [rating, setRating] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    // Handle form submission
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setLoading(true);

        const payload: PostRatingRequest = {
            score: rating,
            review: text
        }

        try {
            await postAnimeRating(anime.id, payload);
            setText(""); // Clear textarea on successful submission
            setRating(0)
            router.push(`/anime/${anime.id}`)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.response?.data || "Failed to post review");
        } finally {
            setLoading(false);
        }
    };

    // Handle clearing the textarea
    const handleCancel = () => {
        setText(""); // Clear the text input
        setRating(0)
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-1">
            {error && <p className="text-red-500">{error}</p>}
            <h2 className="text-2xl font-semibold text-center text-gray-800">Review For {anime.title}</h2>
            {/* Logo */}
            <div className='lg:col-span-2 flex justify-center'>
                <div className="relative w-full h-[350px]">
                    <Image src={anime.logo} priority fill={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="rounded-lg object-contain" alt="Anime Logo" />
                </div>
            </div>
            {/* Rating */}
            <div className="flex flex-col space-y-2">
                <label htmlFor="rating" className="text-gray-700 font-medium">Rating:</label>
                <input
                    type="number"
                    id="rating"
                    value={rating}
                    onChange={(e) => setRating(parseFloat(e.target.value) || 0)}
                    required
                    min={0}
                    max={10}
                    className="p-3 border rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
                    placeholder="Rate the Anime (0-10)"
                />
            </div>

            {/* Review Text */}
            <div className="flex flex-col space-y-2">
                <textarea
                    id="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="p-3 border rounded-md focus:ring-1 focus:ring-orange-400 focus:outline-none"
                    rows={4}
                    placeholder="Write your review here...(Optional)"
                />
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-2">
                {/* Cancel Button */}
                <Button
                    type="button"
                    onClick={handleCancel}
                    disabled={loading}
                    variant="ghost"
                    className="text-gray-600 p-3"
                >
                    {loading ? "Canceling..." : "Cancel"}
                </Button>
                {/* Submit Button */}
                <Button
                    type="submit"
                    disabled={loading}
                    className="bg-orange-400 text-white font-medium p-3 rounded-md hover:bg-orange-500 transition-colors duration-300"
                >
                    {loading ? "Posting..." : "Post Review"}
                </Button>
            </div>
        </form >
    );
}
