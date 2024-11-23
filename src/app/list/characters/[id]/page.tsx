import { getCharacterListDetails } from "@/lib/api";
import { CharacterListDetails } from "@/lib/types";
import { cookies } from 'next/headers'
import Error from "@/components/error";
import DisplayCharacterListData from "@/components/lists/characterList/displayListData";

export default async function CharacterListDetailsPage({ params }: { params: { id: string } }) {
    const id = params.id;
    const cookieStore = await cookies()
    try {
        const data: CharacterListDetails = (await getCharacterListDetails(id)).data;
        const charactersList = data.characters_list
        const characters = data.characters
        const comments = data.comments
        const user = cookieStore.get("access_token")?.value || "";
        if (charactersList) {
            return (
                <div>
                    <DisplayCharacterListData characters={characters} charactersList={charactersList} comments={comments} user={user} />
                </div>
            );
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log(error)
        return <Error error={error.response?.data || "Failed to fetch characters list."} />;

    }
    return <p>Anime List not found.</p>; // If no characters list data found
}
