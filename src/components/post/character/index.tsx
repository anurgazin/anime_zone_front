"use client";

import { useState, FormEvent } from "react";
import { AnimeAPI, CharacterAPIUploader } from "@/lib/types";
import { postCharacter } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../../ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

function transformToFormData(payload: CharacterAPIUploader): FormData {
    const formData = new FormData();
    formData.append("first_name", payload.first_name);
    formData.append("last_name", payload.last_name);
    formData.append("age", payload.age.toString());
    formData.append("gender", payload.gender);
    formData.append("bio", payload.bio);
    formData.append("status", payload.status);

    payload.from_anime.forEach((anime) => formData.append("from_anime[]", anime))

    if (payload.logo) formData.append("logo", payload.logo);
    payload.media?.forEach((file) => formData.append("media[]", file));

    return formData;
}

type AddCharacterProps = {
    anime_list: AnimeAPI[];
};

export default function AddCharacter({ anime_list }: AddCharacterProps) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState<number>(0);
    const [selectedAnime, setSelectedAnime] = useState<string[]>([]);
    const [gender, setGender] = useState("none");
    const [bio, setBio] = useState("");
    const [status, setStatus] = useState<string>("");
    const [logo, setLogo] = useState<File | null>(null);
    const [media, setMedia] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { toast } = useToast();
    const router = useRouter();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setLoading(true);

        const payload: CharacterAPIUploader = {
            first_name: firstName,
            last_name: lastName,
            age,
            from_anime: selectedAnime,
            gender,
            bio,
            status,
            logo: logo as File,
            media,
        };

        const formData = transformToFormData(payload);
        try {
            await postCharacter(formData);
            toast({
                title: "Character Created",
                description: `${firstName} has been added!`,
            });
            router.push("/characters");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setError(error.response?.data || "Failed to create character");
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
            <Link href="/characters" className="text-gray-500 hover:text-orange-500 flex items-center mb-6">
                <span className="text-orange-500">&#8592;</span>Back to Characters
            </Link>
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && <p className="text-red-500">{error}</p>}
                <h2 className="text-2xl font-bold text-center text-gray-800">
                    Add Character
                </h2>
                {/* Select Anime */}
                <Select onValueChange={(value) => setSelectedAnime([value])}>
                    <SelectTrigger className="w-full border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-orange-400">
                        <SelectValue placeholder="Select an anime" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60 overflow-y-auto border border-gray-300 bg-white rounded-lg">
                        <SelectGroup>
                            {anime_list.map((a) => (
                                <SelectItem key={a.id} value={a.id}>
                                    {a.title}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                {/* First Name */}
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    required
                    className="w-full p-4 border border-gray-300 rounded-lg"
                />

                {/* Last Name */}
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    className="w-full p-4 border border-gray-300 rounded-lg"
                />

                {/* Age */}
                <div>
                    <label htmlFor="age" className="text-gray-700">Age:</label>
                    <input
                        type="number"
                        id="age"
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value))}
                        placeholder="Age"
                        className="w-full p-4 border border-gray-300 rounded-lg"
                    />
                </div>

                {/* Gender */}
                <Select onValueChange={(value) => setGender(value)}>
                    <SelectTrigger className="w-full border-gray-300">
                        <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {["male", "female", "unknown", "other"].map((g) => (
                                <SelectItem key={g} value={g}>
                                    {g}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                {/* Status */}
                <Select onValueChange={(value) => setStatus(value)}>
                    <SelectTrigger className="w-full border-gray-300">
                        <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {["alive", "dead", "unknown", "none"].map((s) => (
                                <SelectItem key={s} value={s}>
                                    {s}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                {/* Bio */}
                <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Bio"
                    rows={4}
                    className="w-full p-4 border border-gray-300 rounded-lg"
                />

                {/* Logo */}
                <input type="file" onChange={(e) => e.target.files && setLogo(e.target.files[0])} className="block" />

                {/* Media */}
                <input
                    type="file"
                    multiple
                    onChange={(e) => setMedia(Array.from(e.target.files || []))}
                    className="block mt-4"
                />

                <div className="flex justify-end space-x-3 mt-6">
                    <Button type="reset" variant="outline" onClick={() => window.location.reload()}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>
                        {loading ? "Creating..." : "Submit"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
