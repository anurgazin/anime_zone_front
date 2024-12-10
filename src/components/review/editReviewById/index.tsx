"use client";

import { useState, FormEvent } from "react";
import { editAnimeReview } from "@/lib/api";
import { Button } from "../../ui/button";
import { PostRatingRequest, Rating } from "@/lib/types";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

type EditReviewProps = {
    review: Rating
}

export default function EditReviewForm({ review }: EditReviewProps) {
    const [text, setText] = useState<string>(review.review || "");
    const [rating, setRating] = useState<number>(review.score);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast()

    const router = useRouter();

    // Handle form submission
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setLoading(true);

        const payload: PostRatingRequest = {
            score: rating,
            review: text
        };

        try {
            await editAnimeReview(payload, review.id);
            setText("");
            setRating(0);
            toast({
                title: "Success",
                description: "Review Updated Successfully!",
            });
            router.push(`/anime/${review.anime_id}`);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.response?.data || "Failed to post review");
            toast({
                title: "Error",
                description: err.response?.data || "Failed to post review",
                variant: "destructive",
            })
        } finally {
            setLoading(false);
        }
    };

    // Handle clearing the textarea
    const handleCancel = () => {
        setText("");
        setRating(0);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 shadow-md rounded-md border border-gray-200 max-w-lg mx-auto m-4">
            {/* Back to Dashboard */}
            <Link
                href={`/anime/${review.anime_id}`}
                className="text-gray-500 hover:text-orange-500 transition-colors duration-200"
            >
                <span className="text-orange-500">&#8592;</span> Back to Page
            </Link>
            {error && <p className="text-red-500 text-center text-sm">{error}</p>}

            {/* Rating Input */}
            <div className="flex flex-col">
                <label htmlFor="rating" className="text-gray-700 font-medium">Rating (0-10):</label>
                <input
                    type="number"
                    id="rating"
                    value={rating}
                    onChange={(e) => setRating(parseFloat(e.target.value) || 0)}
                    required
                    min={0}
                    max={10}
                    step={0.5}
                    className="p-2 border rounded focus:ring-2 focus:ring-orange-400 focus:outline-none text-sm"
                    placeholder="Enter your rating"
                />
            </div>

            {/* Review Textarea */}
            <div className="flex flex-col mt-2">
                <label htmlFor="text" className="text-gray-700 font-medium">Your Review:</label>
                <textarea
                    id="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="p-2 border rounded focus:ring-2 focus:ring-orange-400 focus:outline-none text-sm"
                    rows={10}
                    placeholder="Write your review here...(optional)"
                />
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-2 mt-6">
                {/* Cancel Button */}
                <Button
                    type="button"
                    onClick={handleCancel}
                    disabled={loading}
                    variant="ghost"
                    className="text-gray-500 hover:text-gray-900 transition-colors duration-200 rounded-lg p-3"
                >
                    {loading ? "Canceling..." : "Cancel"}
                </Button>

                {/* Submit Button */}
                <Button
                    type="submit"
                    disabled={loading}
                    className="bg-orange-400 text-white font-medium p-3 rounded-lg hover:bg-orange-500 transition-colors duration-200"
                >
                    {loading ? "Posting..." : "Review"}
                </Button>
            </div>
        </form>
    );
}
