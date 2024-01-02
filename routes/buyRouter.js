const express = require("express");
const buyRouter = express.Router();

const buyController = require("../controllers/buyController");

buyRouter.get("/", buyController.getBuyMsg);

module.exports = buyRouter;
