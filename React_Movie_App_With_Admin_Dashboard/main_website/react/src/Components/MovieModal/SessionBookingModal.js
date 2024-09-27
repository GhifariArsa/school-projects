import { Button, Col, Container, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./sessionModel.css";
import { fetchSessionsById, fetchSessionsByMovieId, postReservation } from "../../data/repository";
import useSessions from "../../CustomHooks/useSessions";
import { useUser } from "../../CustomHooks/userContext";
import Alert from 'react-bootstrap/Alert';

export default function SessionBookingModal(props) {
  const [selectedSeats, setSelectedSeats] = useState(1);
  const [availableSeats, setAvailableSeats] = useState(props.session.available);
  const [showBookedAlert, setShowBookedAlert] = useState(false);
  const {user} = useUser();

  async function fetchSessionSeats() {
    const { sessions, loading, error} = await fetchSessionsByMovieId(props.movieId);

    sessions.forEach(session => {
      if (session.ID === props.session.id) {
        setAvailableSeats(session.SEATS_AVAILABLE);
      }
    });
  }
  useEffect(() => {
    fetchSessionSeats();
  }, []);

  useEffect(() => {
    props.setSeatsAvailable(availableSeats);
  }, [availableSeats]);

  const handleSeatSelection = (event) => {
    setSelectedSeats(parseInt(event.target.value));
  };

  async function handleSubmit(){
    const response = await postReservation(user.ID,props.session.id,selectedSeats);
    fetchSessionSeats();

    //close if response is successful
    if(response.error===""){
      props.setShow(false);
    }else{
      setShowBookedAlert(true);
    }
  }

  return (
    <>
      <Modal.Header closeButton>
      <Modal.Title>Reserve Session</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Confirm reservation for:</p>
        <p>{props.session.date}, {props.session.time}, Available seats({availableSeats})</p>
        {/* Dropdown for seat selection */}
      {user ?(
        <>
        <label htmlFor="seatSelection">Reserve Seats:&nbsp;</label>
        <select
          id="seatSelection"
          name="seatSelection"
          value={selectedSeats}
          onChange={handleSeatSelection}
        >
          {Array.from({ length: availableSeats }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        </>
      ):(
        <Alert className="" variant="dark">
          Please <Alert.Link href="/login">sign in</Alert.Link> to reserve tickets
        </Alert>
        
      )}
      {showBookedAlert &&(
        <Alert className="p-1 mt-4" variant="dark">
          <p className="m-0">Already reserved this session!</p>
           Please <Alert.Link href="/reservations">delete reservation</Alert.Link> and rebook. 
        </Alert>
      )}
      </Modal.Body>
      <Modal.Footer>
          <Button variant="secondary" onClick={()=>props.setShow(false)}>
            Close
          </Button>
          {user &&(
            <Button variant="primary" onClick={handleSubmit}>
              Save Changes
            </Button>
          )}
        </Modal.Footer>
    </>
  );
}
