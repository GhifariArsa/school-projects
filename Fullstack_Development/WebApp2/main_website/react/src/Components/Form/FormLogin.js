import { useState } from "react";
import { Container, Button, Form, Modal } from "react-bootstrap";
import { loginUser, setCurrentUser } from "../../data/repository";
import { useNavigate } from "react-router-dom";
import "./form.css";
import { useUser } from "../../CustomHooks/userContext";

function FormLogin(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [show, setShow] = useState(false);
  const{setUser} = useUser();

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setErrorMessage("Username or Password can't be empty.");
      handleShow();
      return;
    }
    try {
      const verified = await loginUser({ EMAIL: email, PASSWORD: password });

      // Checking if password is correct
      if (verified === null) {
        setErrorMessage("Username or password is wrong");
        handleShow();
      } else {
        // Login user to local storage
        props.login(verified);
        //set user to provider
        setUser(verified);
        navigate("/");
      }
    } catch (error) {
      setErrorMessage("Username or password is wrong");
      handleShow();
      return;
    }
  };
  return (
    <>
      <Container className="form-container bg-dark text-white">
        <div className="d-flex justify-content-center">
          <h4>Login</h4>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
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
            <Modal.Title>Failed Logging in</Modal.Title>
          </Modal.Header>
          <Modal.Body>{errorMessage}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}

export default FormLogin;
