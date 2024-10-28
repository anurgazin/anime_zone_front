"use client";

import { Rating } from "@/lib/types";

type RatingProps = {
    rating: Rating
}
export default function RatingComponent({ rating }: RatingProps) {
    const date_time = new Date(rating.timestamp)
    console.log(rating)
    const time = date_time.toLocaleDateString() + " " + date_time.toLocaleTimeString()
    return (
        <>
            <p>{rating.user.username}</p>
            <p>{time}</p>
            <p>Rating: {rating.score}</p>
            {rating.review && (<p>{rating.review}</p>)}
        </>
    );
}
