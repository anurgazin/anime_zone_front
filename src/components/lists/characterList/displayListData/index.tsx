"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Card from "@/components/characters/card";
import { CharacterAPI, CharacterList, Comment, ListRatingAction, RatingAction } from "@/lib/types";
import CommentComponent from "@/components/comments/displayComments";
import WriteComment from "@/components/comments/writeComment";
import { useRouter } from "next/navigation";
import { rateList } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { getCookie } from "cookies-next";

type DisplayCharacterListDataProps = {
    charactersList: CharacterList
    characters: CharacterAPI[]
    comments: Comment[]
    user?: string;
};

export default function DisplayCharacterListData({ characters, charactersList, comments }: DisplayCharacterListDataProps) {
    const { toast } = useToast()
    const user = getCookie("access_token") || "";
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();
    const handleReload = () => {
        router.refresh();
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleRate = async (action: string) => {
        setLoading(true);
        const payload: ListRatingAction = {
            list_type: "character_list",
            action: action as RatingAction["action"]
        }
        try {
            await rateList(payload, charactersList.id)
            if (handleReload) {
                toast({
                    title: "Success",
                    description: 'Thank you for rating',
                })
                handleReload()
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data || 'Failed to rate list',
                variant: "destructive",
            })
        } finally {
            setLoading(false);
        }
    }

    // Pagination
    const totalItems = characters.length;
    const totalPages = Math.ceil(totalItems / 10);
    const paginatedData = characters.slice((currentPage - 1) * 10, currentPage * 10);

    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex flex-col items-center p-6 space-y-8">
            {/* Anime List Details */}
            <div className="w-full max-w-4xl p-6">
                <h1 className="text-3xl font-anton text-gray-800 mb-2">{charactersList?.name}</h1>
                <p className="text-lg font-antonio text-gray-600">
                    <span className="font-anton">Created By:</span> {charactersList?.user.username}
                </p>
                <div className="flex justify-between items-center">
                    <p className="text-lg font-antonio text-gray-600 "><span className="font-anton">Rating:</span> {charactersList?.rating}</p>
                    <div>
                        <Button
                            type="button"
                            onClick={() => handleRate("decrement")}
                            disabled={loading || !user}
                            variant="ghost"
                            className="text-gray-600 hover:text-red-600 p-2"
                        >
                            -
                        </Button>
                        <Button
                            type="button"
                            onClick={() => handleRate("increment")}
                            disabled={loading || !user}
                            variant="ghost"
                            className="text-gray-600 hover:text-green-600 p-2"
                        >
                            +
                        </Button>
                    </div>
                </div>
            </div>

            {/* Anime Cards */}
            <div className="flex flex-col sm:grid sm:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 p-4">
                {paginatedData.map((character) => (
                    <Card key={character.id} character={character} />
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center space-x-2">
                <Button
                    className={`px-4 py-2 bg-gray-300 rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                {pageNumbers.map((page) => (
                    <Button
                        key={page}
                        className={`px-4 py-2 ${currentPage === page
                            ? "bg-orange-400 text-white"
                            : "bg-gray-300 text-black"
                            }`}
                        onClick={() => handlePageChange(page)}
                    >
                        {page}
                    </Button>
                ))}
                <Button
                    className={`px-4 py-2 bg-gray-300 rounded ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>

            {/* Comments Section */}
            <div className="w-full max-w-4xl p-6 bg-white border border-gray-200 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Comments</h2>
                {user.length > 0 ? (
                    <WriteComment
                        contentType="character_list"
                        contentId={charactersList?.id || ""}
                        handleReload={handleReload}
                    />
                ) : (
                    <p className="text-gray-600 italic">You should be logged in to write a comment.</p>
                )}
                {comments && comments.length > 0 ? (
                    comments.map((comment, i) => (
                        <CommentComponent key={i} comment={comment} handleReload={handleReload} user={user} />
                    ))
                ) : (
                    <p className="text-gray-600 italic">No comments yet.</p>
                )}
            </div>
        </div>
    );
}
