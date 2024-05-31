import {Card} from "react-bootstrap";

export default function SidebarButton (props) {
    return (
        <>
            <Card>
                <Card.Body>
                    {props.name}
                </Card.Body>
            </Card>
        </>
    )
}