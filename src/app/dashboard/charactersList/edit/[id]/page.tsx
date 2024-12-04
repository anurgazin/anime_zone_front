import { getCharacterList } from "@/lib/api";
import { CharacterList } from "@/lib/types";
import Error from "@/components/error";
import EditCharacterListForm from "@/components/lists/characterList/editCharacterList";

export default async function EditCharacterList({ params }: { params: { id: string } }) {
    const id = params.id;
    try {
        const character_list: CharacterList = (await getCharacterList(id)).data;
        if (character_list) {
            return (
                <div>
                    <EditCharacterListForm existingList={character_list} />
                </div>
            );
        }
        return <p>Character List not found.</p>; // If no characters list data found
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log(error)
        return <Error error={error.response?.data || "Failed to fetch characters list."} />;
    }
}
