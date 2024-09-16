"use client";
import { useState } from "react";
import { anime_data } from "@/tmp_data/anime/anime_data";
import { Anime, Filters } from "@/lib/types";
import Card from "../card";
import AnimeFilterSort from "./filterSort";

export default function DisplayAll() {
    const [filters, setFilters] = useState<Filters>({
        genre: [],
        studio: [],
        releaseType: 'none',
        status: 'none',
        esrb: 'none',
    });

    const [sortBy, setSortBy] = useState<string>('default');

    const handleFilterChange = (filterType: keyof Filters, value: string[] | string) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterType]: value,
        }));
    };

    const handleSortChange = (sortValue: string) => {
        setSortBy(sortValue);
    };

    // Apply filters
    let filteredData = anime_data.filter((anime: Anime) => {
        return (
            (filters.genre.length === 0 || filters.genre.every(genre => anime.genre.includes(genre))) &&
            (filters.studio.length === 0 || filters.studio.every(studio => anime.studio.includes(studio))) &&
            (filters.releaseType === 'none' || anime.type === filters.releaseType) &&
            (filters.status === 'none' || anime.status === filters.status) &&
            (filters.esrb === 'none' || anime.esrb === filters.esrb)
        );
    });

    // Apply sorting
    filteredData = filteredData.sort((a, b) => {
        if (sortBy === 'rating') {
            return b.rating - a.rating;
        } else if (sortBy === 'episodes') {
            return b.episodes - a.episodes;
        } else if (sortBy === 'release_date') {
            return new Date(b.release_date).getTime() - new Date(a.release_date).getTime(); // Sort by release date (descending)
        }
        return 0;
    });

    return (
        <div className="grid lg:grid-cols-5 grid-rows-auto gap-4">
            {/* Anime Cards */}
            <div className="col-span-full lg:col-span-3 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 p-4">
                {filteredData.map((anime) => (
                    <Card key={anime.id} anime={anime} />
                ))}
            </div>
            {/* Filter and Sort */}
            <div className="col-span-full lg:col-span-2">
                <AnimeFilterSort
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onSortChange={handleSortChange}
                    sortBy={sortBy}
                />
            </div>
        </div>
    );
}
