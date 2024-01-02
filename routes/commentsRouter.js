/*
En este archivo se trabaja la lógica para responder las peticiones al servidor
*/
const express = require("express");
const commentsRouter = express.Router();

const commentsController = require("../controllers/commentsController");


commentsRouter.get("/:id", commentsController.getComments);
commentsRouter.post("/:id", commentsController.createComment);

module.exports = commentsRouter;