import { Col, Container, Row } from "react-bootstrap";

export default function About() {
  return (
    <>
      <Container className="border border-dark rounded m-4 bg-dark text-light w-75">
        <Col className="p-2">
          <Row>
            <h4>About Us</h4>
          </Row>
          <Row>
            <h6>Welcome to Loop Cinema, where the magic of storytelling meets the silver screen. We are more than just a movie theater – we are your gateway to unforgettable cinematic experiences. At Loop Cinema, we believe in the power of film to transport, inspire, and entertain. With locations like Sydney, Melbourne, Brisbane, and Perth, Loop Cinema brings movies to audiences across Australia.</h6>
          </Row>
        </Col>
      </Container>
    </>
  );
}
