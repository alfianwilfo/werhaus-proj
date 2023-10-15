const Config = require("./db.config")
const Sequelize = Config.Sequelize;
const sequelize = Config.sequelize;

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;



function table_user() {
  const Table = sequelize.define(
    "user",
    {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        unique: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: false,
      }
    },
    {
      underscored: true,
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
      tableName: "users",
    }
  );
  return Table;
}

function table_token() {
    const Table = sequelize.define(
    "token",
    {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      employee_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      token: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      underscored: true,
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
      tableName: "tokens",
    }
  );
  return Table;
}

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
      name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      count: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING, 
        allowNull: false,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      }
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

function table_type() {
    const Table = sequelize.define(
    "type",
    {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      }
    },
    {
      underscored: true,
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
      tableName: "types",
    }
  );
  return Table;
}

db.item = table_item()
db.user = table_user()
db.token = table_token()
db.item = table_item()
db.type = table_type()

module.exports = db;
