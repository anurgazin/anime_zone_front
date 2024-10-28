"use client";

import { Comment } from "@/lib/types";

type CommentProps = {
    comment: Comment
}
export default function CommentComponent({ comment }: CommentProps) {
    const date_time = new Date(comment.timestamp)
    const time = date_time.toLocaleDateString() + " " + date_time.toLocaleTimeString()
    return (
        <>
            <p>{comment.user.username}</p>
            <p>{time}</p>
            <p>{comment.text}</p>
            <p>Rating: {comment.rating}</p>
        </>
    );
}
