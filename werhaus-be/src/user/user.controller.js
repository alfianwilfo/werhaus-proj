const model = require("../../config/model.config")
const User = model.user
const Token = model.token
const Validator = require("validatorjs");
const Helper = require("./user.helper")

exports.register = async (req, res, next) => {
    const { email, name, password } = req.body.employee_detail
    const id = await Helper.getId()
    let message = []
    let error_msg = {
        required: ":attribute cannot be null",
        in: "invalid :attribute",
    };
    let rules = {
        email: 'required|email',
        name: 'required',
        password: 'required'
    }
    let validation = new Validator({ email, name, password }, rules, error_msg);
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
            let hashPassword = await Helper.hashPassword(password)
            await User.create({ id, email, name, password: hashPassword })
            res.json({
                code: 201,
                status: "success",
                message: ["Register Success"],
                result: [],
            })
        } catch (err) {
            err.message = err.name === 'SequelizeUniqueConstraintError' ? 'Email already in use' : 
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

exports.login = async (req, res, next) => {
    let { email, password } = req.body.employee_detail
    let error_msg = {
        required: ":attribute cannot be null",
        in: "invalid :attribute",
    };

    let rules = {
        email: 'required|email',
        password: 'required'
    }
    let validation = new Validator({ email, password }, rules, error_msg);
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
            let findedUser = await User.findOne({ where: { email } })
            if (!findedUser) {
                res.json({
                    code: 401,
                    status: "error",
                    message: ["wrong email or password"],
                    result: [],
                })
            }
            let comparePassword = await Helper.comparePassword(password, findedUser.password)
            if (!comparePassword) {
                res.json({
                    code: 401,
                    status: "error",
                    message: ["wrong email or password"],
                    result: [],
                })
            }

            const token = await Token.findOne({ where: { employee_id: findedUser.id } })
            if (!token) {
                const createdToken = await Helper.createToken({ employee_id: findedUser.id })
                const id = await Helper.getId()
                await Token.create({ id, employee_id: findedUser.id, token: createdToken })
                res.json({
                    code: 200,
                    status: "success",
                    message: ["Login Success"],
                    result: [createdToken],
                })
            } else if (token) {
                const createdToken = await Helper.createToken({ employee_id: findedUser.id })
                await Token.update({ token: createdToken }, { where: { employee_id: findedUser.id } })
                res.json({
                    code: 200,
                    status: "success",
                    message: ["Login Success"],
                    result: [createdToken],
                })
            }
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