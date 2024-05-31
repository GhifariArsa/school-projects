import {createContext, useContext, useEffect, useState} from "react";
import {getReviews} from "../../data/repository";

const ReviewContext = createContext();

export function useReview() {
    return useContext(ReviewContext);
}

export function ReviewProvider({ children }) {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        loadReviews();
    }, []);

    const deleteReview = async (id) => {
        return await deleteReview(id);
    }
    const loadReviews = async () => {
        const review = await getReviews();
        setReviews(review);
    };

    return (
        <ReviewContext.Provider value={{ reviews }}> {/* Passing the value prop here */}
            {children}
        </ReviewContext.Provider>
    );
}