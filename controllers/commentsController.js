const commentsModel = require("../models/commentsModel");


const getComments = (req, res) => {
  const comments = commentsModel.getComments(req.params.id);
  if (comments) {
    res.status(200).json(comments);
  } else {
    res.status(404).json({ message: "Categoria no encontrada" });
  }
};

const createComment = (req, res) => {
  const createdComment = commentsModel.createComment(req.params.id, req.body);
  if (createdComment) {
    res.status(200).json(createdComment);
  } else {
    res.status(500).json({ message: "Ha ocurrido un error" });
  }
};


module.exports = {

    getComments,
    createComment,
};