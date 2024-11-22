import DisplayAnimeListData from "@/components/lists/animeList/displayListData";
import { getAnimeListDetails } from "@/lib/api";
import { AnimeListDetails } from "@/lib/types";
import { cookies } from 'next/headers'
import Error from "@/components/error";

export default async function AnimeListDetailsPage({ params }: { params: { id: string } }) {
    const id = params.id;
    const cookieStore = await cookies()
    try {
        const data: AnimeListDetails = (await getAnimeListDetails(id)).data;
        const animeList = data.anime_list
        const anime = data.anime
        const comments = data.comments
        const user = cookieStore.get("access_token")?.value || "";
        if (animeList) {
            return (
                <div>
                    <DisplayAnimeListData anime={anime} animeList={animeList} comments={comments} user={user} />
                </div>
            );
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log(error)
        return <Error error={error.response?.data || "Failed to fetch anime list."} />;

    }
    return <p>Anime List not found.</p>; // If no anime list data found
}
