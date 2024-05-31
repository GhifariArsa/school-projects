import { Button, Container, Col, Row, Nav } from "react-bootstrap";
import ContentContainer from "../Components/ContentContainer/ContentContainer";
import Sidebar from "../Components/Sidebar/Sidebar";

import movies from "../Movies/movies";

function Home(props) {
    return (
      <>
        <Row>
          {/* <Col xs={2} md={2} lg={2} classname="bg-light">
            <Sidebar />
          </Col> */}
          <Col>
            <ContentContainer user={props.user}/>
          </Col>
        </Row>
      </>
    )
}

export default Home;