const categoryModel = require("../models/categoryModel");

const getCategories = (req, res) => {
  res.json(categoryModel.getCategories());
};

const getCategoryById = (req, res) => {
  const category = categoryModel.getCategoryById(req.params.id);
  if (category) {
    res.status(200).json(category);
  } else {
    res.status(404).json({ message: "Categoria no encontrada" });
  }
};



module.exports = {
  getCategories,
  getCategoryById,
};
