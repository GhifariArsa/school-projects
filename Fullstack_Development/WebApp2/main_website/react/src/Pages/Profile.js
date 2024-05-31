import { Button } from "react-bootstrap";
import { logout } from "../data/repository";
import { useNavigate } from "react-router-dom";

function Profile(props) {
    const navigate = useNavigate();

    const handleClick = () => {
        props.logout();
        logout();
        navigate('/');
    }
    return (
        <>
        <h1>Profile</h1>
        <Button onClick={handleClick}>Sign Out</Button>
        </>
    )
}

export default Profile;