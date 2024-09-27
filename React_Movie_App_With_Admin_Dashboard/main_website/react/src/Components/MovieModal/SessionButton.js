import { Col, Container, Row } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './sessionModel.css';
import SessionBookingModal from "./SessionBookingModal";


export default function SessionButton(props) {
    //to check if user is hovering button
    const [buttonHovered, setButtonHovered] = useState(false);
    const [show, setShow] = useState(false);
    const [seatsAvailable, setSeatsAvailable] = useState(props.session.available);
    const [timeText, setTimeText] = useState(props.session.time);
    


    const toggleHover = () => {
      if(seatsAvailable===0){
        setTimeText("SOLD")
      }
      if(buttonHovered){
        setTimeText(props.session.time);
      }
      setButtonHovered(!buttonHovered);
    };

    //style on button hover
    const buttonHoverStyle = {
        backgroundColor: props.colourBg,
        color: props.colourTxt,
        border: '1px solid '+props.colourTxt,

          
    };
    const buttonStyle = {
        backgroundColor: 'transparent',
        color: 'black',
        border: '1px solid black',
          
    };

  return (
    <>
    {seatsAvailable!==0 ? (
      <Button 
        className="session-button"
        style={buttonHovered ? buttonHoverStyle:buttonStyle}
        onMouseEnter={toggleHover}
        onMouseLeave={toggleHover}
        onClick={()=>setShow(true)}
        >
        
        {timeText}
      </Button>

    ):(
      <div className="div-dis">
        <Button 
          className="session-button"
          style={buttonHovered ? buttonHoverStyle:buttonStyle}
          onMouseEnter={toggleHover}
          onMouseLeave={toggleHover}

          >
          {timeText}
        </Button>
      </div>
    )}

    <Modal show={show} onHide={()=>setShow(false)}
      className="modal-booking">
      <SessionBookingModal setShow={setShow} session={props.session} movieId={props.movieId} setSeatsAvailable={setSeatsAvailable}/>
    </Modal>
    </>
  );
}