"use client";

import { Comment } from "@/lib/types";
import Link from "next/link";

type CommentProps = {
    comment: Comment;
}

export default function CommentComponent({ comment }: CommentProps) {
    const date_time = new Date(comment.timestamp);
    const formatted_time = date_time.toLocaleDateString() + " " + date_time.toLocaleTimeString();
    // Rating color based on its value
    const rating_color = comment.rating > 0
        ? "text-green-500"
        : comment.rating < 0
            ? "text-red-500"
            : "text-gray-500";

    return (
        <div className="pb-4 mb-4">
            {/* Header with Username and Timestamp */}
            <div className="flex justify-between items-center">
                <Link href={`/dashboard/${comment.user.user_id}`}>
                    <p className="font-semibold text-gray-800">{comment.user.username}</p>
                </Link>
                <p className="text-sm text-gray-500">{formatted_time}</p>
            </div>

            {/* Comment Text */}
            <p className="text-gray-700">{comment.text}</p>

            {/* Rating */}
            <p className={`font-semibold ${rating_color}`}>{comment.rating}</p>
        </div>
    );
}
