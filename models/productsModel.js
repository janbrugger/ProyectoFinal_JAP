const fs = require("fs");
const path = require("path");

const getProductInfo = (id) => {
const filePath = path.join(__dirname, '../json/emercado-api/products/', `${id}.json`);


const data = fs.readFileSync(filePath, "utf-8");
const products = JSON.parse(data);

  return products;
};



module.exports = {

    getProductInfo,

};
