import React from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";

const Card = ({ card }) => {
  let navigate = useNavigate();

  return (
    <>
      <div className="card-item" onClick={() => navigate("/card-details")}>
        {card.cover && (
          <img
            onMouseDown={(e) => e.preventDefault()}
            className="card-cover"
            src={card.cover}
            alt="tu"
          ></img>
        )}
        {card.title}
      </div>
    </>
  );
};

export default Card;
