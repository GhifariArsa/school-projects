import {createContext, useContext, useEffect, useState} from "react";
import {createMovie, getMovies} from "../../data/repository";

const MoviesContext = createContext();

export function useMovie() {
    return useContext(MoviesContext)
}

export function MovieProvider({ children }) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        loadMovies();
    }, []);

    const loadMovies = async () =>{
        const movies = await getMovies();
        setMovies(movies);
    }

    const addMovie = async (movie) => {
        const response = await createMovie(movie);
        return response;
    }

    return (
        <MoviesContext.Provider value={{ movies, addMovie }}>
            {children}
        </MoviesContext.Provider>
    )
}