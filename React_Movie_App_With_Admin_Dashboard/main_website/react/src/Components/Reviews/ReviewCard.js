import { Card, Stack, Button, Form, CloseButton } from "react-bootstrap";
import { useEffect, useState } from "react";
import Stars from "./Stars/Stars.js";
import "./review.css";

import {
  getReviews,
  updateReview,
  deleteReview,
  getUsernameFromId,
} from "../../data/repository";
import { useUser } from "../../CustomHooks/userContext.js";

function ReviewCard(props) {
  const [editMode, setEditMode] = useState(false);
  const [formContent, setFormContent] = useState(props.review.review);
  const [formEmpty, setFormEmpty] = useState(false);
  const [username, setUsername] = useState("");
  const [counter, setCounter] = useState(1);
  const [reviewDesc, setReviewDesc] = useState(props.review.REVIEW_DESC);

  const { user } = useUser();

  // Formatting the date
  const originalDate = new Date(props.review.DATETIME);
  const year = originalDate.getFullYear();
  const month = (originalDate.getMonth() + 1).toString().padStart(2, "0");
  const day = originalDate.getDate().toString().padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  useEffect(() => {
    async function getUsername() {
      const response = await getUsernameFromId(props.review.USER_ID);
      setUsername(response);
    }
    getUsername();
  }, []);

  const handleInputChange = (e) => {
    setFormContent(e.target.value);
    //disable button if empty

    if (e.target.value) {
      setFormEmpty(false);
      const contentTrimmed = e.target.value.trim();
      if (contentTrimmed.length > 250) {
        setFormEmpty(true);
      }
    } else {
      setFormEmpty(true);
    }
  };

  const handleEditClick = (e) => {
    setEditMode(true);
  };
  const handleFormUpdate = (e) => {
    updateReview({ REVIEW_DESC: formContent }, props.review.ID);

    setReviewDesc(formContent);

    setEditMode(false);
  };
  const handleFormClose = (e) => {
    setEditMode(false);
    setFormContent(props.review.review);
  };
  const handleDelete = (e) => {
    deleteReview(props.review.ID);
    setEditMode(false);

    const updatedPosts = props.posts.filter(post => post.ID !== props.review.ID);
    //update parent class useState to re-render
    props.setPosts(updatedPosts);
  };

  return (
    <>
      <Card>
        <Card.Header>
          <Stack direction="horizontal" gap={3}>
            <div>{username}</div>
            <div className="vr" />
            <div className="p-0 ms-left">
              <Stars rating={props.review.NO_STARS} reviewMode={false} />
            </div>
            <div className="p-1 ms-auto">
              {user && (
                <>
                {user.BLOCKED === 0 && props.currUser && props.currUser.ID === props.review.USER_ID && (
                  <>
                    {editMode ? (
                      <>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={handleFormUpdate}
                          disabled={formEmpty}
                        >
                          Update
                        </Button>
                        <CloseButton onClick={handleFormClose} />
                      </>
                    ) : (
                      <>
                      {props.review.REVIEW_DESC!=="[**** This review has been deleted by the admin ***]" &&(
                        <>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={handleEditClick}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={handleDelete}
                        >
                          Delete
                        </Button>
                        </>
                      )}
                      </>
                    )}
                  </>
                )}
                </>
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
                  placeholder={props.review.REVIEW_DESC}
                  value={formContent}
                />
              </Form.Group>
            </Form>
          </div>
        ) : (
          <>
            <Card.Text className="p-3 pb-0 mb-0">
              {reviewDesc}
            </Card.Text>
            <Card.Text className="p-3 pb-2 d-flex justify-content-end review-card-date">
              {"Posted on: " + formattedDate}
            </Card.Text>
          </>
        )}
      </Card>
    </>
  );
}

export default ReviewCard;
