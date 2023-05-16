import LoadingScreen from "../../LoadingScreen";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBoards, OwnerDeleteBoard } from "../../../Services/boardsService";
import Navbar from "../../Navbar";
import { Container, Wrapper, Title, Board, AddBoard, More, SpanTitle } from "./Styled";
import CreateBoard from "../../Modals/CreateBoardModal/CreateBoard";
import { useHistory } from "react-router";
import { IconButton, Menu, MenuItem, Snackbar, Alert } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const Boards = (props) => {
  const dispatch = useDispatch();
  const [successMessage, setSuccessMessage] = useState("");
  const history = useHistory();
  const infoUser = useSelector((state) => state.user.userInfo);
  const { pending, boardsData } = useSelector((state) => state.boards);
  console.log("infoUser", infoUser)
  const [openModal, setOpenModal] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBoardId, setSelectedBoardId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleClick = (e) => {
    history.push(`/board/${e.target.id}`);
  };

  const handleMenuOpen = (event, boardId) => {
    setSelectedBoardId(boardId);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setSelectedBoardId(null);
    setAnchorEl(null);
  };

  const handleDeleteBoard = async (boardId) => {
    handleMenuClose();
    const board = boardsData.find((item) => item._id === boardId);
    const owner = board.members.find((member) => member.role === "owner");

    if (owner) {
      try {
        await OwnerDeleteBoard(boardId, dispatch);
        setSuccessMessage("Bạn đã xoá bảng thành công!");
      } catch (error) {
      }
    } else {
      try {
        setSuccessMessage("Bạn đã thoát bảng thành công!");
      } catch (error) {
      }
    }
  };
  useEffect(() => {
    getBoards(false, dispatch);
  }, [dispatch]);

  useEffect(() => {
    document.title = "Boards | Todoweb";
  }, []);

  return (
    <>
      {pending && <LoadingScreen />}
      <Container>
        <Navbar searchString={searchString} setSearchString={setSearchString} />

        <Wrapper>
          <Title>Bảng của bạn</Title>
          {!pending &&
            boardsData.length > 0 &&
            boardsData
              .filter((item) =>
                searchString
                  ? item.title.toLowerCase().includes(searchString.toLowerCase())
                  : true
              )
              .map((item) => {
                const boardId = item._id;
                const owner = item.members.find((member) => member.role === "owner");
                const isMember = infoUser.boards.some((board) => board._id === boardId);

                return (
                  <div className="board-item" key={boardId}>
                    <Board>
                      <SpanTitle
                        link={item.backgroundImageLink}
                        isImage={item.isImage}
                        id={boardId}
                        onClick={(e) => handleClick(e)}
                      >
                        {item.title}
                      </SpanTitle>
                    </Board>

                    <IconButton
                      className="board-item-btn"
                      onClick={(e) => handleMenuOpen(e, boardId)}
                    >
                      <MoreVertIcon />
                    </IconButton>

                    <Menu
                      anchorEl={anchorEl}
                      open={selectedBoardId === boardId}
                      onClose={handleMenuClose}
                      anchorOrigin={{ vertical: "top", horizontal: "right" }}
                      transformOrigin={{ vertical: "top", horizontal: "right" }}
                    >
                      {owner && isMember ? (
                        <MenuItem onClick={() => handleDeleteBoard(boardId)}>Xoá bảng</MenuItem>
                      ) : (
                        <MenuItem onClick={() => handleDeleteBoard(boardId)}>Thoát khỏi bảng</MenuItem>
                      )}
                      {successMessage && (
                        <Snackbar open={true} autoHideDuration={3000} onClose={() => setSuccessMessage("")}>
                          <Alert onClose={() => setSuccessMessage("")} severity="success">
                            {successMessage}
                          </Alert>
                        </Snackbar>
                      )}
                    </Menu>
                  </div>
                );
              })}
          {!pending && (
            <AddBoard onClick={() => setOpenModal(true)}>Tạo bảng mới</AddBoard>
          )}
          {openModal && <CreateBoard callback={handleModalClose} />}
        </Wrapper>
      </Container>
    </>
  );
};

export default Boards;