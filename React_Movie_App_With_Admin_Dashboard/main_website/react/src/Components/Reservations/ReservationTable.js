import { Container, Row, Col, Table } from "react-bootstrap";
import "./reservations.css"
import { useUser } from "../../CustomHooks/userContext";
import { deleteReservationsById, fetchReservationsByUserId } from "../../data/repository";
import { useEffect, useState } from "react";
import {CiCircleRemove} from 'react-icons/ci';


export default function ReservationTable(props) {

    const handleRemove = (id,entry)=>{
        const { response, loadingRes, errorRes} = deleteReservationsById(id);
        const newReservations = props.reservations.filter(item => item !== entry);
        props.setReservations(newReservations);
    }

    return (
        <>
        <Container className="table-container">
            <Table striped hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Movie</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Seats</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>

            {props.reservations.map((entry,index) =>(
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{entry.MOVIE_SESSION.MOVIE.TITLE}</td>
                    <td>{entry.MOVIE_SESSION.DATE}</td>
                    <td>{entry.MOVIE_SESSION.TIME}</td>
                    <td>{entry.SEATS_BOOKED}</td>
                    <td ><CiCircleRemove className="remove-btn" size={25} color="black" onClick={()=>handleRemove(entry.ID,entry)}/></td>
                </tr>
                ))}

                </tbody>

            </Table> 
        </Container>
        </>
    );
}
