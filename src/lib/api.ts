import axios from "axios";
import { getCookie } from 'cookies-next';
import { LoginUser, PostCommentType, PostListRequest, PostRatingRequest } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_DOMAIN;

const animeAPI = axios.create({
    baseURL: API_URL + "anime",
});
const characterAPI = axios.create({
    baseURL: API_URL + "characters",
});
const commentsAPI = axios.create({
    baseURL: API_URL + "comment",
});
const listsAPI = axios.create({
    baseURL: API_URL + "list",
})
const baseAPI = axios.create({
    baseURL: API_URL
})


export default function authHeader() {
    const token = getCookie("token");
    if (token) {
        return { Auth: token.toString() };
    } else {
        return {};
    }
}

// User
export const loginUser = (payload: LoginUser) => baseAPI.post(`/login`, payload)
export const registerUser = (payload: FormData) => baseAPI.post(`/register`, payload)
export const getUser = (id: string) => baseAPI.get(`/user/${id}`)
// Anime
export const getAllAnime = () => animeAPI.get(``);
export const getSingleAnime = (id: string) => animeAPI.get(`/id/${id}`)
export const getAnimeRating = (id: string) => animeAPI.get(`/rating/${id}`)
export const getAnimeRatingByUser = (id: string) => animeAPI.get(`/rating/user/${id}`)
export const postAnimeRating = (id: string, payload: PostRatingRequest) => animeAPI.post(`/rating/${id}`, payload, { headers: authHeader() })
export const postAnime = (payload: FormData) => animeAPI.post(``, payload, { headers: authHeader() })
// Characters
export const getAllCharacters = () => characterAPI.get(``);
export const getSingleCharacter = (id: string) => characterAPI.get(`/${id}`)
export const getAllCharactersFromAnime = (id: string) => characterAPI.get(`/anime/${id}`)
export const postCharacter = (payload: FormData) => characterAPI.post(``, payload, { headers: authHeader() });
// Comments
export const getAllComments = (type: string, id: string) => commentsAPI.get(`/${type}/${id}`);
export const getAllCommentsByUser = (id: string) => commentsAPI.get(`/user/${id}`);
export const postComment = (payload: PostCommentType) => commentsAPI.post(``, payload, { headers: authHeader() })
// Lists
export const getAllAnimeLists = () => listsAPI.get(`/anime`);
export const getAllCharacterLists = () => listsAPI.get(`/characters`);
export const getAllAnimeListsByAnimeId = (id: string) => listsAPI.get(`/anime/anime/${id}`);
export const getAllCharacterListsByCharacterId = (id: string) => listsAPI.get(`/characters/character/${id}`);
export const getAllAnimeListsByUserId = (id: string) => listsAPI.get(`/anime/user/${id}`);
export const getAllCharacterListsByUserId = (id: string) => listsAPI.get(`/characters/user/${id}`);
export const postAnimeList = (payload: PostListRequest) => listsAPI.post(`/anime`, payload, { headers: authHeader() });
export const postCharacterList = (payload: PostListRequest) => listsAPI.post(`/characters`, payload, { headers: authHeader() });