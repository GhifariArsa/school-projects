import { Col, Container, Row } from "react-bootstrap";
import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./sessionModel.css";
import SessionButton from "./SessionButton";
import useSessions from "../../CustomHooks/useSessions";
import Review from "../Reviews/Review";
import { useUser } from "../../CustomHooks/userContext";
import { incrementMovieView } from "../../data/repository";


export default function MovieModal({ movie, closeModal, updateRating  }) {
  //for header style based on movie
  const modalHeaderStyle = {
    backgroundColor: movie.HOVER_BG,
    color: movie.HOVER_TXT,
  };

  const {refreshLocalStorage } = useUser();
  const { sessions, loading, error, fetchSessionsById}= useSessions();


  useEffect(() => {
    async function fetchSessions() {
      await fetchSessionsById(movie.ID);
      await refreshLocalStorage();
      await incrementMovieView(movie.ID);
    }
    fetchSessions();
    
  }, []);

  return (
    <>
      <Modal.Header closeButton style={modalHeaderStyle}>
      <Modal.Title>{movie.TITLE}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col md={4}>
              <h6>Sessions</h6>
              {Object.entries(sessions).map(([date, time]) => (
                <Row>
                  <Col xs="auto" md="auto">
                    <span className="day-format">{date.substring(0, 3)}</span>
                    <span className="month-format">{date.substring(3)}</span>
                  </Col>
                  <Col className="button-container">
                    {time.map((session) => (
                      <SessionButton
                        movieId={movie.ID}
                        session={session}
                        colourBg={movie.hoverBg}
                        colourTxt={movie.hoverTxt}
                      />
                    ))}
                  </Col>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <hr></hr>
                </Row>
              ))}
            </Col>
            <Col md={8} className="">
              <Review
                movie={movie}
                colourBg={movie.hoverBg}
                colourTxt={movie.hoverTxt}
                closeModal={closeModal}
                updateRating = {updateRating}
              ></Review>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </>
  );
}
