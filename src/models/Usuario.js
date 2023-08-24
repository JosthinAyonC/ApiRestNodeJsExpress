import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";
import { Role } from "./Role.js";

export const Usuario = sequelize.define("usuarios", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ci: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    email: true,
    unique: true,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "A",
  },
});

Usuario.belongsToMany(Role, { through: 'usuario_role', timestamps: false });
Role.belongsToMany(Usuario, { through: 'usuario_role', timestamps: false });
