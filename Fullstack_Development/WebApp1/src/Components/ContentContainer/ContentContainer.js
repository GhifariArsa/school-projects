import React from "react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./container.css";
import MovieCard from "./MovieCard";
import Slideshow from "./Slideshow";
import Sidebar from "../Sidebar/Sidebar";
import MoviesSection from "./MoviesSection";
import { nowShowingMovies } from "../../Movies/movies";
import { comingSoonMovies } from "../../Movies/movies";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import About from "../About/About";

function ContentContainer(props) {
  const slideShowMoives = [];
  const [key, setKey] = useState("nowShowing");

  const tabTitleStyle = {
    color: key === "nowShowing" ? "black" : "white",
    fontWeight: "500",
  };

  const tabTitleStyleNotSelected = {
    fontWeight: "500",
    color: key === "nowShowing" ? "white" : "black", // Set color based on selected tab
  };

  return (
    <Container fluid className="main-container">
      <Row>
        <Slideshow />
      </Row>
      <Row className="d-flex justify-content-center">
        <About></About>
      </Row>
      <Row>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3 bg-dark"
          justify
        >
          <Tab
            eventKey="nowShowing"
            title={<span style={tabTitleStyle}>Now Showing</span>}
          >
            <Row className="justify-content-center">
              <MoviesSection movies={nowShowingMovies} user={props.user} />
            </Row>
          </Tab>

          <Tab
            eventKey="comingSoon"
            title={<span style={tabTitleStyleNotSelected}>Coming Soon</span>}
          >
            <Row className="justify-content-center">
              <MoviesSection movies={comingSoonMovies} user={props.user} />
            </Row>
          </Tab>
        </Tabs>
      </Row>
    </Container>
  );
}

export default ContentContainer;
