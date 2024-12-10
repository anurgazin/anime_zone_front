"use client"
import Loading from "@/components/loading";
import Error from "@/components/error";
import { getReviewById } from "@/lib/api";
import { Rating } from "@/lib/types";
import { useEffect, useState } from "react";
import EditReviewForm from "@/components/review/editReviewById";

export default function EditReview({ params }: { params: { id: string } }) {
    const review_id = params.id;
    const [review, setReview] = useState<Rating>()
    const [loading, setLoading] = useState<boolean>(true); // State for loading status
    const [error, setError] = useState<string>(""); // State for error handling

    useEffect(() => {
        const fetchAnime = async () => {
            try {
                const anime_response = await getReviewById(review_id)
                setReview(anime_response.data)
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch review.");
                setLoading(false);
            }
        }
        fetchAnime();
    }, [review_id])

    if (loading) return <Loading />;
    if (error) return <Error error={error} />;

    if (review) {
        return (
            <div>
                <EditReviewForm review={review} />
            </div>
        );
    }

    return <p>Anime not found.</p>;
}
