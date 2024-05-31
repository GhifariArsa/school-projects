import React, { createContext, useContext, useEffect, useState } from "react";
import { getUserObject } from "../data/repository";
import axios from "axios";

const MovieContext = createContext();

export function useMovieContext() {
  return useContext(MovieContext);
}

export function MovieProvider({ children }) {
  const [moviesNow, setMoviesNow] = useState(null);
  const [moviesSoon, setMoviesSoon] = useState(null);
  const [moviesCarousel, setMoviesCarousel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    async function fetchMovies() {
        await axios.get("http://localhost:4000/v1/movies").then((response) => {
            setMoviesSoon(response.data.filter(movie => movie.COMING_SOON === true));
            setMoviesNow(response.data.filter(movie => movie.COMING_SOON === false));
            setMoviesCarousel(response.data.filter(movie => movie.SLIDE_SHOW === true));
          })
          .catch((err) => {
            setError(err);
          })
          .finally(() => {
            setLoading(false);
          });

    }
    fetchMovies();
  }, []);

  async function sortMovies() {
    await axios.get("http://localhost:4000/v1/movies").then((response) => {
          setMoviesNow(response.data.filter(movie => movie.COMING_SOON === false));
          // const sortedMovies = [...moviesNow].sort((a, b) => b.AVG_RATING - a.AVG_RATING);
          // setMoviesNow(sortedMovies);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
  }

  return (
    <MovieContext.Provider value={{ moviesNow,moviesSoon,moviesCarousel, loading, error,sortMovies }}>
      {children}
    </MovieContext.Provider>
  );
}
