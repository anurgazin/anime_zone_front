import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_DOMAIN;

const animeAPI = axios.create({
    baseURL: API_URL + "anime",
});
export const getAllAnime = () => animeAPI.get(``);
export const getSingleAnime = (id: string) => animeAPI.get(`/id/${id}`)