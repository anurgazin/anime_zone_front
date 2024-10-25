export type Type = "movie" | "tv" | "ova" | "ona" | "none";
export type Status = "finished" | "airing" | "announced" | "none";
export type ESRB = "E" | "E10+" | "T" | "M" | "AO" | "RP" | "RP17+" | "none";
export type Anime = {
  id: string; // UUID format
  title: string;
  release_date: string; // ISO date string
  rating: number;
  genre: string[];
  type: Type;
  episodes: number;
  description: string;
  studio: string[];
  duration: number; // in minutes
  status: Status;
  esrb: ESRB;
};

export type Rating = {
  id?: string;
  anime_id: string;
  user_id: string;
  score: number;
  timestamp: string;
  review?: string;
};

// Anime type for API
export type AnimeAPI = {
  id?: string;
  title: string;
  release_date: Date;
  average_rating: number; // Average rating score
  rating_count: number; // Total number of ratings
  genre: string[]; // List of genres
  type: Type; // Type (movie, tv, etc.)
  episodes: number; // Number of episodes
  description: string; // Description of the anime
  studio: string[]; // List of studios
  duration: number; // Duration in minutes
  status: Status; // Status (finished, airing, etc.)
  esrb: ESRB; // ESRB rating
  logo: string; // URL or path to the logo image
  media: string[]; // List of associated media (e.g., posters, trailers)
};


export type Filters = {
  genre: string[];
  studio: string[];
  releaseType: Type;
  status: Status;
  esrb: ESRB;
};

export type Character = {
  id: string;
  first_name: string;
  last_name: string;
  age: number;
  from_anime: string[];
  gender: string;
  bio: string;
  status: string;
}

type FromAnime = {
  id: string;
  title: string
}

export type CharacterAPI = {
  id: string;
  first_name: string;
  last_name: string;
  age: number;
  from_anime: FromAnime[];
  gender: string;
  bio: string;
  status: string;
  logo: string; // URL or path to the logo image
  media: string[]; // List of associated media (e.g., posters, trailers)
}