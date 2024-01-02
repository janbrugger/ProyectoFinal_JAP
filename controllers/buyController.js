const buyModel = require("../models/buyModel");

const getBuyMsg = (req, res) => {
    res.json(buyModel.getBuyMsg());
  };


  module.exports = {
    getBuyMsg,
  };