"use client";

import { Rating } from "@/lib/types";

type RatingProps = {
    rating: Rating
}

export default function RatingComponent({ rating }: RatingProps) {
    const date_time = new Date(rating.timestamp);
    const formatted_time = date_time.toLocaleDateString() + " " + date_time.toLocaleTimeString();

    return (
        <div className="pb-4 mb-4">
            {/* Header with Username and Timestamp */}
            <div className="flex justify-between items-center">
                <p className="font-semibold text-gray-800">{rating.user.username}</p>
                <p className="text-sm text-gray-500">{formatted_time}</p>
            </div>
            {/* Rating */}
            <div className="flex items-center mb-2">
                <span className="font-semibold text-orange-300">Rating:</span>
                <span className="ml-2 text-gray-800">{rating.score} / 10</span>
            </div>
            {/* Text Review */}
            {rating.review && (
                <p className="text-gray-700 italic">{rating.review}</p>
            )}
        </div>
    );
}
