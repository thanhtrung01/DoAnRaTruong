const { findOne } = require('../models/board.model');
const boardModel = require('../models/board.model');
const userModel = require('../models/user.model');

const create = async (req, callback) => {
  try {
    const { title, backgroundImageLink, members } = req.body;
    // Create and save new board
    let newBoard = boardModel({ title, backgroundImageLink });
    newBoard.save();

    // Add this board to owner's boards
    const user = await userModel.findById(req.user.id);
    user.boards.unshift(newBoard.id);
    await user.save();

    // Add user to members of this board
    let allMembers = [];
    allMembers.push({
      user: user.id,
      avatar: user.avatar,
      name: user.name,
      username: user.username,
      email: user.email,
      color: user.color,
      role: 'owner',
    });

    // Save newBoard's id to boards of members and,
    // Add ids of members to newBoard
    await Promise.all(
      members.map(async (member) => {
        const newMember = await userModel.findOne({ email: member.email });
        newMember.boards.push(newBoard._id);
        await newMember.save();
        allMembers.push({
          user: newMember._id,
          avatar: newMember.avatar,
          name: newMember.name,
          username: newMember.username,
          email: newMember.email,
          color: newMember.color,
          role: 'member',
        });
        //Add to board activity
        newBoard.activity.push({
          user: user.id,
          avatar: user.avatar,
          name: user.name,
          action: `đã thêm người dùng '${newMember.name}' cho bảng n`,
        });
      }),
    );

    // Add created activity to activities of this board
    newBoard.activity.unshift({
      user: user._id,
      avatar: user.avatar,
      name: user.name,
      action: 'Tạo ra bản này',
      color: user.color,
    });

    // Save new board
    newBoard.members = allMembers;
    await newBoard.save();

    return newBoard;
  } catch (error) {
    return callback({
      errMessage: 'Something went wrong',
      details: error.message,
    });
  }
};

const getAll = async (userId, callback) => {
  try {
    // Get user
    const user = await userModel.findById(userId);

    // Get board's ids of user
    const boardIds = user.boards;

    // Get boards of user
    const boards = await boardModel.find({ _id: { $in: boardIds } });

    // Delete unneccesary objects
    boards.forEach((board) => {
      board.activity = undefined;
      board.lists = undefined;
    });

    return callback(false, boards);
  } catch (error) {
    return callback({ msg: 'Something went wrong', details: error.message });
  }
};

const getById = async (id, callback) => {
  try {
    // Get board by id
    const board = await boardModel.findById(id);
    return callback(false, board);
  } catch (error) {
    return callback({
      message: 'Something went wrong',
      details: error.message,
    });
  }
};

const getActivityById = async (id, callback) => {
  try {
    // Get board by id
    const board = await boardModel.findById(id);
    return callback(false, board.activity);
  } catch (error) {
    return callback({
      message: 'Something went wrong',
      details: error.message,
    });
  }
};

const updateBoardTitle = async (boardId, title, user, callback) => {
  try {
    // Get board by id
    const board = await boardModel.findById(boardId);
    board.title = title;
    board.activity.unshift({
      user: user._id,
      avatar: user.avatar,
      name: user.name,
      action: 'Cập nhật tiêu đề của bảng này',
      color: user.color,
    });
    await board.save();
    return callback(false, { message: 'Success!' });
  } catch (error) {
    return callback({
      message: 'Something went wrong',
      details: error.message,
    });
  }
};

const updateBoardDescription = async (boardId, description, user, callback) => {
  try {
    // Get board by id
    const board = await boardModel.findById(boardId);
    board.description = description;
    board.activity.unshift({
      user: user._id,
      avatar: user.avatar,
      name: user.name,
      action: 'Cập nhật mô tả của bảng này',
      color: user.color,
    });
    await board.save();
    return callback(false, { message: 'Success!' });
  } catch (error) {
    return callback({
      message: 'Something went wrong',
      details: error.message,
    });
  }
};

const updateBackground = async (id, background, isImage, user, callback) => {
  try {
    // Get board by id
    const board = await boardModel.findById(id);

    // Set variables
    board.backgroundImageLink = background;
    board.isImage = isImage;

    // Log the activity
    board.activity.unshift({
      user: user._id,
      avatar: user.avatar,
      name: user.name,
      action: 'Cập nhật nền của bảng này',
      color: user.color,
    });

    // Save changes
    await board.save();

    return callback(false, board);
  } catch (error) {
    return callback({
      message: 'Something went wrong',
      details: error.message,
    });
  }
};

const addMember = async (id, members, user, callback) => {
  try {
    // Get board by id
    const board = await boardModel.findById(id);

    // Set variables
    await Promise.all(
      members.map(async (member) => {
        const newMember = await userModel.findOne({ email: member.email });
        newMember.boards.push(board._id);
        board.members.push({
          user: newMember._id,
          avatar: newMember.avatar,
          name: newMember.name,
          users: newMember.name,
          email: newMember.email,
          color: newMember.color,
          role: 'member',
        });
        await newMember.save();
        //Add to board activity
        board.activity.push({
          user: user.id,
          avatar: user.avatar,
          name: user.name,
          action: `Đã thêm người dùng'${newMember.name}' cho bảng này`,
          color: user.color,
        });
      }),
    );
    // Save changes
    await board.save();

    return callback(false, board.members);
  } catch (error) {
    return callback({
      message: 'Something went wrong',
      details: error.message,
    });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  getActivityById,
  updateBoardTitle,
  updateBoardDescription,
  updateBackground,
  addMember,
};
