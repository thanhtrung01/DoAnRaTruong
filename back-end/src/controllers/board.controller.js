const Board = require('../services/board.service');

const create = async (req, res) => {
	const { title, backgroundImageLink } = req.body;
	if (!(title && backgroundImageLink))
		return res
			.status(400)
			.send({ errMessage: 'Title and/or image cannot be null' });
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

const getById = async (req, res) => {
	// Validate whether params.id is in the user's boards or not
	const validate = req.user.boards.filter((board) => board === req.params.id);
	if (!validate)
		return res.status(400).send({
			errMessage:
				'You can not show the this board, you are not a member or owner!',
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
				'You can not show the this board, you are not a member or owner!',
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
				'You can not change title of this board, you are not a member or owner!',
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
				'You can not change description of this board, you are not a member or owner!',
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
				'You can not change background of this board, you are not a member or owner!',
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
				'You can not add member to this board, you are not a member or owner!',
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
	getById,
	getActivityById,
	updateBoardTitle,
	updateBoardDescription,
	updateBackground,
	addMember,
	deleteBoard,
};
