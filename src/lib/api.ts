import axios from "axios";
import { getCookie, setCookie } from 'cookies-next';
import { AddToList, LoginUser, PostCommentType, PostListRequest, PostRatingRequest } from "./types";

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

// Get Refresh Token Header
function refreshTokenPair() {
    const token = getCookie("refresh_token");
    if (token) {
        return { RefreshToken: token.toString() };
    }
    return {};
}

[animeAPI, characterAPI, commentsAPI, listsAPI, baseAPI].forEach((api) => {
    api.interceptors.request.use((config) => {
        const token = getCookie("access_token");
        if (token) {
            config.headers.set("Auth", token)
        }
        return config;
    });
});

// Add a response interceptor
[animeAPI, characterAPI, commentsAPI, listsAPI, baseAPI].forEach((api) => {
    api.interceptors.response.use(
        (response) => response, // Pass through successful responses
        async (error) => {
            const originalRequest = error.config;
            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true; // Prevent infinite retry loops
                try {
                    const { data } = await baseAPI.post("refresh", undefined, {
                        headers: refreshTokenPair(),
                    });

                    const access_token = data.access_token
                    const refresh_token = data.refresh_token

                    // Save the new tokens
                    setCookie("access_token", access_token);
                    setCookie("refresh_token", refresh_token);

                    // Update the original request's Authorization header
                    originalRequest.headers["Auth"] = access_token;

                    // Retry the original request
                    return animeAPI(originalRequest);
                } catch (refreshError) {
                    console.error("Token refresh failed:", refreshError);
                    // Optional: Redirect to login if refresh fails
                    return Promise.reject(refreshError);
                }
            }
            return Promise.reject(error); // Reject other errors as usual
        }
    )
});

// User
export const loginUser = (payload: LoginUser) => baseAPI.post(`/login`, payload)
export const registerUser = (payload: FormData) => baseAPI.post(`/register`, payload)
export const getUser = (id: string) => baseAPI.get(`/user/${id}`)
export const getRefresh = () => baseAPI.post(`/refresh`, undefined, { headers: refreshTokenPair() })
// Anime
export const getAllAnime = () => animeAPI.get(``);
export const getSingleAnime = (id: string) => animeAPI.get(`/id/${id}`)
export const getHighestRatedAnime = () => animeAPI.get(`/highest`);
export const getMostPopularAnime = () => animeAPI.get(`/popular`);
export const getSimilarAnime = (id: string) => animeAPI.get(`/similar/${id}`)
export const getAnimeRating = (id: string) => animeAPI.get(`/rating/${id}`)

export const getAnimeDetails = (id: string) => animeAPI.get(`/details/${id}`)

export const getAnimeRatingByUser = (id: string) => animeAPI.get(`/rating/user/${id}`)
export const postAnimeRating = (id: string, payload: PostRatingRequest) => animeAPI.post(`/rating/${id}`, payload)
export const postAnime = (payload: FormData) => animeAPI.post(``, payload)
// Characters
export const getAllCharacters = () => characterAPI.get(``);
export const getCharactersNameAsc = () => characterAPI.get(`/name/asc`);
export const getSingleCharacter = (id: string) => characterAPI.get(`/id/${id}`)
export const getCharacterDetails = (id: string) => characterAPI.get(`/details/${id}`)
export const getAllCharactersFromAnime = (id: string) => characterAPI.get(`/anime/${id}`)
export const postCharacter = (payload: FormData) => characterAPI.post(``, payload);
// Comments
export const getAllComments = (type: string, id: string) => commentsAPI.get(`/${type}/${id}`);
export const getAllCommentsByUser = (id: string) => commentsAPI.get(`/user/${id}`);
export const postComment = (payload: PostCommentType) => commentsAPI.post(``, payload)
// Lists
export const getAllAnimeLists = () => listsAPI.get(`/anime`);
export const getAllCharacterLists = () => listsAPI.get(`/characters`);
export const getAllAnimeListsByAnimeId = (id: string) => listsAPI.get(`/anime/anime/${id}`);
export const getAllCharacterListsByCharacterId = (id: string) => listsAPI.get(`/characters/character/${id}`);
export const getAllAnimeListsByUserId = (id: string) => listsAPI.get(`/anime/user/${id}`);
export const getAllCharacterListsByUserId = (id: string) => listsAPI.get(`/characters/user/${id}`);
export const postAnimeList = (payload: PostListRequest) => listsAPI.post(`/anime`, payload);
export const postCharacterList = (payload: PostListRequest) => listsAPI.post(`/characters`, payload);
export const addToAnimeList = (payload: AddToList, id: string) => listsAPI.post(`/anime/add/${id}`, payload)
export const addToCharactersList = (payload: AddToList, id: string) => listsAPI.post(`/characters/add/${id}`, payload)