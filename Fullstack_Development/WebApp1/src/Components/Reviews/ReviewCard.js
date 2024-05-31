import { Card, Stack,Button,Form,CloseButton  } from "react-bootstrap";
import { useState } from "react";
import Stars from "./Stars/Stars.js";
import "./review.css";

import {
  getReviews,
  updateReview,
  deleteReview,
} from "../../data/repository";

function ReviewCard(props) {
  const [editMode, setEditMode] = useState(false);
  const [formContent, setFormContent] = useState(props.review.review);
  const [formEmpty, setFormEmpty] = useState(false);

  const handleInputChange = (e) => {
    setFormContent(e.target.value);
    //disable button if empty

    if(e.target.value){
      setFormEmpty(false);
        const contentTrimmed = e.target.value.trim();
        if (contentTrimmed.length > 250) {
          setFormEmpty(true);
    }
    }else{
    setFormEmpty(true);
    }

  };

  const handleEditClick = (e) => {
    setEditMode(true);

  };
  const handleFormUpdate = (e) => {
    updateReview(formContent, props.review);

    //update parent class useState to re-render
    props.setPosts(getReviews());
    setEditMode(false);
    // setFormContent("");

  };
  const handleFormClose = (e) => {
    setEditMode(false);
    setFormContent(props.review.review);
  };
  const handleDelete = (e) => {
    deleteReview(props.review)
    setEditMode(false);
    
    //update parent class useState to re-render
    props.setPosts(getReviews());
    
  };

  return (
    <>
        <Card>
          <Card.Header>
          <Stack direction="horizontal" gap={3}>
              <div>{props.review.user}</div>
              <div className="vr" />
              <div className="p-0 ms-left"><Stars 
                              rating={props.review.stars}
                              reviewMode = {false}
                                          /> 
              </div>
              <div className="p-1 ms-auto">
                {props.currUser && (
                    props.currUser.email === props.review.email && (
                      <>
                        {editMode ?(
                          <>
                          <Button variant="outline-secondary"
                            size="sm"
                            onClick={handleFormUpdate}
                            disabled={formEmpty}
                            >Update</Button>
                          <CloseButton onClick={handleFormClose}/>
                          </>
                        ):(
                          <>
                          <Button variant="outline-secondary"
                            size="sm"
                            onClick={handleEditClick}
                            
                            >Edit</Button>
                          <Button variant="outline-secondary"
                            size="sm"
                            onClick={handleDelete}
                            >Delete</Button>
                          </>
                        )}
                    </>
                  )
                )}
              </div>

              
          </Stack>
          </Card.Header>
          {editMode ? (
            <div>
              <Form className="p-2">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                  >
                  <Form.Control
                    as="textarea"
                    rows={3}
                    onChange={handleInputChange}
                    placeholder={props.review.review}
                    value={formContent}
                  />
                </Form.Group>
                </Form>
            </div>
          ) : (
            <>
            <Card.Text className="p-3 pb-0 mb-0">{props.review.review}</Card.Text>
            <Card.Text className="p-3 pb-2 d-flex justify-content-end review-card-date">
              {"Posted on: "+props.review.dateFormatted}
            </Card.Text>
            </>
          )}
        </Card>
    </>
  );
}

export default ReviewCard;
