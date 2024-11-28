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

export type RatingUser = {
  user_id: string;
  username: string;
}

export type Rating = {
  id?: string;
  anime_id: string;
  user: RatingUser;
  score: number;
  timestamp: string;
  review?: string;
};

export type PostRatingRequest = {
  score: number
  review: string // optional
}

// Anime type for API
export type AnimeAPI = {
  id: string;
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

export type AnimeAPIUploader = {
  title: string
  release_date: Date
  genre: string[]
  type: Type
  episodes: number
  description: string
  studio: string[]
  duration: number
  status: Status
  esrb: ESRB
  link: string
  logo: File
  media: File[]
}

export type AnimeDetails = {
  anime: AnimeAPI
  similar_anime: AnimeAPI[]
  reviews: Rating[]
  comments: Comment[]
  anime_list: AnimeList[]
  characters: CharacterAPI[]
}

export type TokenPair = {
  access_token: string
  refresh_token: string
}


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

export type CharacterAPIUploader = {
  first_name: string
  last_name: string
  age: number
  from_anime: string[]
  gender: string
  bio: string
  status: string
  logo: File
  media: File[]
}

export type CharacterDetails = {
  character: CharacterAPI
  comments: Comment[]
  characters_list: CharacterList[]
}

export type CommentType = "anime" | "character" | "anime_list" | "character_list";
export type CommentUser = {
  user_id: string
  username: string
}

export type RatingAction = {
  action: "increment" | "decrement"
}

export type ListRatingAction = {
  list_type: "anime_list" | "character_list"
  action: "increment" | "decrement"
}

// Comment struct represents Comment information
export type Comment = {
  id: string;
  type: CommentType;
  content_id: string;
  user: CommentUser;
  text: string;
  timestamp: Date;
  rating: number;
}
export type PostCommentType = {
  type: CommentType;
  content_id: string;
  text: string;
}

export type ListUser = {
  user_id: string
  username: string
}


export type PostListRequest = {
  title: string
  content_list: string[]
}

// AnimeList struct represents AnimeList information
export type AnimeList = {
  id: string
  name: string
  user: ListUser
  anime_List: string[]
  rating: number
}
export type AnimeListDetails = {
  anime: AnimeAPI[]
  comments: Comment[]
  anime_list: AnimeList
}
export type AnimeListAPI = {
  anime: AnimeAPI[]
  anime_list: AnimeList
}

export type AddToList = {
  object_id: string
}

// CharacterList struct represents CharacterList information
export type CharacterList = {
  id: string
  name: string
  user: ListUser
  character_List: string[]
  rating: number
}

export type CharacterListDetails = {
  characters: CharacterAPI[]
  comments: Comment[]
  characters_list: CharacterList
}


export type LoginUser = {
  email: string
  password: string
}

export type RegisterUser = {
  email: string;
  username: string;
  password: string;
  bio: string;
  logo?: File;
}

export type User = {
  id: string;
  email: string;
  username: string;
  password: string;
  role: string;
  bio: string;
  logo: string;
}

export type TokenInfo = {
  exp: number;
  iat: number;
  id: string;
  role: string;
  username: string;
}
