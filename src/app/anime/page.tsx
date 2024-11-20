import DisplayAll from "@/components/anime/displayAll";
import { getAllAnime } from "@/lib/api";
import Error from "@/components/error";

export default async function Anime() {
  try {
    const anime = (await getAllAnime()).data
    return (
      <div>
        <DisplayAll anime={anime} />
      </div>
    );
  } catch (error) {
    return <Error error={"Failed to load anime data"} />
  }
}
