import { getAllCharacterLists } from "@/lib/api";
import Error from "@/components/error";
import DisplayCharacterLists from "@/components/lists/characterList/displayLists";

export default async function CharacterList() {
    try {
        const characterLists = (await getAllCharacterLists()).data
        return (
            <div>
                <DisplayCharacterLists characterList={characterLists} />
            </div>
        );
    } catch (error) {
        return <Error error={"Failed to load character lists data"} />
    }
}
