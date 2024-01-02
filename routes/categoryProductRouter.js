/*
En este archivo se trabaja la lógica para responder las peticiones al servidor
*/
const express = require("express");
const categoryProductRouter = express.Router();

const categoryProductController = require("../controllers/categoryProductController");


categoryProductRouter.get("/:id", categoryProductController.getCategoryProduct);

module.exports = categoryProductRouter;