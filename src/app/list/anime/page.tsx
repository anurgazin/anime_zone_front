import { getAllAnimeLists } from "@/lib/api";
import Error from "@/components/error";
import DisplayAnimeLists from "@/components/lists/animeList/displayLists";

export default async function AnimeList() {
    try {
        const anime = (await getAllAnimeLists()).data
        return (
            <div>
                <DisplayAnimeLists animeList={anime} />
            </div>
        );
    } catch (error) {
        return <Error error={"Failed to load anime lists data"} />
    }
}
