const express = require("express");
const boardController = require("../controllers/board.controller");
const authAdmin = require("../middlewares/authAdmin");
const route = express.Router();

route.post("/:boardId/add-member", boardController.addMember);
route.put("/:boardId/update-background", boardController.updateBackground);
route.put(
  "/:boardId/update-board-description",
  boardController.updateBoardDescription
);
route.put("/:boardId/update-board-title", boardController.updateBoardTitle);
route.post("/create", boardController.create);
route.get("/:id", boardController.getById);
route.get("/:id/activity", boardController.getActivityById);
route.get("/admin/get-all", authAdmin, boardController.getAllBoard);
route.get("/", boardController.getAll);
route.delete("/delete/:boardId", authAdmin, boardController.adminDeleteBoard);
route.delete("/owner-delete-or-exit-board/:boardId",  boardController.ownerDeleteOrExitBoard);
module.exports = route;
