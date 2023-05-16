import React, { useState } from "react";
import Button from "../../ReUsableComponents/Button";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/EditOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  SearchArea,
  Title,
  Row,
  Colorbox,
  ColorText,
  IconWrapper,
  SmallColorsContainer,
  SmallColorBox,
  BlueButton,
  ButtonContainer,
  RedButton,
} from "./styled";
import {
  labelCreate,
  labelDelete,
  labelUpdate,
  labelUpdateSelection,
} from "../../../../../Services/cardService";
import { openAlert } from "../../../../../Redux/Slices/alertSlice";

const LabelsPopover = (props) => {
  const { currentPage } = props;
  const dispatch = useDispatch();
  const thisCard = useSelector((state) => state.card);
  const [selectedCard, setSelectedCard] = useState({
    _id: "",
    color: "",
    text: "",
    backColor: "",
  });
  const colors = thisCard.colors;

  const handleCreateClick = async (text, color, backColor) => {
    props.arrowCallback(false);
    props.titleCallback("Labels");
    await labelCreate(
      thisCard.cardId,
      thisCard.listId,
      thisCard.boardId,
      text,
      color,
      backColor,
      dispatch
    );
  };

  const handleSaveClick = async (labelId, text, color, backColor) => {
    props.arrowCallback(false);
    props.titleCallback("Labels");
    await labelUpdate(
      thisCard.cardId,
      thisCard.listId,
      thisCard.boardId,
      labelId,
      { text, color, backColor },
      dispatch
    );
  };

  const handleColorBoxClick = async (labelId, selected) => {
    await labelUpdateSelection(
      thisCard.cardId,
      thisCard.listId,
      thisCard.boardId,
      labelId,
      selected,
      dispatch
    );
  };

  const handleDeleteClick = async (labelId) => {
    props.arrowCallback(false);
    props.titleCallback("Labels");
    await labelDelete(
      thisCard.cardId,
      thisCard.listId,
      thisCard.boardId,
      labelId,
      dispatch
    );
  };

  const LabelComponent = (props) => {
    return (
      <Row>
        <Colorbox
          bg={props.color}
          hbg={props.backColor}
          onClick={() => {
            handleColorBoxClick(props._id, !props.selected);
          }}
        >
          <ColorText>{props.text}</ColorText>
          {props.selected && <DoneIcon fontSize="1rem" />}
        </Colorbox>
        <IconWrapper
          onClick={() => {
            setSelectedCard({
              _id: props._id,
              color: props.color,
              text: props.text,
              backColor: props.backColor,
            });
            props.arrowCallback(true);
            props.titleCallback("Change");
          }}
        >
          <EditIcon color="#091e42" fontSize="1rem" />
        </IconWrapper>
      </Row>
    );
  };

  const mainPage = (
    <Container>
      <SearchArea placeholder="Tìm nhãn..." />
      <Title>Nhãn</Title>
      {thisCard.labels.map((label) => {
        return (
          <LabelComponent
            key={label._id}
            {...label}
            arrowCallback={props.arrowCallback}
            titleCallback={props.titleCallback}
          />
        );
      })}

      <br />
      <Button
        clickCallback={() => {
          props.arrowCallback(true);
          props.titleCallback("Create");
        }}
        title="Tạo nhãn mới"
      />
    </Container>
  );

  const CreatePage = () => {
    const [createText, setCreateText] = useState("");
    const [createColor, setCreateColor] = useState("#0079bf");
    const [createBackColor, setCreateBackColor] = useState("#055a8c");

    return (
      <Container>
        <Title>Tiêu đề</Title>
        <SearchArea
          placeholder="Nhập tiêu đề..."
          value={createText}
          onChange={(e) => setCreateText(e.target.value)}
        />
        <Title>Chọn một màu</Title>
        <SmallColorsContainer>
          {colors.map((color) => {
            return (
              <SmallColorBox
                key={color.bg}
                bg={color.bg}
                hbg={color.hbg}
                onClick={() => {
                  setCreateColor(color.bg);
                  setCreateBackColor(color.hbg);
                }}
              >
                {color.bg === createColor && <DoneIcon fontSize="1rem" />}
              </SmallColorBox>
            );
          })}
        </SmallColorsContainer>
        <ButtonContainer>
          <BlueButton
            onClick={() => {
              if (createText && createColor && createBackColor)
                handleCreateClick(createText, createColor, createBackColor);
              else
                dispatch(
                  openAlert({
                    severity: "error",
                    message: "Vui lòng điền tất cả thông tin cần thiết!",
                  })
                );
            }}
          >
            Thêm
          </BlueButton>
        </ButtonContainer>
      </Container>
    );
  };

  const ChangePage = () => {
    const [changeText, setChangeText] = useState(selectedCard.text);
    const [changeColor, setChangeColor] = useState(selectedCard.color);
    const [changeBackColor, setChangeBackColor] = useState(
      selectedCard.backColor
    );
    return (
      <Container>
        <Title>Tiêu đề</Title>
        <SearchArea
          placeholder="Nhập tiêu đề..."
          value={changeText}
          onChange={(e) => setChangeText(e.target.value)}
        />
        <Title>Chọn một màu</Title>
        <SmallColorsContainer>
          {colors.map((color) => {
            return (
              <SmallColorBox
                key={color.bg}
                bg={color.bg}
                hbg={color.hbg}
                onClick={() => {
                  setChangeColor(color.bg);
                  setChangeBackColor(color.hbg);
                }}
              >
                {changeColor === color.bg && <DoneIcon fontSize="1rem" />}
              </SmallColorBox>
            );
          })}
        </SmallColorsContainer>
        <ButtonContainer>
          <BlueButton
            onClick={() => {
              if (changeText && changeColor && changeBackColor)
                handleSaveClick(
                  selectedCard._id,
                  changeText,
                  changeColor,
                  changeBackColor
                );
              else
                dispatch(
                  openAlert({
                    severity: "error",
                    message: "Vui lòng điền tất cả các khu vực cần thiết!",
                  })
                );
            }}
          >
            Lưu
          </BlueButton>
          <RedButton onClick={() => handleDeleteClick(selectedCard._id)}>
            {" "}
            Xoá
          </RedButton>
        </ButtonContainer>
      </Container>
    );
  };

  return (
    <>
      {currentPage === "Labels" ? (
        mainPage
      ) : currentPage === "Create" ? (
        <CreatePage />
      ) : (
        <ChangePage />
      )}
    </>
  );
};

export default LabelsPopover;
