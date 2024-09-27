import { Col, Container, Row } from "react-bootstrap";
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './sessionModel.css';


export default function ModalButton({time,colourBg,colourTxt}) {
    //to check if user is hovering button
    const [buttonHovered, setButtonHovered] = useState(false);

    const toggleHover = () => {
        setButtonHovered(!buttonHovered);
    };

    //style on button hover
    const buttonHoverStyle = {
        backgroundColor: colourBg,
        color: colourTxt,
        border: '1px solid '+colourTxt,

          
    };

    const buttonStyle = {
        backgroundColor: 'transparent',
        color: 'black',
        border: '1px solid black',
          
    };




  return (
    <Button 
      className="session-button"
      style={buttonHovered ? buttonHoverStyle:buttonStyle}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
      >
      
      {time}
      </Button>
  );
}