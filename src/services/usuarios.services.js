import bcryptjs from "bcryptjs";
import { Role } from "../models/Role.js";
import { Usuario } from "../models/Usuario.js";
import { Op } from "sequelize";

const usuarioService = {
    getAllUsers: async () => {
        try {
            const usuarios = await Usuario.findAll({
                where: { status: { [Op.ne]: "N" } },
                include: {
                    model: Role,
                    through: {
                        attributes: [],
                    },
                },
            });
            return usuarios;
        } catch (error) {
            throw new Error(error);
        }
    },

    getByIdUser: async (usuarioId) => {
        try {
            const usuario = await Usuario.findOne({
                where: { id: usuarioId },
                include: {
                    model: Role,
                    through: {
                        attributes: [],
                    },
                },
            });
            if (usuario) {
                return usuario;
            } else {
                return null;
            }
        } catch (error) {
            throw new Error(error);
        }
    },

    createUser: async (usuarioData) => {
        try {
            let rolesToAdd = [];
            if (usuarioData.roles && usuarioData.roles.length > 0) {
                rolesToAdd = await Role.findAll({
                    where: { name: usuarioData.roles },
                });
            } else {
                const defaultRole = await Role.findOne({ where: { name: "USER" } });
                rolesToAdd.push(defaultRole);
            }
            //Encriptacion de clave
            const salt = bcryptjs.genSaltSync();
            usuarioData.password = bcryptjs.hashSync(usuarioData.password, salt);
            //Creacion del usuario
            const createdusuario = await Usuario.create(usuarioData);
            await createdusuario.addRoles(rolesToAdd);

            const usuarioWithRoles = await usuarioService.getByIdUser(createdusuario.id);

            if (usuarioWithRoles) {
                return usuarioWithRoles.toJSON();
            } else {
                return null;
            }
        } catch (error) {
            throw new Error(error);
        }
    },

    updateUser: async (usuario, id) => {
        try {
            await Usuario.update(usuario, { where: { id } });
            const usuarioUpdate = await usuarioService.getByIdUser(id);
            if (usuarioUpdate) {
                return usuarioUpdate.toJSON();
            } else {
                return null;
            }
        } catch (error) {
            throw new Error(error);
        }
    },

    deleteUser: async (usuarioId) => {
        try {
            const usuario = await Usuario.findByPk(usuarioId);
            if (!usuario || usuario.status === "N") {
                return null;
            } else {
                await usuario.update({ status: "N" });
                return usuario.toJSON();
            }
        } catch (error) {
            throw new Error(error);
        }
    },
};

export default usuarioService;
