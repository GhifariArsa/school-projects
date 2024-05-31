import {
  Form,
  Button,
  Container,
  Col,
  Row,
  Alert,
  Modal,
} from "react-bootstrap";

import React, { useState } from "react";
import { updateUser, isValidEmail, isValidPassword, isValidUsername, isDuplicateUser } from "../../data/repository";

export default function FormUpdate(props) {
  const [username, setUsername] = useState(props.user.username);
  const [email, setEmail] = useState(props.user.email);
  const [password, setPassword] = useState(props.user.password);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "" || email === "" || password === "") {
      e.preventDefault();

      // Error and Success message
      setErrorMessage("Username, Password, or Email can't be empty");
      handleShow();

      return;
    }

    if (!isValidEmail(email)) {
      e.preventDefault();

      setErrorMessage("Enter a valid email");
      handleShow();

      return;
    }

    if (!isValidUsername(username)) {
      e.preventDefault();

      setErrorMessage("Username cannot have special characters");
      handleShow();

      return;
    }

    if (!isValidPassword(password)) {
      e.preventDefault();

      setErrorMessage(
        "Password must contain at least 8 character in length, at least one lowercase letter, at least one uppercase letter, and at least one digit (number)."
      );
      handleShow();

      return;
    }
    updateUser(props.user.email, email, username, password);
    props.updateUser(email);
    props.closeUpdate();
  };

  const handleShow = () => setShowModal(true);

  const handleClose = () => setShowModal(false);

  return (
    <>
      <div className="update-form">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Update Username</Form.Label>
            <Form.Control
              type="text"
              placeholder={props.user.username}
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Update Email</Form.Label>
            <Form.Control
              type="text"
              placeholder={props.user.email}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Update Password</Form.Label>
            <Form.Control
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="text-white">
            Submit
          </Button>
        </Form>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Failed Updating User</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
