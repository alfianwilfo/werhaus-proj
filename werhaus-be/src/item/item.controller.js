const Validator = require("validatorjs");
const model = require("../../config/model.config")
const Item = model.item
const Type = model.type
const Helper = require("./item.helper")

exports.store = async (req, res, next) => {
    let { name, count, type } = req.body
    let error_msg = {
        required: ":attribute cannot be null",
        in: "invalid :attribute",
    };
    let id = await Helper.getId()
    
    let rules = {
        name: 'required',
        type: 'required',
        count: 'required|min:1'
    }
    let validation = new Validator({ name, count, type }, rules, error_msg);
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
            await Item.create({ id, name, count, type })
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

exports.storeType = async (req, res, next) => {
    let { name } = req.body
    let error_msg = {
        required: ":attribute cannot be null",
        in: "invalid :attribute",
    };
    let id = await Helper.getId()
    
    let rules = {
        name: 'required',
    }
    let validation = new Validator({ name }, rules, error_msg);
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
    async function passes() {
        try {
            await Type.create({ id, name })
            res.json({
                code: 201,
                status: "success",
                message: ["Create type success"],
                result: [],
            });
        } catch (err) {
            err.message = err.name === 'SequelizeUniqueConstraintError' ? 'Type already in database' : 
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

exports.listType = async (req, res, next) => {
  let { order, sort } = req.query;
  order = order ? order : "createdAt";
  sort = sort ? sort : "desc";

  let rules = {
    order: "in:name,createdAt,name",
    sort: "in:asc,desc",
  };

  let error_msg = {
    in: "invalid :attribute",
  };

   let validation = new Validator(req.query, rules, error_msg);
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
      offset: offset,
      limit: limit,
      total: 0,
      result: [],
    });
  }

  async function passes() {
    try {
        let data = await Type.findAll({ order: [[order, sort]], where: { status: 1 } })
        let result = await Helper.getType(data)
        res.json({
            code: 200,
            status: "success",
            message: ["List type success"],
            result
        })
    } catch (err) {
        err.message = err.message.includes("SQLState")
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