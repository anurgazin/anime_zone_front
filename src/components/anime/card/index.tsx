import Image from 'next/image'
import { Anime } from "@/lib/types";
import img from "@/tmp_data/anime/images/logos/jjk2.jpg"
import Link from 'next/link';

export default function Card(anime: Anime) {
    const genre = anime.genre.length > 1 ? anime.genre.join(", ") : anime.genre.toString();
    const studio = anime.studio.length > 1 ? anime.studio.join(", ") : anime.studio.toString();
    return (
        <div key={anime.id}>
            <Link href={`/anime/${anime.id}`} >
                <Image src={img} width={250} height={250} alt={"img"} />
                <h1>Title: {anime.title}</h1>
                <h1>Rating: {anime.rating}</h1>
                <h1>Release Date: {anime.release_date}</h1>
                <h1>Type: {anime.type.toUpperCase()}</h1>
                <h1>Genres: {genre}</h1>
                <h1>Studio: {studio}</h1>
            </Link>
        </div>
    )
}