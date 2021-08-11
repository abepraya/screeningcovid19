import React from "react";
import "./Card.css";

const Card = (props) => {
  return (
    <div className="card">
      <div className="card-combine">
          <div className="img-card">
            <img
              src={props.img}
              className="card-img-top img-fluid"
              alt={props.alt}
            />
          </div>
          <div
            className="card-body card-description"
            // style={{ backgroundColor: `${props.cardColor}` }}
          >
            <h5 className="card-title" 
            // style={{ color: `${props.textColor}` }}
            >
              {props.title}
            </h5>
            <h6 className="card-text" 
            // style={{ color: `${props.textColor}` }}
            >
              {props.value}
            </h6>
            <h7 className="card-text" 
            // style={{ color: `${props.textColor}` }}
            >
              {props.lastUpdate}
            </h7>
          </div>
      </div>  
    </div>
  );
};

export default Card;
