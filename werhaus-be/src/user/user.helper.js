const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

exports.hashPassword = async (password) => {
    const hash = bcrypt.hashSync(password, +process.env.SALT);
    return hash
}

exports.comparePassword = async (password, hash) => {
  return bcrypt.compareSync(password, hash);
}

exports.getId = async () => {
  let id = Math.floor(Math.random() * 2341223423423423);
  return id
};

exports.createToken = async (data) => {
  var token = await jwt.sign(data, process.env.SECRET, { expiresIn: 10 * 60 });
  return token
}

exports.decodedToken = async (token) => {
  var decoded = jwt.verify(token, process.env.SECRET);
  console.log(decoded, 'decod');
}