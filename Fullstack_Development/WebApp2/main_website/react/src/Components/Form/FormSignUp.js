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
import {
  addUser,
  isDuplicateUser,
  isValidEmail,
  isValidPassword,
  isValidUsername,
  setCurrentUser,
} from "../../data/repository";
import "./form.css";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../CustomHooks/userContext";

function FormSignUp(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSucessMessage] = useState(null);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const navigate = useNavigate();

  const{loginUser} = useUser();

  const handleSubmit = async (e) => {
    // Check if empty
    if (username === "" || email === "" || password === "") {
      e.preventDefault();

      // Error and Success message
      setSucessMessage(null);
      setErrorMessage("Username or Password can't be empty");
      handleShow();

      return;
    }

    if (!isValidEmail(email)) {
      e.preventDefault();

      setSucessMessage(null);
      setErrorMessage("Enter a valid email");
      handleShow();

      return;
    }

    if (!isValidUsername(username)) {
      e.preventDefault();

      setSucessMessage(null);
      setErrorMessage("Username cannot have special characters");
      handleShow();

      return;
    }

    if (!isValidPassword(password)) {
      e.preventDefault();

      setSucessMessage(null);
      setErrorMessage(
        "Password must contain at least 8 character in length, at least one lowercase letter, at least one uppercase letter, and at least one digit (number)."
      );
      handleShow();

      return;
    }

    e.preventDefault();
    try {
      const user = {
        EMAIL: email,
        USERNAME: username,
        PASSWORD: password,
      };

      const response = await addUser(user);

      // error and success messages
      setSucessMessage(`Success! ${user.USERNAME} created`);
      setErrorMessage(null);

      setUsername("");
      setPassword("");

      props.login({ID:response.ID,BLOCKED:response.BLOCKED, EMAIL: email,
        USERNAME: username, JOIN_DATE: response.JOIN_DATE});
      loginUser();
      navigate("/");
    } catch (err) {
      setSucessMessage(null);
      setErrorMessage("Duplicate username or email found");
      handleShow();
      return;
    }
  };

  return (
    <>
      <Container className="">
        <Row>
          <Container className="form-container bg-dark text-white">
            <div className="d-flex justify-content-center">
              <h4>Sign up</h4>
            </div>
            <div>
              <h7>
                Already a member?{" "}
                <Link className="link" to="/login">
                  click here
                </Link>
              </h7>
            </div>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Form.Group>
              <Button variant="dark" type="submit" className="text-white">
                Submit
              </Button>
            </Form>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Failed Creating User</Modal.Title>
              </Modal.Header>
              <Modal.Body>{errorMessage}</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
            {successMessage !== null ? (
              <div>
                <h1 className="text-success">{successMessage}</h1>
              </div>
            ) : (
              ""
            )}
          </Container>
        </Row>
      </Container>
    </>
  );
}

export default FormSignUp;
