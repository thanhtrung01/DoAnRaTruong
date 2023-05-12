const express = require("express");
const userController = require("../controllers/user.controller");
const upload = require("../middlewares/upload");
const authAdmin = require("../middlewares/authAdmin");
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - finished
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The title of your book
 *         description:
 *           type: string
 *           description: The book explanation
 *         published:
 *           type: boolean
 *           description: Whether you have finished reading the book
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the book was added
 *     
 */
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The books managing API
 * /get-user:
 *   get:
 *     summary: Lists all the books
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 */
router.get('/get-user', userController.getUser);
router.get('/get-users', authAdmin, userController.getAllUser);
router.post('/get-user-with-email', userController.getUserWithMail);
router.patch('/:userId', upload.Avatar('avatar'), userController.updateUser);
router.post('/create-user',authAdmin, upload.Avatar('avatar'), userController.createUser);
module.exports = router;
