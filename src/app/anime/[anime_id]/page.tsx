import DisplaySingle from "@/components/anime/displaySingle";
import { anime_data } from "@/tmp_data/anime/anime_data";
export default function SingleAnime({ params }: { params: { anime_id: string } }) {
    const anime_id = params.anime_id;
    const anime = anime_data.find(item => item.id === anime_id);
    if (anime_id && anime) {
        return (
            <div>
                <DisplaySingle anime={anime} />
            </div>
        )
    }
}