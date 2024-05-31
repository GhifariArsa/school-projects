import { Col, Container, Row } from "react-bootstrap";
import React, { useState } from 'react';
import MovieCard from './MovieCard';
import { getAvgRating,getMoviesSortedByRating } from "../../data/repository";



export default function MoviesSection(props) {
  const [signal, setSignal] = useState(false);
  //sort movies by rating
  let movies = getMoviesSortedByRating(props.movies);
  //handle mouse hover and leave
  const updateRating = () => {
      movies = getMoviesSortedByRating(props.movies);
      setSignal(!signal);
  };


  return (
    <>
        {movies.map((movie, index) => (
        <Col style={{ width: '250px' }} xs ={3} md={3} key={index} className="col-movies">
            <MovieCard 
              key = {signal}
              movie={movie}
              user = {props.user}
              updateRating = {updateRating}
            />
        </Col>
            ))}
    </>
  );
}