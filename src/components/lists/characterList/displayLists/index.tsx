"use client";

import { CharacterList } from "@/lib/types";
import { useRouter } from "next/navigation";
import CharacterListDisplay from "../displayListTitle";

type DisplayCharacterListProps = {
    characterList: CharacterList[];
    user?: string;
};

export default function DisplayCharacterLists({ characterList, user }: DisplayCharacterListProps) {
    const router = useRouter();

    const handleReload = () => {
        router.refresh();
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-4">
            {characterList.map((list) => (
                <CharacterListDisplay
                    key={list.id}
                    characterList={list}
                    handleReload={handleReload}
                    user={user}
                />
            ))}
        </div>
    );
}
