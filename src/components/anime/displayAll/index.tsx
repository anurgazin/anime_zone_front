import { anime_data } from "@/tmp_data/anime/anime_data";
import { Anime } from "@/lib/types";
import Card from "../card";
import AnimeFilterSort from "./filterSort";

export default function DisplayAll() {
    const data: Anime[] = anime_data;
    return (
        <div className="grid lg:grid-cols-5 grid-rows-auto gap-4">
            {/* Anime Cards */}
            <div className="col-span-full lg:col-span-3 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 p-4">
                {data.map(Card)}
            </div>
            {/* Filter */}
            <div className="col-span-full lg:col-span-2">
                <AnimeFilterSort />
            </div>
        </div>
    );
}
