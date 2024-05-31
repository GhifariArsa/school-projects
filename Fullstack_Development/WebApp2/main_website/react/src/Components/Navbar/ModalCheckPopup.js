import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { deleteAccount } from "../../data/repository";
import { useNavigate } from "react-router-dom";

export default function ModalCheckPopup(props) {
  const handleYes = async () => {
    const currentUser = JSON.parse(localStorage.getItem("current_user"))
    const currentUserEmail = currentUser.EMAIL;
    
    console.log(currentUserEmail)

    try {
      const response = await deleteAccount(currentUserEmail);
    } catch (e) {
      console.error(e);
    }

    props.logout();
    window.location.reload();

  };

  return (
    <>
      <Modal show={props.show} onHide={props.close}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete your account?</Modal.Body>
        <Modal.Footer>
          <Button variant="dark" className="bg-dark text-white" onClick={props.close}>
            No
          </Button>
          <Button
            className="bg-danger text-white"
            variant="outline-warning"
            onClick={handleYes}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
