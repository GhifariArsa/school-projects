import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

function LoginSuccessModal({ show, onHide, username }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Success!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        You have successfully logged in. Welcome {username}!
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LoginSuccessModal;
