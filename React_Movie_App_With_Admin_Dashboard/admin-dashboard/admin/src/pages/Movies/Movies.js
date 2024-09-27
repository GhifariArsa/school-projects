import {
  useMovie,
  useMovieActions,
} from "../../Components/MoviesContext/MoviesContext";
import MovieCard from "../../Components/MovieCard/MovieCard";
import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

export default function Movies() {
    const { movies, addMovie } = useMovie();
  
    const [newMovie, setNewMovie] = useState({
      TITLE: "",
      RUNTIME: "",
      RATING_CLASS: "", // Initial value is empty
      COMING_SOON: false,
    });
  
    const [inputError, setInputError] = useState({
      TITLE: false,
      RUNTIME: false,
      RATING_CLASS: false,
    });
  
    const handleChange = (event) => {
      const { name, value, type, checked } = event.target;
      const inputValue = type === "checkbox" ? checked : value;
  
      setNewMovie({
        ...newMovie,
        [name]: inputValue,
      });
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Input validation
      if (!newMovie.TITLE || !newMovie.RUNTIME || !newMovie.RATING_CLASS) {
        // Set inputError to true for the empty fields
        setInputError({
          TITLE: !newMovie.TITLE,
          RUNTIME: !newMovie.RUNTIME,
          RATING_CLASS: !newMovie.RATING_CLASS,
        });
        return;
      }
  
      addMovie(newMovie);
  
      // Reset the form and inputError
      setNewMovie({
        TITLE: "",
        RUNTIME: "",
        RATING_CLASS: "",
        COMING_SOON: false,
      });
      setInputError({
        TITLE: false,
        RUNTIME: false,
        RATING_CLASS: false,
      });
    };
  
    return (
      <Container>
        <h1>Movies</h1>
        <div className="movie-form mb-3 p-3 border border-primary rounded">
          <h2>Create a New Movie</h2>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Title:</Form.Label>
                  <Form.Control
                    type="text"
                    name="TITLE"
                    value={newMovie.TITLE}
                    onChange={handleChange}
                    isInvalid={inputError.TITLE}
                  />
                  <Form.Control.Feedback type="invalid">
                    Title cannot be empty.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Runtime:</Form.Label>
                  <Form.Control
                    type="text"
                    name="RUNTIME"
                    value={newMovie.RUNTIME}
                    onChange={handleChange}
                    isInvalid={inputError.RUNTIME}
                  />
                  <Form.Control.Feedback type="invalid">
                    Runtime cannot be empty.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Rating Class:</Form.Label>
                  {/* Dropdown for Rating Class */}
                  <Form.Control
                    as="select"
                    name="RATING_CLASS"
                    value={newMovie.RATING_CLASS}
                    onChange={handleChange}
                    isInvalid={inputError.RATING_CLASS}
                  >
                    <option value="">Select Rating Class</option>
                    <option value="G">G</option>
                    <option value="PG">PG</option>
                    <option value="PG-13">PG-13</option>
                    <option value="R">R</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Rating Class cannot be empty.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Check
                    type="checkbox"
                    label="Coming Soon"
                    name="COMING_SOON"
                    checked={newMovie.COMING_SOON}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button type="submit" variant="primary" className="mt-3">
              Create Movie
            </Button>
          </Form>
        </div>
        <div className="movie-list">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.ID}></MovieCard>
          ))}
        </div>
      </Container>
    );
  }
  