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

// Rating TypeScript equivalent
export type Rating = {
  id?: string; // MongoDB ObjectId as a string (optional for new ratings)
  anime_id: string; // MongoDB ObjectId as a string (reference to Anime)
  user_id: string; // MongoDB ObjectId as a string (reference to User)
  score: number; // Rating score
  timestamp: string; // ISO date string for when the rating was given
  review?: string; // Optional user review
};

// Anime TypeScript equivalent
export type AnimeAPI = {
  id?: string; // MongoDB ObjectId as a string (optional for new anime)
  title: string;
  release_date: string; // ISO date string
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