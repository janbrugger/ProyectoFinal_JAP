const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../json/emercado-api/cart/buy.json");
const data = fs.readFileSync(filePath, "utf-8");
const message = JSON.parse(data);

const getBuyMsg = () => {
    return message
};



module.exports = {

    getBuyMsg,

};
