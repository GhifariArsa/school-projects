import Navbar from "./Components/Navbar/Navbar";
import {BrowserRouter as Router, Route, Routes, useFetcher} from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Signup from "./Pages/Signup";
import {Col, Container, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {
    setUserObjectLocalStorage,
    getUserObject,
    getUsernameFromEmail,
    setCurrentUser,
    getCurrentUserObject,
} from "./data/repository";
import LoginSuccessModal from "./Components/LoginSuccessModal/LoginSuccessModal";
import Footer from "./Components/Footer/Footer";
import signup from "./Pages/Signup";
import { UserProvider, useUser } from "./CustomHooks/userContext";
import ReservationsPage from "./Pages/ReservationsPage";
import { MovieProvider } from "./CustomHooks/movieContext";

function App() {
    const [email, setEmail] = useState()
    const [currentUserObject, setCurrentUserObject] = useState(getCurrentUserObject());
    const [username, setUsername] = useState("");
    const [showLoginSuccess, setShowLoginSuccess] = useState(false);
    const [navbarKey, setNavbarKey] = useState(0);

    useEffect(() => {
        if (currentUserObject !== null) {
            setUsername(currentUserObject.USERNAME);
        }
    }, []);

    const signUp = (userObject) => {
        // Setting user object Local storage
        setUserObjectLocalStorage({
            ID: userObject.ID,
            EMAIL: userObject.EMAIL,
            USERNAME: userObject.USERNAME,
            JOIN_DATE: userObject.JOIN_DATE,
            BLOCKED: userObject.BLOCKED
        })

        // Setting state values
        setCurrentUserObject(userObject);
        setUsername(userObject.USERNAME);

        setShowLoginSuccess(true);
    }

    const login = async (userObject) => {
        // Setting user Object to local storage
        setUserObjectLocalStorage(userObject);

        // Setting username and email
        setUsername(userObject.USERNAME);
        setEmail(userObject.EMAIL);

        setCurrentUserObject(userObject);
        setShowLoginSuccess(true);
    };

    const updateUser = async (userObject) => {
        // Setting user object Local storage
        setUserObjectLocalStorage({
            EMAIL: userObject.EMAIL,
            USERNAME: userObject.USERNAME,
            JOIN_DATE: userObject.JOIN_DATE
        })

        // Setting state values
        setCurrentUserObject(userObject);
        setUsername(userObject.USERNAME);

        // Refreshing the navbar
        setNavbarKey((prevKey) => prevKey + 1);
    };

    const logoutUser = (email) => {
        setUsername("");
        setCurrentUserObject(null);
    };

    return (
        <>
        <UserProvider>

        
            <Navbar
                username={username}
                userObject={currentUserObject}
                logout={logoutUser}
                updateUser={updateUser}
            />
            <MovieProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Home user={"gang"}/>}/>
                        <Route path="/login" element={<Login login={login}/>}></Route>
                        <Route
                            path="/profile"
                            element={<Profile logout={logoutUser}/>}
                        ></Route>
                        <Route path="/signup" element={<Signup login={signUp}/>}></Route>
                        <Route path="/reservations" element={<ReservationsPage/>}/>

                    </Routes>
                </Router>
            </MovieProvider>
            <Footer/>
            <LoginSuccessModal
                show={showLoginSuccess}
                username={username}
                onHide={() => setShowLoginSuccess(false)}
            />
        </UserProvider>
        </>
    );
}

export default App;
