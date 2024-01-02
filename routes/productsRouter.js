/*
En este archivo se trabaja la lógica para responder las peticiones al servidor
*/
const express = require("express");
const productsRouter = express.Router();

const productsController = require("../controllers/productsController");


productsRouter.get("/:id", productsController.getProductInfo);

module.exports = productsRouter;
