import DisplaySingle from "@/components/characters/displaySingle";
import { getAllCharacterListsByCharacterId, getAllComments, getSingleCharacter } from "@/lib/api";
import Error from "@/components/error";

export default async function SingleCharacter({ params }: { params: { character_id: string } }) {
    const character_id = params.character_id;
    try {
        const character_response = await getSingleCharacter(character_id); // Fetch single character data by ID
        const comment_response = await getAllComments("character", character_id)
        const list_response = await getAllCharacterListsByCharacterId(character_id)
        const character = character_response.data
        const comments = comment_response.data
        const lists = list_response.data
        if (character) {
            return (
                <div>
                    <DisplaySingle character={character} comments={comments} lists={lists} />
                </div>
            );
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log(error)
        return <Error error={error.response?.data || "Failed to fetch character."} />;

    }

    return <p>Character not found.</p>; // If no character data found
}
