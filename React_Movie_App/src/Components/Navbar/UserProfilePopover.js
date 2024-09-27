import { Col, Container, Row } from "react-bootstrap";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Stack from "react-bootstrap/Stack";
import "./UserProfilePopover.css";
import Image from "react-bootstrap/Image";
import transparent_profile from "./profile_icon_trans.png";
import FormUpdate from "../../Components/Form/FormUpdate";

import { logout as logoutUser, getDateFormatted } from "../../data/repository";
import ModalCheckPopup from "./ModalCheckPopup";

export default function UserProfilePopover({ user, logout, updateUser }) {
  //to display edit details modal
  const [updateDetailsClicked, setUpdateDetailsClicked] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const handleSignOutClick = () => {
    logout();
    logoutUser();
  };

  const handleShowWarningOpen = () => {
    setShowWarning(true);
  };

  const handleShowWarningClose = () => {
    setShowWarning(false);
  };

  const closeUpdate = () => {
    setUpdateDetailsClicked(false);
  }

  const popoverStyle = {
    width: "400px",
    maxHeight: "auto",
    zIndex: "100",
  };

  return (
    <>
      <OverlayTrigger
        trigger="click"
        placement={"bottom"}
        overlay={
          <Popover style={popoverStyle}>
            <Popover.Header className="custom-popover" as="h4">
              Profile
            </Popover.Header>
            <Popover.Body>
              <Stack className="custom-popover" gap={1}>
                <div className="p-4">
                  <Image
                    className="profile-pic"
                    src={transparent_profile}
                    roundedCircle
                  />
                </div>

                <div className="p-1">
                  <h3 style={{ marginBottom: "0px" }}>{user.username}</h3>
                </div>
                <div
                  className="p-1 email-text"
                  style={{ margin: "0px", marginBottom: "30px" }}
                >
                  <h6>{user.email}</h6>
                  <h6>Joined on {getDateFormatted(user.joinDate)}</h6>
                </div>
                <div className="p-1">
                  <Button
                    onClick={() => setUpdateDetailsClicked(true)}
                    className="m-1 bg-dark text-white"
                    variant="outline-dark"
                  >
                    Edit Details
                  </Button>
                  <Button
                    className="bg-danger text-white"
                    variant="outline-danger"
                    onClick={handleShowWarningOpen}
                  >
                    Delete Account
                  </Button>
                </div>

                <div className="p-2 pt-3">
                  <Button
                    onClick={handleSignOutClick}
                    className="bg-dark text-white"
                    variant="outline-dark"
                  >
                    Sign Out
                  </Button>
                </div>
              </Stack>
            </Popover.Body>
          </Popover>
        }
        rootClose={true}
      >
        <a>
          {" "}
          <h6 className="m-0">{user.username}</h6>
        </a>
      </OverlayTrigger>
      <Modal
        className="update-modal"
        centered
        size="sm"
        show={updateDetailsClicked}
        onHide={() => setUpdateDetailsClicked(false)}
      >
        <Modal.Header>
          <h4>Update Details</h4>
        </Modal.Header>
        <FormUpdate user={user} updateUser={updateUser} closeUpdate={closeUpdate}/>
      </Modal>

      <ModalCheckPopup
        show={showWarning}
        close={handleShowWarningClose}
        userEmail={user.email}
        logout={logout}
      />
    </>
  );
}
