"use client";

import { useState, FormEvent } from "react";
import { postAnimeRating } from "@/lib/api";
import { Button } from "../../ui/button";
import { AnimeAPI, PostRatingRequest } from "@/lib/types";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type WriteReviewProps = {
    anime: AnimeAPI[];
};

export default function WriteReviewList({ anime }: WriteReviewProps) {
    const [selectedAnime, setSelectedAnime] = useState<AnimeAPI | null>(null);
    const [text, setText] = useState<string>("");
    const [rating, setRating] = useState<number>(0);
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
            review: text,
        };

        try {
            if (selectedAnime) {
                await postAnimeRating(selectedAnime.id, payload);
                setText("");
                setRating(0);
                router.push(`/dashboard`);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.response?.data || "Failed to post review");
        } finally {
            setLoading(false);
        }
    };

    // Clear the form
    const handleCancel = () => {
        setText("");
        setRating(0);
        setSelectedAnime(null);
    };

    // Handle anime selection
    const handleSelectChange = (id: string) => {
        const animeItem = anime.find((a) => a.id === id);
        setSelectedAnime(animeItem || null);
    };

    return (
        <div className="space-y-6 p-8 shadow-xl rounded-xl border border-gray-200 max-w-2xl mx-auto my-12 bg-white">
            {/* Back to Dashboard */}
            <Link
                href="/dashboard"
                className="text-gray-500 hover:text-orange-500 transition-colors duration-200"
            >
                <span className="text-orange-500">&#8592;</span> Back to Dashboard
            </Link>

            {/* Select Dropdown */}
            <Select onValueChange={handleSelectChange}>
                <SelectTrigger className="w-full border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-orange-400">
                    <SelectValue placeholder="Select an anime" />
                </SelectTrigger>
                <SelectContent className="max-h-60 overflow-y-auto border border-gray-300 bg-white rounded-lg">
                    <SelectGroup>
                        {anime.map((a) => (
                            <SelectItem key={a.id} value={a.id}>
                                {a.title}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>

            {selectedAnime && (
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && <p className="text-red-500 text-center">{error}</p>}

                    {/* Anime Title */}
                    <h2 className="text-2xl font-bold text-center text-gray-800">
                        {selectedAnime.title}
                    </h2>

                    {/* Anime Logo */}
                    <div className="flex justify-center">
                        <div className="relative w-full h-80 md:w-2/3">
                            <Image
                                src={selectedAnime.logo}
                                priority
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="rounded-lg object-contain"
                                alt="Anime Logo"
                            />
                        </div>
                    </div>

                    {/* Rating Input */}
                    <div className="flex flex-col">
                        <label htmlFor="rating" className="text-gray-700 font-medium">
                            Rating (0-10):
                        </label>
                        <input
                            type="number"
                            id="rating"
                            value={rating}
                            onChange={(e) => setRating(parseFloat(e.target.value) || 0)}
                            required
                            min={0}
                            max={10}
                            step={0.5}
                            className="border rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                            placeholder="Rate the anime"
                        />
                    </div>

                    {/* Review Textarea */}
                    <div className="flex flex-col">
                        <label htmlFor="text" className="text-gray-700 font-medium">
                            Your Review:
                        </label>
                        <textarea
                            id="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="border rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                            rows={6}
                            placeholder="Write your review..."
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end space-x-4">
                        <Button
                            type="button"
                            onClick={handleCancel}
                            disabled={loading}
                            variant="ghost"
                            className="text-gray-500 hover:text-gray-800 transition duration-200 p-3"
                        >
                            {loading ? "Canceling..." : "Cancel"}
                        </Button>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="bg-orange-500 text-white hover:bg-orange-600 transition duration-200 rounded-lg p-3"
                        >
                            {loading ? "Posting..." : "Submit Review"}
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
}
