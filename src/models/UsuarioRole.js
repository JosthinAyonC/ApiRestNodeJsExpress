import { DataTypes } from 'sequelize';
import { sequelize } from '../db/database.js'
import { Usuario } from './Usuario.js';
import { Role } from './Role.js';

export const UsuarioRole = sequelize.define('usuario_role',
    {
        idUsuario: {
            type: DataTypes.INTEGER,
            references: {
                model: Usuario,
                key: 'id'
            }
        },
        IdRole: {
            type: DataTypes.INTEGER,
            references: {
                model: Role,
                key: 'id'
            }
        }
    }
)
Role.belongsToMany(Usuario, { through: 'usuario_role' });
Usuario.belongsToMany(Role, { through: 'usuario_role' });