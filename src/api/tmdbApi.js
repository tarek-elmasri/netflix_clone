import axios from "axios";
import config from "../config";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

const API_KEY = config.tmdbApiKey;

const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaties: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
};

const fetchTrending = () => instance.get(requests.fetchTrending);
const fetchNetflixOriginals = () =>
  instance.get(requests.fetchNetflixOriginals);
const fetchTopRated = () => instance.get(requests.fetchTopRated);
const fetchActionMovies = () => instance.get(requests.fetchActionMovies);
const fetchComedyMovies = () => instance.get(requests.fetchComedyMovies);
const fetchHorrorMovies = () => instance.get(requests.fetchHorrorMovies);
const fetchRomanceMovies = () => instance.get(requests.fetchRomanceMovies);
const fetchDocumentaries = () => instance.get(requests.fetchDocumentaties);

export default {
  fetchTrending,
  fetchNetflixOriginals,
  fetchTopRated,
  fetchActionMovies,
  fetchComedyMovies,
  fetchHorrorMovies,
  fetchDocumentaries,
  fetchRomanceMovies,
};
