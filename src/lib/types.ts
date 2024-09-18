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