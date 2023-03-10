import React from "react";
import "./style.scss";

const Card = (props) => {
  const { card } = props;
  return (
    <div className="card-item">
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
  );
};

export default Card;
