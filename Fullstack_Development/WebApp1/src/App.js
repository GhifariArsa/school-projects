import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Signup from "./Pages/Signup";
import Sidebar from "./Components/Sidebar/Sidebar";
import { Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import {
  getCurrentUser,
  getUserObjectFromEmail,
  getUsernameFromEmail,
} from "./data/repository";
import LoginSuccessModal from "./Components/LoginSuccessModal/LoginSuccessModal";
import Footer from "./Components/Footer/Footer";

function App() {
  const [email, setEmail] = useState(getCurrentUser());
  const [showLoginSuccess, setShowLoginSuccess] = useState(false);
  const [navbarKey, setNavbarKey] = useState(0);

  const login = (email) => {
    setEmail(email);
    setShowLoginSuccess(true);
  };

  const updateUser = (email) => {
    setEmail(email);
    setNavbarKey((prevKey) => prevKey + 1);
  };

  const logoutUser = (email) => {
    setEmail(null);
  };

  return (
    <>
      <Navbar
        username={getUsernameFromEmail(email)}
        userObject={getUserObjectFromEmail(email)}
        logout={logoutUser}
        updateUser={updateUser}
      />
      <Router>
        <Routes>
          <Route path="/" element={<Home user={email} />} />
          <Route path="/login" element={<Login login={login} />}></Route>
          <Route
            path="/profile"
            element={<Profile logout={logoutUser} />}
          ></Route>
          <Route path="/signup" element={<Signup login={login} />}></Route>
        </Routes>
      </Router>
      <Footer />
      <LoginSuccessModal
        show={showLoginSuccess}
        username={getUsernameFromEmail(email)}
        onHide={() => setShowLoginSuccess(false)}
      />
    </>
  );
}

export default App;
