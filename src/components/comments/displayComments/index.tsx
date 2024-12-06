"use client";

import { useState } from "react";
import { rateComment } from "@/lib/api";
import { Comment, RatingAction } from "@/lib/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getCookie } from "cookies-next";
import EditComment from "@/components/comments/editComment"; // Ensure you have the EditComment component properly imported

type CommentProps = {
    comment: Comment;
    handleReload?: () => void;
    user?: string;
};

export default function CommentComponent({ comment, handleReload }: CommentProps) {
    const date_time = new Date(comment.timestamp);
    const user_data = getCookie("access_token") || "";
    const user = getCookie("id") || "";
    const formatted_time = date_time.toLocaleDateString() + " " + date_time.toLocaleTimeString();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false); // State to toggle EditComment visibility

    const handleRate = async (action: string) => {
        setError(null);
        setLoading(true);
        const payload: RatingAction = {
            action: action as RatingAction["action"],
        };
        try {
            await rateComment(payload, comment.id);
            if (handleReload) {
                handleReload();
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setError(error.response?.data || "Failed to post comment");
        } finally {
            setLoading(false);
        }
    };

    // Rating color based on its value
    const rating_color =
        comment.rating > 0
            ? "text-green-500"
            : comment.rating < 0
                ? "text-red-500"
                : "text-gray-500";

    return (
        <div className="pb-4 mb-4">
            {error && <p className="text-red-500">{error}</p>}

            {isEditing ? (
                // Display the EditComment component if editing
                <EditComment
                    comment={comment}
                    onClose={() => setIsEditing(false)} // Callback to close the EditComment component
                    onSave={() => {
                        setIsEditing(false);
                        if (handleReload) handleReload(); // Reload comments after saving
                    }}
                />
            ) : (
                // Display the comment details if not editing
                <>
                    <div className="flex justify-between items-center">
                        <div>
                            <Link
                                href={`/dashboard/${comment.user.user_id}`}
                                className="font-anton text-gray-800"
                            >
                                {comment.user.username}
                            </Link>
                            {/* Open Edit Comment */}
                            {user === comment.user.user_id && (
                                <Button
                                    variant="ghost"
                                    className="text-orange-600 p-2"
                                    onClick={() => setIsEditing(true)}
                                >
                                    &#128394;
                                </Button>
                            )}
                        </div>
                        <div className="flex flex-row gap-1 text-sm text-gray-500">
                            <p>{formatted_time}</p>
                            {comment.edited && <p>(Ed.)</p>}
                        </div>
                    </div>

                    <p className="text-gray-700">{comment.text}</p>

                    <div className="flex items-center space-x-2">
                        <Button
                            type="button"
                            onClick={() => handleRate("decrement")}
                            disabled={loading || !user_data}
                            variant="ghost"
                            className="text-gray-600 hover:text-red-600 p-2"
                        >
                            -
                        </Button>
                        <p className={`font-semibold ${rating_color} text-lg`}>
                            {comment.rating}
                        </p>
                        <Button
                            type="button"
                            onClick={() => handleRate("increment")}
                            disabled={loading || !user_data}
                            variant="ghost"
                            className="text-gray-600 hover:text-green-600 p-2"
                        >
                            +
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}
