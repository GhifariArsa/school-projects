import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./star.css";


const Stars = (props)=> {
    const [hover, setHover] = useState(0);
  return (
    <>
      {props.reviewMode ? (
          <div className="mb-3">
                {[...Array(5)].map((star, index) => {
                    index += 1;
            return (
                
            <button
                type="button"
                key={index}
                className={index <= (hover || props.rating) ? "on" : "off"}
                onClick={() => props.setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(props.rating)}
            >
                <span className="star">&#9733;</span>
            </button>
            );
        })}
              
            </div>

          ) : (
            <div className="mb-0 p-0">
                {[...Array(5)].map((star, index) => {
                    index += 1;
                    return (
                        
                    <span
                        key={index}
                        className={index <= (props.rating) ? "on" : "off"}
                    >
                        <span className="star-card">&#9733;</span>
                    </span>
                    );
                })}
            </div>
          )}
    </>
      
  );
};
export default Stars;