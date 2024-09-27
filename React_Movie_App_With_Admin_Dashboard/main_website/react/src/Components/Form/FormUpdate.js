import {
    Form,
    Button,
    Container,
    Col,
    Row,
    Alert,
    Modal,
} from "react-bootstrap";

import React, {useState} from "react";
import {updateUser, isValidEmail, isValidPassword, isValidUsername, isDuplicateUser} from "../../data/repository";
import { useUser } from "../../CustomHooks/userContext";

export default function FormUpdate(props) {
    const [username, setUsername] = useState("");
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("current_user")));
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(props.user.password);
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const {setUser} = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password === "") {
            e.preventDefault();

            // Error and Success message
            setErrorMessage("Password can't be empty");
            handleShow();

            return;
        }

        if (email !== "" && !isValidEmail(email)) {
            e.preventDefault();

            setErrorMessage("Enter a valid email");
            handleShow();

            return;
        }

        if (username !== "" && !isValidUsername(username)) {
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

        try {
            // If email and username empty use default email
            let ChangeUsername = username;
            if (username === "") {
                ChangeUsername = currentUser.USERNAME;
            }
            let ChangeEmail = email;
            if (email === "") {
                ChangeEmail = currentUser.EMAIL;
            }
            const response = await updateUser(props.user.EMAIL, ChangeEmail, ChangeUsername, password);
            setUser(response.user);
            console.log(response);
            props.updateUser(response.user);
            props.closeUpdate();
        } catch (error) {
            setErrorMessage("Duplicate Username or Email is Found");
            handleShow();
        }


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
                            placeholder={currentUser.USERNAME}
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
                            placeholder={currentUser.EMAIL}
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
