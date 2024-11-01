import axios from "axios";

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
export const getAllAnime = () => animeAPI.get(``);
export const getSingleAnime = (id: string) => animeAPI.get(`/id/${id}`)
export const getAnimeRating = (id: string) => animeAPI.get(`/rating/${id}`)
export const getAllCharacters = () => characterAPI.get(``);
export const getSingleCharacter = (id: string) => characterAPI.get(`/${id}`)
export const getAllCharactersFromAnime = (id: string) => characterAPI.get(`/anime/${id}`)
export const getAllComments = (type: string, id: string) => commentsAPI.get(`/${type}/${id}`);
export const getAllAnimeLists = () => listsAPI.get(`/anime`);
export const getAllCharacterLists = () => listsAPI.get(`/characters`);
export const getAllAnimeListsByAnimeId = (id: string) => listsAPI.get(`/anime/anime/${id}`);
export const getAllCharacterListsByCharacterId = (id: string) => listsAPI.get(`/characters/character/${id}`);