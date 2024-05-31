import { Button, Container, Col, Row, Nav } from "react-bootstrap";
import ContentContainer from "../Components/ContentContainer/ContentContainer";

import movies from "../Movies/movies";

function Home(props) {
    return (
      <>
        <Row>
          <Col>
            <ContentContainer user={props.user}/>
          </Col>
        </Row>
      </>
    )
}

export default Home;