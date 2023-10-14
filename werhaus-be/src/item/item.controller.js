const model = require("../../config/model.config")
const Item = model.item
exports.itemList = async (req, res, next) => {
    const item = await Item.findAll();
    console.log(item, 'itemmmmmm');
}