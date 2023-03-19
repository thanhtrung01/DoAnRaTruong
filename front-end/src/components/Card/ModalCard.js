import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { MdSubtitles, MdOutlineDateRange } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { AiOutlineTags } from "react-icons/ai";
import { BsCheck2Square } from "react-icons/bs";
import { AiFillFileAdd, AiFillFileImage } from "react-icons/ai";

function ModalCard() {
  const [show, setShow] = useState(true);
  let navigate = useNavigate();

  const handleToggleModal = () => {
    navigate("/");
    setShow(!show);
  };

  return (
    <>
      <div className="overlay"></div>
      {show && (
        <div className="card-modal">
          <div className="modal-container">
            <header className="modal-header">
              <MdSubtitles />
              <div className="modal-header-title">
                <h6>[FrontEnd][Tu-Nhut-Huy] ReactJS</h6>
                <p>
                  trong danh sach
                  <Link to="/">To Do</Link>
                </p>
              </div>
            </header>

            <div className="modal-content-box">
              <div className="modal-content-desc">
                <p>Mô tả</p>
                <textarea placeholder="Thêm mô tả chi tiết..."></textarea>
              </div>
              <div className="modal-sidebar">
                <p>Thêm vào thẻ</p>
                <div className="model-sidebar-item">
                  <Link className="sidebar-item-link" to={"/member"}>
                    <BiUser />
                    <span>Thành viên</span>
                  </Link>
                </div>
                <div className="model-sidebar-item">
                  <Link className="sidebar-item-link" to={"/tag"}>
                    <AiOutlineTags />
                    <span>Nhãn</span>
                  </Link>
                </div>
                <div className="model-sidebar-item">
                  <Link className="sidebar-item-link" to={"/tag"}>
                    <BsCheck2Square />
                    <span>Việc cần làm</span>
                  </Link>
                </div>
                <div className="model-sidebar-item">
                  <Link className="sidebar-item-link" to={"/tag"}>
                    <MdOutlineDateRange />
                    <span>Ngày</span>
                  </Link>
                </div>
                <div className="model-sidebar-item">
                  <Link className="sidebar-item-link" to={"/tag"}>
                    <AiFillFileAdd />
                    <span>Đính kèm</span>
                  </Link>
                </div>
                <div className="model-sidebar-item">
                  <Link className="sidebar-item-link" to={"/tag"}>
                    <AiFillFileImage />
                    <span>Ảnh</span>
                  </Link>
                </div>
              </div>
            </div>

            <footer>
              <Button variant="secondary" onClick={handleToggleModal}>
                Close
              </Button>
              <Button variant="primary" onClick={handleToggleModal}>
                Save Changes
              </Button>
            </footer>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalCard;
