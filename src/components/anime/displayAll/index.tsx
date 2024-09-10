import { anime_data } from "@/tmp_data/anime/anime_data";
import { Anime } from "@/lib/types";
import Card from "../card";

export default function DisplayAll() {
    const data: Anime[] = anime_data;
    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 auto-rows-auto ">
            {data.map(Card)}
        </div>
    )
}