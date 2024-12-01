"use client";

import { useState, useRef, useEffect } from "react";
import { Rating } from "@/lib/types";

type RatingProps = {
    rating: Rating;
};

export default function RatingComponent({ rating }: RatingProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [maxHeight, setMaxHeight] = useState("70px");
    const textRef = useRef<HTMLParagraphElement>(null);

    const date_time = new Date(rating.timestamp);
    const formatted_time = `${date_time.toLocaleDateString()} ${date_time.toLocaleTimeString()}`;

    // Character limit for the collapsed view
    const charLimit = 300;
    const isLongReview = rating.review && rating.review.length > charLimit;
    const displayText = isExpanded
        ? rating.review
        : `${rating.review?.slice(0, charLimit)}${isLongReview ? "..." : ""}`;

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        if (textRef.current) {
            setMaxHeight(isExpanded ? `${textRef.current.scrollHeight}px` : "70px");
        }
    }, [isExpanded]);

    return (
        <div className="pb-6 mb-6 border-b border-gray-200">
            {/* Header with Username and Timestamp */}
            <div className="flex justify-between items-center mb-2">
                <p className="font-anton text-gray-800">{rating.user.username}</p>
                <p className="text-sm text-gray-500">{formatted_time}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center mb-4">
                <span className="font-semibold text-orange-400">Rating:</span>
                <span className="ml-2 text-gray-800">{rating.score} / 10</span>
            </div>

            {/* Animated Text Review */}
            {rating.review ? (
                <div>
                    <div
                        className={`overflow-hidden transition-max-height duration-300 ease-in-out`}
                        style={{ maxHeight }}
                    >
                        <p ref={textRef} className="text-gray-700 italic whitespace-pre-line">
                            {displayText}
                        </p>
                    </div>
                    {isLongReview && (
                        <button
                            onClick={handleToggle}
                            className="text-orange-500 font-medium mt-2 hover:underline"
                        >
                            {isExpanded ? "Read less" : "Read full"}
                        </button>
                    )}
                </div>
            ) : (
                <p className="text-gray-400 italic">No text review</p>
            )}
        </div>
    );
}
