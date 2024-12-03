import EditAnimeListForm from "@/components/lists/animeList/editAnimeList";
import { getAnimeList } from "@/lib/api";
import { AnimeList } from "@/lib/types";
import Error from "@/components/error";

export default async function EditAnimeList({ params }: { params: { id: string } }) {
    const id = params.id;
    try {
        const anime_list: AnimeList = (await getAnimeList(id)).data;
        if (anime_list) {
            return (
                <div>
                    <EditAnimeListForm existingList={anime_list} />
                </div>
            );
        }
        return <p>Anime List not found.</p>; // If no anime list data found
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log(error)
        return <Error error={error.response?.data || "Failed to fetch anime list."} />;
    }
}
