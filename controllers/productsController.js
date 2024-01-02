const productsModel = require("../models/productsModel");


const getProductInfo = (req, res) => {
  const products = productsModel.getProductInfo(req.params.id);
  if (products) {
    res.status(200).json(products);
  } else {
    res.status(404).json({ message: "Categoria no encontrada" });
  }
};



module.exports = {

    getProductInfo,

};
