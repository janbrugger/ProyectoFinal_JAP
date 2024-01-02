const categoryProductModel = require("../models/categoryProductModel");


const getCategoryProduct = (req, res) => {
  const catsProducts = categoryProductModel.getCategoryProduct(req.params.id);
  if (catsProducts) {
    res.status(200).json(catsProducts);
  } else {
    res.status(404).json({ message: "Categoria no encontrada" });
  }
};



module.exports = {

    getCategoryProduct,

};
