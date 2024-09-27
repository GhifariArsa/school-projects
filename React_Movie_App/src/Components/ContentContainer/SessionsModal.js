import { Col, Container, Row } from "react-bootstrap";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./sessionModel.css";
import Button from "react-bootstrap/Button";
import ModalButton from "./ModalButton";
import Review from "../Reviews/Review";

export default function SessionsModal({ movie, closeModal, updateRating  }) {
  //for header style based on movie
  const modalHeaderStyle = {
    backgroundColor: movie.hoverBg,
    color: movie.hoverTxt,
  };

  return (
    <>
      <Modal.Header closeButton style={modalHeaderStyle}>
        <Modal.Title>{movie.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col md={12} sm={12} lg={3}>
              <h6>Sessions</h6>
              {Object.entries(movie.sessions).map(([date, times]) => (
                <Row>
                  <Col xs="auto" md="auto">
                    <span className="day-format">{date.substring(0, 3)}</span>
                    <span className="month-format">{date.substring(3)}</span>
                  </Col>
                  <Col className="button-container">
                    {times.map((time) => (
                      <ModalButton
                        time={time}
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
            <Col md={12} sm={12} lg={9} className="">
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
