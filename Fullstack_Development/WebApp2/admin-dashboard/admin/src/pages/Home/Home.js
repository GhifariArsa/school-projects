import { useReview } from "../../Components/ReviewContext/ReviewContext";
import ReviewCard from "../../Components/ReviewCard/ReviewCard";
import {Row} from "react-bootstrap";
import {deleteReview} from "../../data/repository";

export default function Home() {
    const { reviews } = useReview();

    return (
        <>
        <h1>Reviews</h1>
            {reviews.map((review, index) => (

                <Row className="mb-2">
                    <ReviewCard review={review} ></ReviewCard>
                </Row>
            ))}
        </>
    );
}