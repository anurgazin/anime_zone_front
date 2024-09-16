"use client"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { genres, release_types, status, esrb, studios } from "@/tmp_data/anime/anime_data"

export default function AnimeFilterSort() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleFilters = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="lg:sticky h-[90vh] lg:top-[64px] lg:bottom-0 lg:overflow-y-auto lg:p-6">
            {/* Toggle Button for Mobile */}
            <div className="lg:hidden fixed lg:relative bottom-0 left-0 w-full bg-orange-400 text-white p-3 text-lg rounded-none lg:rounded-md z-50">
                <button onClick={toggleFilters} className="w-full text-center">
                    {isOpen ? "Hide Filters" : "Show Filters"}
                </button>
            </div>

            {/* Scrollable Filters Section */}
            <div className={`${isOpen ? "block fixed bottom-12 left-0 w-full bg-white lg:relative lg:bottom-auto p-4 lg:p-0 h-[80vh] overflow-y-scroll" : "hidden"} lg:block`}>
                <h1 className="text-xl font-antonio">Filters / Sort By</h1>

                {/* Sort By / Per Page */}
                <div className="flex flex-col space-y-4 mt-4">
                    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 items-center">
                        <Select>
                            <SelectTrigger className="w-[200px] bg-gray-100 border-2 border-black p-2 rounded-2xl">
                                <SelectValue placeholder="Sort By" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                                <SelectItem value="rating">Rating</SelectItem>
                                <SelectItem value="episodes">Episodes</SelectItem>
                                <SelectItem value="release_date">Release Date</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select>
                            <SelectTrigger className="w-[200px] bg-gray-100 border-2 border-black p-2 rounded-2xl">
                                <SelectValue placeholder="Per Page" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="15">15</SelectItem>
                                <SelectItem value="20">20</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col space-y-6">
                        {/* Genre Filters */}
                        <div className="bg-white border-2 border-black p-2 rounded font-antonio">
                            <h2 className="text-lg font-semibold mb-2">Genres</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                {genres.map((genre, id) => (
                                    <div key={id} className="flex items-center space-x-2">
                                        <Checkbox id={genre} className="border-2 border-black" />
                                        <label htmlFor={genre} className="text-sm">{genre}</label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Studio Filters */}
                        <div className="bg-white border-2 border-black p-2 rounded font-antonio">
                            <h2 className="text-lg font-medium mb-2">Studios</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                {studios.map((studio, id) => (
                                    <div key={id} className="flex items-center space-x-2">
                                        <Checkbox id={studio} className="border-2 border-black"/>
                                        <label htmlFor={studio} className="text-sm">{studio}</label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Types Filters */}
                        <div className="bg-white border-2 border-black p-2 rounded font-antonio">
                            <h2 className="text-lg font-medium mb-2">Types</h2>
                            <RadioGroup defaultValue="none" className="flex flex-row space-x-4">
                                {release_types.map((type, id) => (
                                    <div key={id} className="flex items-center space-x-2">
                                        <RadioGroupItem value={type} id={type} className="border-2 border-black"/>
                                        <label htmlFor={type} className="text-sm">{type.toUpperCase()}</label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>

                        {/* Status Filters */}
                        <div className="bg-white border-2 border-black p-2 rounded font-antonio">
                            <h2 className="text-lg font-medium mb-2">Status</h2>
                            <RadioGroup defaultValue="none" className="flex flex-row space-x-4">
                                {status.map((stat, id) => (
                                    <div key={id} className="flex items-center space-x-2">
                                        <RadioGroupItem value={stat} id={stat} className="border-2 border-black"/>
                                        <label htmlFor={stat} className="text-sm">{stat.toUpperCase()}</label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>

                        {/* ESRB Filters */}
                        <div className="bg-white border-2 border-black p-2 rounded font-antonio">
                            <h2 className="text-lg font-medium mb-2">ESRB Ratings</h2>
                            <RadioGroup defaultValue="none" className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                {esrb.map((rating, id) => (
                                    <div key={id} className="flex items-center space-x-2">
                                        <RadioGroupItem value={rating} id={rating} className="border-2 border-black"/>
                                        <label htmlFor={rating} className="text-sm">{rating}</label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row justify-center lg:justify-end space-x-2 mt-4">
                    <Button variant="outline" className="bg-orange-400 text-white font-antonio text-lg tracking-wide p-4">Submit</Button>
                    <Button variant="outline" className="font-antonio text-lg tracking-wide border-2 border-black p-4">Clear</Button>
                </div>
            </div>
        </div>
    );
}
