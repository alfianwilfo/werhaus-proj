const Config = require("./db.config")
const Sequelize = Config.Sequelize;
const sequelize = Config.sequelize;

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

function table_item() {
  const Table = sequelize.define(
    "item",
    {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
    },
    {
      underscored: true,
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
      tableName: "items",
    }
  );
  return Table;
}

db.item = table_item();

module.exports = db;
