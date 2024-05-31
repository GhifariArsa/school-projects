import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home";
import Sidebar from "./Components/Sidebar/Sidebar";
import {Col, Container, Row} from "react-bootstrap";
import Users from "./pages/Users/Users";
import {ReviewProvider} from "./Components/ReviewContext/ReviewContext";
import Movies from "./pages/Movies/Movies";
import {MovieProvider} from "./Components/MoviesContext/MoviesContext";
import {UserProvider} from "./Components/UserContext/UserContext";
import Analytics from "./pages/Analytics/Analytics";

function App() {
    return (
        <>
            <MovieProvider>
                <ReviewProvider>
                    <UserProvider>
                        <Router>
                            <Row>
                                <Col md={3}>
                                    <Sidebar/>
                                </Col>
                                <Col md={8}>
                                    <Routes>
                                        <Route path="/" element={<Home/>}/>
                                        <Route path="/users" element={<Users/>}/>
                                        <Route path="/data" element={<Analytics/>}/>
                                        <Route path="/edit-movies" element={<Movies/>}/>
                                    </Routes>
                                </Col>
                            </Row>
                        </Router>
                    </UserProvider>
                </ReviewProvider>
            </MovieProvider>

        </>
    );
}

export default App;
