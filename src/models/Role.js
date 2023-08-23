import { DataTypes } from 'sequelize';
import { sequelize } from '../db/database.js'

export const Role = sequelize.define('roles',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.STRING,
        }
    }
);
