import { useState } from "react";
import {
  addReview,
  getReviews,
  getCurrentUserObject,
  getCurrentDateFormatted,
} from "../../data/repository";
import { Form, Button, Modal,Container } from "react-bootstrap";
import ReviewCard from "./ReviewCard";
import { useNavigate } from "react-router-dom";
import { getCurrentUser,validateUserForReviews}  from "../../data/repository";
import Stack from "react-bootstrap/Stack";
import Stars from "./Stars/Stars.js";




function Review(props) {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState(getReviews());
  const [formEmpty, setFormEmpty] = useState(true);
  const [submitSignal, setSubmitSignal] = useState(false);
  const [rating, setRating] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);

  //for error modal for reviews
  const handleShow = () => setShowErrorModal(true);
  const handleClose = () => setShowErrorModal(false);


  let currentUser = getCurrentUser();
  let currentUserObj = getCurrentUserObject();
  let loggedIn = false;

  if(currentUser===null){
    loggedIn = false;
  }else{
    loggedIn = true;
  }

  const handleInputChange = (e) => {
    setContent(e.target.value);
    //disable button if empty
    if(e.target.value){
      setFormEmpty(false);
    }else{
      setFormEmpty(true);
    }

    //disable if exceeds 250 characters
    const contentTrimmed = content.trim();
    if (contentTrimmed.length > 250) {
      setFormEmpty(true);
    }

  };

  //style on button hover
  const buttonStyle = {
    backgroundColor: props.colourBg,
    color: props.colourTxt,
    border: "1px solid " + props.colourBg,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const contentTrimmed = content.trim();



    //check with timestamps for spam reviews
    const numReviews = 2;
    const maxMins = 1;
    if(!validateUserForReviews(currentUserObj.email,numReviews,maxMins)){
      //user left 2 reviews within 10 mins, which is the max amount
      //user cannot spam

      //show error modal
      setErrorMessage("Cannot submit more than "+numReviews+" reviews under "+maxMins+" minute(s)!");

      handleShow();
      return;
    }
    

    //close all child review edits by signalling
    setSubmitSignal(!submitSignal);

    //reset rating stars
    setRating(0);




    //user here is current users email
    addReview({
      movie: props.movie,
      review: contentTrimmed,
      user: currentUserObj.username,
      email: currentUserObj.email,
      stars: rating,
      dateFormatted: getCurrentDateFormatted(),
      dateObject: new Date(),

    });
    // Clear the content after submitting the review
    setContent("");
    setFormEmpty(true);


    // if (props.closeModal) {
    //   props.closeModal();
    // }
    setPosts(getReviews());
  };

  return (
    <>
      {currentUser === null ? (
        <>
          <h6>You have to be logged in to post a review</h6>
        </>
      ) : (
        <>
          <Form className="p-2">
            <Form.Group
              className="mb-0"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label><h6>Add your review and rate</h6></Form.Label>
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
              reviewMode = {true}
            />
            <Button
              variant="primary"
              // type="submit"
              className="text-white"
              style={buttonStyle}
              onClick={handleSubmit}
              disabled={formEmpty || rating==0}
            >
              Submit
            </Button>
          </Form>
        </>
      )}
      {posts && (
            <Container>
              <Stack gap={3}>
              {posts.map((review, index) => {
                if (review.movie.title === props.movie.title) {
                  return (
                    <div className="p-2">

                      <ReviewCard
                        key={submitSignal}
                        review = {review}
                        currUser = {currentUserObj}
                        loggedIn = {loggedIn}
                        signal = {submitSignal}
                        setPosts = {setPosts}
                        updateRating = {props.updateRating}
                        
                        />
                    </div>
                  );
                }
                return null;
              })}
              </Stack>
            </Container>
          )}
      <Modal show={showErrorModal} onHide={handleClose}
        centered
        size="sm"
        className="modal-error"
        >
        <Modal.Header closeButton className="mb-0 pb-2">
          <Modal.Title className="mb-0"><h6>Failed Submitting Review</h6></Modal.Title>
        </Modal.Header>
          <Modal.Body>{errorMessage}</Modal.Body>
      </Modal>
    </>
  );
}

export default Review;
