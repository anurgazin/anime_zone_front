"use client";

import { useState, FormEvent } from "react";
import { postComment } from "@/lib/api";
import { Button } from "../../ui/button";
import { PostCommentType } from "@/lib/types";

interface CommentFormProps {
    contentType: PostCommentType["type"];
    contentId: string;
    handleReload: () => void;
}

export default function WriteComment({ contentType, contentId, handleReload }: CommentFormProps) {
    const [text, setText] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Handle form submission
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setLoading(true);

        const payload: PostCommentType = {
            type: contentType,
            content_id: contentId,
            text: text,
        };

        try {
            await postComment(payload);
            setText(""); // Clear textarea on successful submission
            handleReload();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.response?.data || "Failed to post comment");
        } finally {
            setLoading(false);
        }
    };

    // Handle clearing the textarea
    const handleCancel = () => {
        setText(""); // Clear the text input
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-1">
            {error && <p className="text-red-500">{error}</p>}

            {/* Comment Text */}
            <div className="flex flex-col space-y-2">
                <textarea
                    id="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                    className="p-3 border rounded-md focus:ring-1 focus:ring-orange-400 focus:outline-none"
                    rows={4}
                    placeholder="Write your comment here..."
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
                    {loading ? "Posting..." : "Post Comment"}
                </Button>
            </div>
        </form>
    );
}
