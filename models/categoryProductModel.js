/*
En este archivo se trabaja la persistencia y consulta de datos 
con la base de datos. 
Por simplicidad, se opta por trabajar en un archivo JSON usando el módulo FileSystem,
pero se podría utilizar MariaDB
*/

const fs = require("fs");
const path = require("path");

const getCategoryProduct = (id) => {
const filePath = path.join(__dirname, '../json/emercado-api/cats_products/', `${id}.json`);


const data = fs.readFileSync(filePath, "utf-8");
const catsProducts = JSON.parse(data);






  return catsProducts;
};



module.exports = {

    getCategoryProduct,

};
