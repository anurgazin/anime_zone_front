"use client";

import { useState, FormEvent } from "react";
import { editComment } from "@/lib/api";
import { Button } from "../../ui/button";
import { Comment, UpdateCommentType } from "@/lib/types";

type EditCommentFormProps = {
    comment: Comment;
    onClose: () => void;
    onSave: () => void;
}

export default function EditComment({ comment, onClose, onSave }: EditCommentFormProps) {
    const [text, setText] = useState<string>(comment.text);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Handle form submission
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setLoading(true);

        const payload: UpdateCommentType = {
            text: text
        }

        try {
            await editComment(payload, comment.id);
            onSave()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.response?.data || "Failed to post comment");
        } finally {
            setLoading(false);
        }
    };

    // Handle clearing the textarea
    const handleCancel = () => {
        onClose()
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
                    {loading ? "Edit..." : "Edit Comment"}
                </Button>
            </div>
        </form>
    );
}
