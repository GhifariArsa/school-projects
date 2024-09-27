import {Button, Col, Container} from "react-bootstrap";
import SidebarButton from "../SidebarButton/SidebarButton";
import './sidebar.css'
import {Link} from "react-router-dom";

export default function Sidebar() {
    return (
        <>
            <Col className="bg-light p-0">
                <Container>
                    <h2>Admin Dashboard</h2>
                    <ul>
                        <Link to={'/'}>
                            <li><SidebarButton name={"Reviews"}/></li>
                        </Link>
                        <Link to={'/users'}>
                            <li><SidebarButton name={"Users"} /></li>
                        </Link>
                        <Link to={'/data'}>
                            <li><SidebarButton name={"Data Analytics"} /></li>
                        </Link>
                        <Link to={'/edit-movies'}>
                            <li><SidebarButton name={"Edit Movies"}/></li>
                        </Link>
                    </ul>
                </Container>
            </Col>
        </>
    )
        ;
}
