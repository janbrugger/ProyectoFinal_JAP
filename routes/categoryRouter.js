/*
En este archivo se trabaja la lógica para responder las peticiones al servidor
*/
const express = require("express");
const categoryRouter = express.Router();

const categoryController = require("../controllers/categoryController");

categoryRouter.get("/", categoryController.getCategories);

categoryRouter.get("/:id", categoryController.getCategoryById);

module.exports = categoryRouter;
