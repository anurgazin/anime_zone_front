import DisplaySingle from "@/components/anime/displaySingle";
import { getAnimeDetails } from "@/lib/api"; // Import the API function
import Error from "@/components/error";
import { AnimeDetails } from "@/lib/types";
import { cookies } from 'next/headers'

export default async function SingleAnime({ params }: { params: { anime_id: string } }) {
    const anime_id = params.anime_id;
    const cookieStore = await cookies()

    try {
        const details: AnimeDetails = (await getAnimeDetails(anime_id)).data
        const anime = details.anime
        const reviews = details.reviews
        const similarAnime = details.similar_anime
        const comments = details.comments
        const characters = details.characters
        const animeLists = details.anime_list
        const user = cookieStore.get("access_token")?.value || "";

        if (anime) {
            return (
                <div>
                    <DisplaySingle anime={anime} comments={comments} rating={reviews} animeList={animeLists} characters={characters} similarAnime={similarAnime} user={user} />
                </div>
            );
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log(error)
        return <Error error={error.response?.data || "Failed to fetch anime."} />;
    }

    return <p>Anime not found.</p>;
}
