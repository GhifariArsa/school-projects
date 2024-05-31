import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getUsernameFromEmail,getUserObjectFromEmail } from "../../data/repository";
import UserProfilePopover from "./UserProfilePopover";
import "./navbar.css"
import Error from "../Error/Error";
import { useUser } from "../../CustomHooks/userContext";

function Navbar(props) {

  const{user} = useUser();

  return (
    <Container fluid className="bg-dark text-white">
      <Row>
        <Col xs={2} md={2} lg={2} className="bg-dark text-center p-2">
          <a className="text-decoration-none link" href={"/"}>
            <h3>LoopWeb</h3>
          </a>
        </Col>
        <Col
          md="8" sm ="8"
          className="d-flex justify-content-center align-items-center"
        >
          {/* <form className="text-center w-100">
            <input
              className="bg-dark w-100 text-light"
              type="text"
              id="myOutline"
              placeholder="Search any movie..."
            />
          </form> */}
        </Col>
        {props.username === "" ? (
          <>
            <Col
              className="p-1 text-center d-flex justify-content-center gap-5 align-items-center"
              md="2"
            >
              <a className="text-decoration-none m-0 p-1 link" href={"/login"}>
                Login
              </a>
              <a className="text-decoration-none m-0 p-1 link" href={"/signup"}>
                Sign Up
              </a>
            </Col>
          </>
        ) : (
          <>
            <Col
              className="text-center d-flex align-items-center justify-content-center"
              md="2" sm="auto"
            >
                <UserProfilePopover user ={props.userObject} logout={props.logout} updateUser={props.updateUser}/>
                <a className="r-link text-decoration-none link" href={"/reservations"}>Reservations</a>
            </Col>

          </>
        )}
      </Row>
    </Container>
  );
}

export default Navbar;
