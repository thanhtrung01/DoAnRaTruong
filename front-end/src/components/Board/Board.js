import React, { useEffect, useState } from "react";
import "./style.scss";
import { initialData } from "../../assets/data/initialData";
import Column from "../Column/Column";
import { IoIosAdd } from "react-icons/io";
import { mapOrder } from "../../utils/sorts";
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag } from "../../utils/dragDrop";
import { CiSquareRemove } from "react-icons/ci";
import Sidebar from "../Sidebar/Sidebar";
import BoardNavBar from "../Header/BoardNavBar";

const BoardContent = () => {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false);
  const [newColumnValue, setNewColumnValue] = useState("");

  useEffect(() => {
    const boardFromDB = initialData.boards.find(
      (board) => board.id === "board-1"
    );

    if (boardFromDB) {
      setBoard(boardFromDB);

      setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, "id"));
    }
  }, []);

  if (!board) {
    return (
      <div className="not-found" style={{ padding: "10px", color: "white" }}>
        Board not found
      </div>
    );
  }

  const onColumnDrop = (dropResult) => {
    let newColumns = [...columns];
    newColumns = applyDrag(newColumns, dropResult);

    let newBoard = { ...board };
    newBoard.columnOrder = newColumns.map((c) => c.id);
    newBoard.columns = newColumns;

    setColumns(newColumns);
    setBoard(newBoard);
  };

  const onCardDrop = (columnId, dropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let newColumns = [...columns];
      let currentColumn = newColumns.find((c) => c.id === columnId);

      currentColumn.cards = applyDrag(currentColumn.cards, dropResult);
      currentColumn.cardOrder = currentColumn.cards.map((i) => i.id);

      setColumns(newColumns);
    }
  };

  const toggleNewColumnForm = () => {
    setOpenNewColumnForm(!openNewColumnForm);
  };

  const onNewColumnValueChange = (e) => setNewColumnValue(e.target.value);

  const addNewColumn = () => {
    if (!newColumnValue) return;

    const newColumnToAdd = {
      id: Math.random().toString(36).substring(2, 5),
      boardId: board.id,
      title: newColumnValue.trim(),
      cardOrder: [],
      cards: [],
    };

    let newColumns = [...columns];
    newColumns.push(newColumnToAdd);

    let newBoard = { ...board };
    newBoard.columnOrder = newColumns.map((c) => c.id);
    newBoard.columns = newColumns;
    setColumns(newColumns);
    setBoard(newBoard);
    setNewColumnValue("");
    toggleNewColumnForm();
  };

  return (
    <div className="wrapper">
      <Sidebar />
      <div className="board-container">
        <BoardNavBar />
        <div className="board-content">
          <Container
            orientation="horizontal"
            onDrop={onColumnDrop}
            dragHandleSelector=".column-drag-handle"
            dropPlaceholder={{
              animationDuration: 150,
              showOnTop: true,
              className: "columns-drop-preview",
            }}
            getChildPayload={(index) => columns[index]}
          >
            {columns.map((column, index) => (
              <Draggable key={index}>
                <Column column={column} onCardDrop={onCardDrop} />
              </Draggable>
            ))}
          </Container>
          <div className="add-new-column">
            {!openNewColumnForm ? (
              <div onClick={toggleNewColumnForm}>
                <IoIosAdd className="card-footer-icon" />
                <span>Add column</span>
              </div>
            ) : (
              <div>
                <input
                  type={"text"}
                  className="enter-new-column"
                  id="outlined-uncontrolled"
                  label="Enter text fiels"
                  autoFocus={true}
                  value={newColumnValue}
                  onChange={onNewColumnValueChange}
                  onKeyDown={(e) => e.key === "Enter" && addNewColumn()}
                />
                <div className="add-new-column-footer">
                  <button onClick={addNewColumn}>Add</button>
                  <CiSquareRemove
                    className="remove-add-new-column"
                    onClick={toggleNewColumnForm}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardContent;
