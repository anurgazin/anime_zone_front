"use client";
import { useState } from "react";
import { AnimeAPI, Filters } from "@/lib/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Card from "../card";
import AnimeFilterSort from "./filterSort";

type AnimeDisplayAllProps = {
    anime: AnimeAPI[]
}

export default function DisplayAll({ anime }: AnimeDisplayAllProps) {
    const [filters, setFilters] = useState<Filters>({
        genre: [],
        studio: [],
        releaseType: 'none',
        status: 'none',
        esrb: 'none',
    });

    const [sortBy, setSortBy] = useState<string>('default');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(12);


    const handleFilterChange = (filterType: keyof Filters, value: string[] | string) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterType]: value,
        }));
    };

    const handleSortChange = (sortValue: string) => {
        setSortBy(sortValue);
    };

    const handleItemsPerPageChange = (value: number) => {
        setItemsPerPage(value);
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Filters
    const filteredData = anime.filter((anime: AnimeAPI) => {
        return (
            (filters.genre.length === 0 || filters.genre.every(genre => anime.genre.includes(genre))) &&
            (filters.studio.length === 0 || filters.studio.every(studio => anime.studio.includes(studio))) &&
            (filters.releaseType === 'none' || anime.type === filters.releaseType) &&
            (filters.status === 'none' || anime.status === filters.status) &&
            (filters.esrb === 'none' || anime.esrb === filters.esrb)
        );
    });

    // Sorting
    const sortedData = filteredData.sort((a, b) => {
        if (sortBy === 'rating') {
            return b.average_rating - a.average_rating;
        } else if (sortBy === 'episodes') {
            return b.episodes - a.episodes;
        } else if (sortBy === 'release_date') {
            return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
        }
        return 0;
    });

    // Pagination
    const totalItems = sortedData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginatedData = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);


    return (
        <div className="flex flex-col lg:grid lg:grid-cols-5 lg:grid-rows-auto gap-3">
            {/* Anime Cards */}
            <div className="flex flex-col lg:col-span-4 lg:grid lg:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 p-4">
                {paginatedData.map((anime) => (
                    <Card key={anime.id} anime={anime} />
                ))}
            </div>

            {/* Filter and Sort */}
            <div className="lg:col-span-1">
                <AnimeFilterSort
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onSortChange={handleSortChange}
                    sortBy={sortBy}
                    onItemsPerPageChange={handleItemsPerPageChange}
                />
            </div>

            {/* Pagination Controls */}
            <div className="h-[100px] lg:col-span-3 flex justify-center content-start space-x-2 font-anton">
                <Button
                    className={`px-4 py-2 bg-gray-300 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                    className={`px-4 py-2 bg-gray-300 rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
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
