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
export const getAllAnime = () => animeAPI.get(``);
export const getSingleAnime = (id: string) => animeAPI.get(`/id/${id}`)
export const getAllCharacters = () => characterAPI.get(``);
export const getSingleCharacter = (id: string) => characterAPI.get(`/${id}`)
export const getAllComments = (type: string, id: string) => commentsAPI.get(`/${type}/${id}`);