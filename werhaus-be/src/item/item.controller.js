const Validator = require("validatorjs");
const model = require("../../config/model.config")
const Item = model.item
const Helper = require("./item.helper")

exports.store = async (req, res, next) => {
    let { name, count } = req.body
    let error_msg = {
        required: ":attribute cannot be null",
        in: "invalid :attribute",
    };
    let id = await Helper.getId()
    
    let rules = {
        name: 'required',
        count: 'required|min:1'
    }
    let validation = new Validator({ name, count }, rules, error_msg);
    validation.checkAsync(passes, fails);
    function fails() {
       let message = [];
       for (var key in validation.errors.all()) {
         var value = validation.errors.all()[key];
         message.push(value[0]);
       }
       return res.status(200).json({
         code: 401,
         status: "error",
         message: message,
         result: [],
       });
    }
    
    async function passes () {
        try {
            await Item.create({ id, name, count })
            res.json({
                code: 201,
                status: "success",
                message: ["Create item success"],
                result: [],
            });
        } catch (err) {
            err.message = err.name === 'SequelizeUniqueConstraintError' ? 'Item already in database' : 
                err.message.includes("SQLState")
                ? "Query syntax error."
                : err.message;
            res.status(200).json({
                code: 400,
                status: "error",
                message: [err.message],
                result: [],
            });
        }
    }
}

exports.list = async (req, res, next) => {
}