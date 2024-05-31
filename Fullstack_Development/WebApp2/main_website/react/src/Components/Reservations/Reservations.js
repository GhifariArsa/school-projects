import { Container, Row, Col } from "react-bootstrap";
import "./reservations.css"
import { useUser } from "../../CustomHooks/userContext";
import { fetchReservationsByUserId } from "../../data/repository";
import { useEffect, useState } from "react";
import ReservationTable from "./ReservationTable";



export default function Reservations() {
    const{user} = useUser();
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    
    useEffect(() => {
        if(user.ID){
            
            async function fetchReservations() {
                const { reservationsRes, loadingRes, errorRes} = await fetchReservationsByUserId(user.ID); 
    
                setReservations(reservationsRes);
                setLoading(loadingRes);
                setError(errorRes);
            } 
    
            fetchReservations();
            console.log(reservations);
        }
    }, [user]);

    return (
        <>
            <Container className="main">
                    <Row className="p-2">
                    <h3>Reservations</h3>
                    </Row>
                <Row>
                    {reservations ?
                    (
                        <ReservationTable setReservations={setReservations} reservations={reservations}
                        userID = {user.ID}/>
                    ):(
                        <h5>Loading</h5>
                    )}
                </Row>
            </Container>
        </>
    );
}
