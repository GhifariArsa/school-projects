import React, { useEffect } from "react";
import { useState } from "react";
import { Container, Row } from "react-bootstrap";
import "./container.css";
import Slideshow from "./Slideshow";
import MoviesSection from "./MoviesSection";
import { nowShowingMovies } from "../../Movies/movies";
import { comingSoonMovies } from "../../Movies/movies";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import About from "../About/About";
import { fetchMovies } from "../../data/repository";
import useMovies from "../../CustomHooks/useMovies";
import Error from "../Error/Error";
import { useMovieContext } from "../../CustomHooks/movieContext";

function ContentContainer(props) {
  
  const [key, setKey] = useState("nowShowing");
  // const [movies, setMovies] = useState([]);
  const { moviesNow,moviesSoon,moviesCarousel, loading, error} = useMovieContext();

  const tabTitleStyle = {
    color: key === "nowShowing" ? "black" : "white",
    fontWeight: "500",
  };

  const tabTitleStyleNotSelected = {
    fontWeight: "500",
    color: key === "nowShowing" ? "white" : "black", // Set color based on selected tab
  };

  if(loading) return (<h1>Loading...</h1>);
  if(error) return (<Error/>);

  return (
    <Container fluid className="main-container">
      <Row>
        <Slideshow movies={moviesCarousel}/>
      </Row>
      <Row className="d-flex justify-content-center">
        <About/>
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
                  <MoviesSection movies={moviesNow} user={props.user} />
            </Row>
          </Tab>

          <Tab
            eventKey="comingSoon"
            title={<span style={tabTitleStyleNotSelected}>Coming Soon</span>}
          >
            <Row className="justify-content-center">
                <MoviesSection movies={moviesSoon} user={props.user} loading={loading}/>
            </Row>
          </Tab>
        </Tabs>
      </Row>
    </Container>
  );
}

export default ContentContainer;
