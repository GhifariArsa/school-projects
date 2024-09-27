import React, {useState} from "react";
import {Card, Button, Modal, Form} from "react-bootstrap";
import {editMovie} from "../../data/repository";

export default function MovieCard({movie}) {
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedRuntime, setEditedRuntime] = useState(movie.RUNTIME);
    const [editedTitle, setEditedTitle] = useState(movie.TITLE);
    const [editedRating, setEditedRating] = useState(movie.RATING_CLASS);
    const [editedComingSoon, setEditedComingSoon] = useState(movie.COMING_SOON);
    const handleEdit = () => {
        setShowEditModal(true);
    };

    const handleSave = async () => {
        const editedMovie = {
            ID: movie.ID,
            TITLE: editedTitle,
            RUNTIME: editedRuntime,
            RATING_CLASS: editedRating,
            COMING_SOON: editedComingSoon === "true",
        };

        try {
            const updatedMovie = await editMovie(editedMovie);
            console.log("Movie updated:", updatedMovie);
            setShowEditModal(false);
        } catch (error) {
            console.log("Error updating movie:", error);
        }

        window.location.reload();
    };

    const replaceBoolean = (bool) => {
        if (bool) {
            return "true"
        }
        return "false"
    }
    return (
        <div className="movie-card">
            <Card>
                <Card.Body>
                    <Card.Title>{movie.TITLE}</Card.Title>
                    <Card.Text>
                        <strong>Runtime:</strong> {movie.RUNTIME}
                    </Card.Text>
                    <Card.Text>
                        <strong>Rating:</strong> {movie.RATING_CLASS}
                    </Card.Text>
                    <Card.Text>
                        <strong>Coming Soon:</strong> {replaceBoolean(movie.COMING_SOON)}
                    </Card.Text>
                    <Button variant="primary" onClick={handleEdit}>
                        Edit
                    </Button>
                </Card.Body>
            </Card>

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Movie Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="editedTitle">
                        <Form.Label>New Title</Form.Label>
                        <Form.Control
                            type="text"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="editedTitle">
                        <Form.Label>New Title</Form.Label>
                        <Form.Control
                            type="text"
                            value={editedRuntime}
                            onChange={(e) => setEditedRuntime(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="editedRating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Select
                            value={editedRating}
                            onChange={(e) => setEditedRating(e.target.value)}
                        >
                            <option value="G">G</option>
                            <option value="PG">PG</option>
                            <option value="PG-13">PG-13</option>
                            <option value="R">R</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="editedComingSoon">
                        <Form.Label>Coming Soon</Form.Label>
                        <Form.Select
                            value={editedComingSoon}
                            onChange={(e) => setEditedComingSoon(e.target.value)}
                        >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </Form.Select>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
