import React from "react";
import "./style.scss";
import { mapOrder } from "../../utils/sorts";
import Card from "../Card/Card";
import { IoIosAdd } from "react-icons/io";
import { Container, Draggable } from "react-smooth-dnd";

const Column = (props) => {
  const { column, onCardDrop } = props;
  const cards = mapOrder(column.cards, column.cardOrder, "id");

  return (
    <div className="column">
      <header className="column-drag-handle">{column.title}</header>
      <div className="card-list">
        <Container
          orientation="vertical"
          groupName="col"
          onDrop={(dropResult) => onCardDrop(column.id, dropResult)}
          getChildPayload={(index) => cards[index]}
          dragClass="card-ghost"
          dropClass="card-ghost-drop"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: "card-drop-preview",
          }}
          dropPlaceholderAnimationDuration={200}
        >
          {cards.map((card, index) => (
            <Draggable key={index}>
              <Card card={card} />
            </Draggable>
          ))}
        </Container>
      </div>
      <footer className="card-footer">
        <IoIosAdd className="card-footer-icon" /> <span>Add card</span>
      </footer>
    </div>
  );
};

export default Column;
