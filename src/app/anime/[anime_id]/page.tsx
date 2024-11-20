import DisplaySingle from "@/components/anime/displaySingle";
import { getAllAnimeListsByAnimeId, getAllCharactersFromAnime, getAllComments, getAnimeRating, getSimilarAnime, getSingleAnime } from "@/lib/api"; // Import the API function
import Error from "@/components/error";

export default async function SingleAnime({ params }: { params: { anime_id: string } }) {
    const anime_id = params.anime_id;

    try {
        const anime = (await getSingleAnime(anime_id)).data
        const comments = (await getAllComments("anime", anime_id)).data
        const reviews = (await getAnimeRating(anime_id)).data
        const animeLists = (await getAllAnimeListsByAnimeId(anime_id)).data
        const characters = (await getAllCharactersFromAnime(anime_id)).data
        const similarAnime = (await getSimilarAnime(anime_id)).data
        if (anime) {
            return (
                <div>
                    <DisplaySingle anime={anime} comments={comments} rating={reviews} animeList={animeLists} characters={characters} similarAnime={similarAnime} />
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
