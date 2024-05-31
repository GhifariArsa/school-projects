import { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { getUsernameFromEmail, verifyUser } from "../../data/repository";
import { useNavigate } from "react-router-dom";
import "./form.css";
import { propTypes } from "react-bootstrap/esm/Image";

function FormLogin(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setErrorMessage("Username or Password can't be empty.");
      return;
    }

    const verified = verifyUser(email, password);

    if (verified === true) {
      props.login(email);
      navigate("/");
      return;
    } else {
      setErrorMessage("Username and / or password invalid, please try again.");
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
        {errorMessage !== null ? (
          <div>
            <span className="text-danger">{errorMessage}</span>
          </div>
        ) : (
          ""
        )}
      </Container>
    </>
  );
}

export default FormLogin;
