import { Card, Button, Stack, Modal } from "react-bootstrap";
import { useState } from "react";
import {deleteReview} from "../../data/repository";

export default function ReviewCard(props) {
    const [showModal, setShowModal] = useState(false);

    const handleDelete = async () => {
        // Open the confirmation modal
        setShowModal(true);
    };

    const confirmDelete = async () => {
        // Perform the deletion
        const response = await deleteReview(props.review.ID);

        // Close the modal
        setShowModal(false);
        window.location.reload();
    };

    const closeDeleteModal = () => {
        // Close the modal without performing the deletion
        setShowModal(false);
    };

    return (
        <>
            <Card>
                <Card.Header>
                    <Stack direction="horizontal" gap={3} className="d-flex">
                        <div>USER ID:</div>
                        <div>{props.review.USER_ID}</div>
                        <div className="vr" />
                        <Button variant="danger" onClick={handleDelete}>
                            X
                        </Button>
                    </Stack>
                </Card.Header>
                <Card.Text className="p-3">
                    {props.review.REVIEW_DESC}
                </Card.Text>
            </Card>

            <Modal show={showModal} onHide={closeDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this review?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeDeleteModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
