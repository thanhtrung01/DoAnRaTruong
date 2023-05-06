const Board = require("../services/board.service");
const BoardSchema = require("../models/board.model");
const create = async (req, res) => {
  const { title, backgroundImageLink } = req.body;
  if (!(title && backgroundImageLink))
    return res
      .status(400)
      .send({ errMessage: "Tiêu đề và/hoặc hình ảnh không thể để trống" });
  await Board.create(req, (err, result) => {
    if (err) return res.status(500).send(err);
    result.__v = undefined;
    return res.status(201).send(result);
  });
};

const getAll = async (req, res) => {
  const userId = req.user.id;
  await Board.getAll(userId, (err, result) => {
    if (err) return res.status(400).send(err);
    return res.status(200).send(result);
  });
};

const getAllBoard = async (req, res) => {
  try {
    const boards = await BoardSchema.find({}).sort("__v");
    const countboards = await BoardSchema.countDocuments();
    return res.status(200).json({
      ok: true,
      count: countboards,
      board: boards,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err.message });
  }
};

const getById = async (req, res) => {
  // Validate whether params.id is in the user's boards or not
  const validate = req.user.boards.filter((board) => board === req.params.id);
  if (!validate)
    return res.status(400).send({
      errMessage:
        "Bạn không thể hiển thị bảng này, bạn không phải là thành viên hoặc chủ sở hữu!",
    });

  // Call the service
  await Board.getById(req.params.id, (err, result) => {
    if (err) return res.status(400).send(err);
    return res.status(200).send(result);
  });
};

const getActivityById = async (req, res) => {
  // Validate whether params.id is in the user's boards or not
  const validate = req.user.boards.filter((board) => board === req.params.id);
  if (!validate)
    return res.status(400).send({
      errMessage:
        "Bạn không thể hiển thị bảng này, bạn không phải là thành viên hoặc chủ sở hữu!",
    });

  // Call the service
  await Board.getActivityById(req.params.id, (err, result) => {
    if (err) return res.status(400).send(err);
    return res.status(200).send(result);
  });
};

const updateBoardTitle = async (req, res) => {
  // Validate whether params.id is in the user's boards or not
  const validate = req.user.boards.filter((board) => board === req.params.id);
  if (!validate)
    return res.status(400).send({
      errMessage:
        "Bạn không thể thay đổi tiêu đề của bảng này, bạn không phải là thành viên hoặc chủ sở hữu!",
    });
  const { boardId } = req.params;
  const { title } = req.body;
  // Call the service
  await Board.updateBoardTitle(boardId, title, req.user, (err, result) => {
    if (err) return res.status(400).send(err);
    return res.status(200).send(result);
  });
};

const updateBoardDescription = async (req, res) => {
  // Validate whether params.id is in the user's boards or not
  const validate = req.user.boards.filter((board) => board === req.params.id);
  if (!validate)
    return res.status(400).send({
      errMessage:
        "Bạn không thể thay đổi mô tả của bảng này, bạn không phải là thành viên hoặc chủ sở hữu!",
    });
  const { boardId } = req.params;
  const images_url = req.files.map((image) => image.path);
  // const { description, image } = req.body;
  // Call the service
  await Board.updateBoardDescription(
    boardId,
    {
      description: req.body.description,
      images: images_url,
    },
    req.user,
    (err, result) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send(result);
    }
  );
};

const updateBackground = async (req, res) => {
  // Validate whether params.id is in the user's boards or not
  const validate = req.user.boards.filter((board) => board === req.params.id);
  if (!validate)
    return res.status(400).send({
      errMessage:
        "Bạn không thể thay đổi nền của bảng này, bạn không phải là thành viên hoặc chủ sở hữu!",
    });
  const { boardId } = req.params;
  const { background, isImage } = req.body;
  // Call the service
  await Board.updateBackground(
    boardId,
    background,
    isImage,
    req.user,
    (err, result) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send(result);
    }
  );
};

const addMember = async (req, res) => {
  // Validate whether params.id is in the user's boards or not
  const validate = req.user.boards.filter((board) => board === req.params.id);
  if (!validate)
    return res.status(400).send({
      errMessage:
        "Bạn không thể thêm thành viên vào bảng này, bạn không phải là thành viên hoặc chủ sở hữu!",
    });
  const { boardId } = req.params;
  const { members } = req.body;
  // Call the service
  await Board.addMember(boardId, members, req.user, (err, result) => {
    if (err) return res.status(400).send(err);
    return res.status(200).send(result);
  });
};
const deleteBoard = (req, res) => {};
module.exports = {
  create,
  getAll,
  getAllBoard,
  getById,
  getActivityById,
  updateBoardTitle,
  updateBoardDescription,
  updateBackground,
  addMember,
  deleteBoard,
};
