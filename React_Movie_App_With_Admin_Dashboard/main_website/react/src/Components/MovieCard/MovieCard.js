import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import "./MovieCard.css";
import Modal from "react-bootstrap/Modal";
import MovieModal from "../MovieModal/MovieModal";
import { useMovieContext } from "../../CustomHooks/movieContext";

const MovieCard = ({ movie, user, updateRating }) => {
  //for colour change on hovering movie card
  const [hovered, setHovered] = useState(false);
  //to display modal
  const [isClicked, setIsClicked] = useState(false);
  const [posterName, setPosterName] = useState('IJ.jpg');

  const {sortMovies} = useMovieContext();

  //handle mouse hover and leave
  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };
  const handleHide = async() => {
    setIsClicked(false);
    await sortMovies();
    // updateRating();
  };

  useEffect(() => {
    if (posterName) {
      // Use require with the correct path and variable
      // console.log(movie.POSTER);
}
  }, []);

  const cardStyle = {
    backgroundColor: hovered ? movie.HOVER_BG : "#333333",
    color: hovered ? movie.HOVER_TXT : "white",
    transition: "transform 0.2s ease-in-out",
    transform: hovered ? "scale(1.02)" : "",
    border: hovered ? "solid 2px " + movie.HOVER_BG : "2px solid #333333",
  };

  return (
    <>
      <Card
        className="movie-block movies-container custom-card-body"
        style={cardStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsClicked(true)}
      >
        {movie.POSTER !== undefined && (
          <Card.Img
            variant="top"
            src={require(`../../Movies/posters/${movie.POSTER}`)}
            alt={movie.TITLE}
            className="movie-card-image"
          />
        )}
        <Card.Body>
          <Card.Text>
            <h6 className="two-line-h6">{movie.TITLE}</h6>
            <span>{movie.RUNTIME} </span>
            <span className="rating"> {movie.RATING_CLASS}</span>
            <div className="p-0 mt-2">
              {movie.AVG_RATING ? (
                <span>{movie.AVG_RATING}/5</span>
                
              ):(
                <span>No Reviews</span>
              )}
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
      {/* display modal based on movie card */}
      <Modal centered size="xl" show={isClicked} onHide={handleHide}>
        <MovieModal movie={movie} user={user} />
      </Modal>
    </>
  );
};

export default MovieCard;
