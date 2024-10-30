"use client";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Card from "../card";
import { CharacterAPI } from "@/lib/types";
import { getAllCharacters } from "@/lib/api";
import Loading from "@/components/loading";
import Error from "@/components/error";

export default function DisplayAll() {
    const [characterList, setCharacterList] = useState<CharacterAPI[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await getAllCharacters();
                setCharacterList(response.data);
            } catch (error) {
                setError("Failed to load characters data.");
            } finally {
                setLoading(false);
            }
        };

        fetchCharacters();
    }, []);


    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Pagination
    const totalItems = characterList.length;
    const totalPages = Math.ceil(totalItems / 10);
    const paginatedData = characterList.slice((currentPage - 1) * 10, currentPage * 10);

    // Pagination Buttons
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    // Loading and Error States
    if (loading) return <Loading />;
    if (error) return <Error error={error} />;

    return (
        <div className="flex flex-col justify-center">
            {/* Character Cards */}
            <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 p-4">
                {paginatedData.map((character) => (
                    <Card key={character.id} character={character} />
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="h-[84px] col-span-full lg:col-span-3 flex justify-center space-x-2 m-4 font-anton">
                <Button
                    className={`px-4 py-2 bg-gray-300 rounded ${currentPage === 1 ? '-z-10 opacity-50 cursor-not-allowed' : ''}`}
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    variant="outline"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                {/* Page Number */}
                {pageNumbers.map((page) => (
                    <Button
                        key={page}
                        className={`px-4 py-2 ${currentPage === page ? 'bg-orange-400 text-white' : 'bg-gray-300 text-black'}`}
                        onClick={() => handlePageChange(page)}
                    >
                        {page}
                    </Button>
                ))}

                <Button
                    className={`px-4 py-2 bg-gray-300 rounded ${currentPage === totalPages ? '-z-10 opacity-50 cursor-not-allowed' : ''}`}
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    variant="outline"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
