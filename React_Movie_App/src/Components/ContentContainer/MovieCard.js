import React, { useState } from "react";
import { Card } from "react-bootstrap";
import "./container.css";
import "./card.css";
import SessionsModal from "./SessionsModal.js";
import Modal from "react-bootstrap/Modal";

const MovieCard = ({ movie, user, updateRating }) => {
  //for colour change on hovering movie card
  const [hovered, setHovered] = useState(false);
  //to display modal
  const [isClicked, setIsClicked] = useState(false);

  //handle mouse hover and leave
  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };
  const handleHide = () => {
    setIsClicked(false);
    updateRating();
  };

  const cardStyle = {
    backgroundColor: hovered ? movie.hoverBg : "#333333",
    color: hovered ? movie.hoverTxt : "white",
    transition: "transform 0.2s ease-in-out",
    transform: hovered ? "scale(1.02)" : "",
    border: hovered ? "solid 2px " + movie.hoverBg : "2px solid #333333",
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
        <Card.Img
          variant="top"
          src={movie.poster}
          alt={movie.title}
          className="movie-card-image"
        />
        <Card.Body>
          <Card.Text>
            <h6 className="two-line-h6">{movie.title}</h6>
            <span>{movie.runTime} </span>
            <span className="rating"> {movie.ratingClass}</span>
            <div className="p-0 mt-2">
              <small className="">{movie.avgRating.toFixed(1)}/5</small>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
      {/* display modal based on movie card */}
      <Modal centered size="xl" show={isClicked} onHide={handleHide}>
        <SessionsModal movie={movie} user={user} />
      </Modal>
    </>
  );
};

export default MovieCard;
