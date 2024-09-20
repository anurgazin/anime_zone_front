import DisplaySingle from "@/components/characters/displaySingle";
import { character_data } from "@/tmp_data/characters/character_data";
export default function SingleAnime({ params }: { params: { character_id: string } }) {
    const character_id = params.character_id;
    const character = character_data.find(item => item.id === character_id);
    if (character_id && character) {
        return (
            <div>
                <DisplaySingle character={character} />
            </div>
        )
    }
}