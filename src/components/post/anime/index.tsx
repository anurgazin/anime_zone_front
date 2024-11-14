"use client";

import { useState, FormEvent } from "react";
import { postAnime } from "@/lib/api";
import { Button } from "../../ui/button";
import { AnimeAPIUploader, Type, Status, ESRB } from "@/lib/types";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

function transformToFormData(payload: AnimeAPIUploader): FormData {
    const formData = new FormData();
    formData.append("title", payload.title);
    formData.append("release_date", payload.release_date.toISOString());
    formData.append("type", payload.type);
    formData.append("episodes", payload.episodes.toString());
    formData.append("description", payload.description);
    formData.append("duration", payload.duration.toString());
    formData.append("status", payload.status);
    formData.append("esrb", payload.esrb);
    formData.append("link", payload.link);

    payload.genre.forEach((genre) => formData.append("genre[]", genre));
    payload.studio.forEach((studio) => formData.append("studio[]", studio));

    if (payload.logo) formData.append("logo", payload.logo);
    payload.media?.forEach((file) => formData.append("media[]", file));

    return formData;
}

export default function AddAnime() {
    const { toast } = useToast()
    const [title, setTitle] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [genre, setGenre] = useState("");
    const [type, setType] = useState<Type>("none");
    const [episodes, setEpisodes] = useState(0);
    const [description, setDescription] = useState("");
    const [studio, setStudio] = useState("");
    const [duration, setDuration] = useState(0);
    const [status, setStatus] = useState<Status>("none");
    const [esrb, setEsrb] = useState<ESRB>("none");
    const [link, setLink] = useState("");
    const [logo, setLogo] = useState<File | null>(null);
    const [media, setMedia] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setLoading(true);

        const payload: AnimeAPIUploader = {
            title,
            release_date: new Date(releaseDate),
            genre: genre.split(",").map((g) => g.trim()),
            type,
            episodes,
            description,
            studio: studio.split(",").map((s) => s.trim()),
            duration,
            status,
            esrb,
            link,
            logo: logo as File,
            media,
        };

        const formData = transformToFormData(payload);
        try {
            await postAnime(formData);
            toast({
                title: "Successful",
                description: "Anime Uploaded Successfully",
            })
            router.push(`/anime`);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.response?.data || "Failed to post anime");
            toast({
                title: "Error",
                description: err.response?.data || "Failed to post anime",
                variant: "destructive",
            })
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
            <Link href="/anime" className="text-gray-500 hover:text-orange-500 flex items-center mb-6">
                <span className="text-orange-500">&#8592;</span>Back to Anime
            </Link>
            <form onSubmit={handleSubmit} className="space-y-3">
                {error && <p className="text-red-500">{error}</p>}
                <h2 className="text-2xl font-bold text-center text-gray-800">
                    Add Anime
                </h2>

                {/* Title */}
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg"
                />

                {/* Release Date */}
                <div>
                    <label htmlFor="release_date" className="text-gray-700">Release Date:</label>
                    <input
                        id="release_date"
                        type="date"
                        value={releaseDate}
                        onChange={(e) => setReleaseDate(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                </div>

                {/* Studio */}
                <input
                    type="text"
                    value={studio}
                    onChange={(e) => setStudio(e.target.value)}
                    placeholder="Studios (comma separated)"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                />

                {/* Genre */}
                <input
                    type="text"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    placeholder="Genres (comma separated)"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                />

                {/* Episodes */}
                <div>
                    <label htmlFor="episodes" className="text-gray-700">Episodes:</label>
                    <input
                        id="episodes"
                        type="number"
                        value={episodes}
                        onChange={(e) => setEpisodes(Number(e.target.value))}
                        placeholder="Episodes"
                        className="w-full p-2 border rounded"
                    />
                </div>

                {/* Duration (minutes) */}
                <div>
                    <label htmlFor="duration" className="text-gray-700">Duration:</label>
                    <input
                        id="duration"
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                        placeholder="Duration (minutes)"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                </div>


                {/* Type */}
                <Select onValueChange={(value) => setType(value as Type)}>
                    <SelectTrigger className="w-full border-gray-300">
                        <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {["movie", "tv", "ova", "ona", "none"].map((t) => (
                                <SelectItem key={t} value={t}>
                                    {t}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                {/* Status */}
                <Select onValueChange={(value) => setStatus(value as Status)}>
                    <SelectTrigger className="w-full border-gray-300">
                        <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {["finished", "airing", "announced", "none"].map((s) => (
                                <SelectItem key={s} value={s}>
                                    {s}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                {/* ESRB */}
                <Select onValueChange={(value) => setEsrb(value as ESRB)}>
                    <SelectTrigger className="w-full border-gray-300">
                        <SelectValue placeholder="Select ESRB Rating" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {["E", "E10+", "T", "M", "AO", "RP", "RP17+", "none"].map((e) => (
                                <SelectItem key={e} value={e}>
                                    {e}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    rows={4}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                />

                {/* Link */}
                <input
                    type="text"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="Youtube Link(OP, ED or trailer)"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                />

                {/* Logo */}
                <div className="mb-6">
                    <label htmlFor="logo" className="block text-gray-700 font-medium">Logo:</label>
                    <input
                        id="logo"
                        type="file"
                        className="w-full p-2 border border-gray-300 rounded-lg bg-white shadow-sm cursor-pointer focus:outline-none 
                        file:bg-orange-400
                        file:rounded-lg
                        file:text-white 
                        file:border-0 
                        file:me-2 
                        file:px-2"
                        aria-describedby="logo_input_help"
                        accept=".jpg,.jpeg,.png,.webp"
                        onChange={(e) => e.target.files && setLogo(e.target.files[0])}
                    />
                    <p className="mt-2 text-sm text-gray-500" id="logo_input_help">
                        PNG, JPG or WEBP
                    </p>
                </div>

                {/* Media */}
                <div>
                    <label htmlFor="media" className="block text-gray-700 font-medium">Media:</label>
                    <input
                        id="media"
                        type="file"
                        multiple
                        className="w-full p-2 border border-gray-300 rounded-lg bg-white shadow-sm cursor-pointer
                        file:bg-orange-400
                        file:rounded-lg
                        file:text-white 
                        file:border-0 
                        file:me-2 
                        file:px-2"
                        aria-describedby="media_input_help"
                        accept=".jpg,.jpeg,.png,.webp"
                        onChange={(e) => setMedia(Array.from(e.target.files || []))}
                    />
                    <p className="mt-2 text-sm text-gray-500" id="media_input_help">
                        PNG, JPG or WEBP
                    </p>
                </div>

                <div className="flex justify-end space-x-3">
                    <Button type="reset" variant="ghost" className="text-gray-500 hover:text-gray-800 transition duration-200 p-3" onClick={() => window.location.reload()}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={loading} className="bg-orange-400 text-white font-medium p-3 rounded-md hover:bg-orange-500 transition duration-300">
                        {loading ? "Posting..." : "Submit"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
