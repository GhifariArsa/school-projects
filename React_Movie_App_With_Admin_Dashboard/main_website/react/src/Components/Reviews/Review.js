import { useEffect, useState } from "react";
import {
  addReview,
  getCurrentUserObject,
  getCurrentDateFormatted,
  fetchMovieReviewsById,
} from "../../data/repository";
import { Form, Button, Modal, Container } from "react-bootstrap";
import ReviewCard from "./ReviewCard";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, validateUserForReviews } from "../../data/repository";
import Stack from "react-bootstrap/Stack";
import Stars from "./Stars/Stars.js";
import { useUser } from "../../CustomHooks/userContext";
import useMovies from "../../CustomHooks/useMovies";
import { useMovieContext } from "../../CustomHooks/movieContext";

function Review(props) {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [formEmpty, setFormEmpty] = useState(true);
  const [submitSignal, setSubmitSignal] = useState(false);
  const [rating, setRating] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const { user } = useUser();

  //for error modal for reviews
  const handleShow = () => setShowErrorModal(true);
  const handleClose = () => setShowErrorModal(false);

  let currentUser = getCurrentUser();
  let currentUserObj = getCurrentUserObject();
  let loggedIn = false;

  useEffect(() => {
    async function fetchReviews() {
      const response = await fetchMovieReviewsById(props.movie.ID);
      setPosts(response);
    }
    fetchReviews();
  },[]);

  if (currentUser === null) {
    loggedIn = false;
  } else {
    loggedIn = true;
  }

  const handleInputChange = (e) => {
    setContent(e.target.value);
    //disable button if empty
    if (e.target.value) {
      setFormEmpty(false);
    } else {
      setFormEmpty(true);
    }

    //disable if exceeds 600 characters
    const contentTrimmed = content.trim();
    if (contentTrimmed.length > 600) {
      setFormEmpty(true);
    }
  };

  //style on button hover
  const buttonStyle = {
    backgroundColor: props.colourBg,
    color: props.colourTxt,
    border: "1px solid " + props.colourBg,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contentTrimmed = content.trim();
    //check with timestamps for spam reviews
    const numReviews = 2;
    const maxMins = 1;
    if (!validateUserForReviews(currentUserObj.email, numReviews, maxMins)) {
      //user left 2 reviews within 10 mins, which is the max amount
      //user cannot spam
      //show error modal
      setErrorMessage(
        "Cannot submit more than " +
          numReviews +
          " reviews under " +
          maxMins +
          " minute(s)!"
      );
      handleShow();
      return;
    }
    //close all child review edits by signalling
    setSubmitSignal(!submitSignal);
    //reset rating stars
    setRating(0);
    //user here is current users email

    const reviewObject = {
      MOVIE_ID: props.movie.ID,
      USER_ID: currentUserObj.ID,
      REVIEW_DESC: contentTrimmed,
      NO_STARS: rating,
      DATETIME : new Date()
    };

    // addReview(reviewObject);
    const response = await addReview(reviewObject);
    //update posts list
    setPosts([response,...posts]);
    // Clear the content after submitting the review
    setContent("");
    setFormEmpty(true);
  };

  return (
    <>
      {currentUser === null ? (
        <>
          <h6>You have to be logged in to post a review</h6>
        </>
      ) : user.BLOCKED === 0 ? (
        <>
          <Form className="p-2">
            <Form.Group
              className="mb-0"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>
                <h6>Add your review and rate</h6>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={handleInputChange}
                value={content}
                placeholder="Share your movie experience"
              />
            </Form.Group>
            <Stars
              key={submitSignal}
              setRating={setRating}
              rating={rating}
              reviewMode={true}
            />
            <Button
              variant="primary"
              // type="submit"
              className="text-white"
              style={buttonStyle}
              onClick={handleSubmit}
              disabled={formEmpty || rating == 0}
            >
              Submit
            </Button>
          </Form>
        </>
      ) : (
        <h6>You have been blocked</h6>
      )}
      {posts && (
        <Container>
          <Stack gap={3}>
            {posts.map((review, index) => {
              return (
                <div className="p-2">
                  <ReviewCard
                    key={review.ID}
                    review={review}
                    currUser={currentUserObj}
                    loggedIn={loggedIn}
                    signal={submitSignal}
                    posts={posts}
                    setPosts={setPosts}
                    updateRating={props.updateRating}
                  />
                </div>
              );
            })}
          </Stack>
        </Container>
      )}
      <Modal
        show={showErrorModal}
        onHide={handleClose}
        centered
        size="sm"
        className="modal-error"
      >
        <Modal.Header closeButton className="mb-0 pb-2">
          <Modal.Title className="mb-0">
            <h6>Failed Submitting Review</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessage}</Modal.Body>
      </Modal>
    </>
  );
}

export default Review;
