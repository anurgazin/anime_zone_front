import DisplaySingle from "@/components/characters/displaySingle";
import { getCharacterDetails } from "@/lib/api";
import Error from "@/components/error";
import { CharacterDetails } from "@/lib/types";
import { cookies } from 'next/headers'

export default async function SingleCharacter({ params }: { params: { character_id: string } }) {
    const character_id = params.character_id;
    const cookieStore = await cookies()
    try {
        const details_response: CharacterDetails = (await getCharacterDetails(character_id)).data
        const character = details_response.character
        const comments = details_response.comments
        const lists = details_response.characters_list
        const user = cookieStore.get("access_token")?.value || "";

        if (character) {
            return (
                <div>
                    <DisplaySingle character={character} comments={comments} lists={lists} user={user} />
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
