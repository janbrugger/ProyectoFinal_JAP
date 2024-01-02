/*
En este archivo se trabaja la persistencia y consulta de datos 
con la base de datos. 
Por simplicidad, se opta por trabajar en un archivo JSON usando el módulo FileSystem,
pero se podría utilizar MariaDB
*/

const fs = require("fs");
const path = require("path");

//const filePath = path.join(__dirname, "../json/users.json");
const filePath = path.join(__dirname, "../json/emercado-api/cats/cat.json");

const data = fs.readFileSync(filePath, "utf-8");
const categories = JSON.parse(data);


const getCategories = () => {
  return categories;
};

const getCategoryById = (id) => {
  return categories.find((category) => category.id === parseInt(id));
};


module.exports = {
  getCategories,
  getCategoryById,
};
