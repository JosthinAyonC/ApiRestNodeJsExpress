import { Role } from "../models/Role.js";
import { Usuario } from "../models/Usuario.js";
import { Op } from "sequelize";

const usuarioService = {
  getAllUsers: async () => {
    try {
      const users = await Usuario.findAll({
        where: { status: { [Op.ne]: "N" } },
        include: {
          model: Role,
          through: {
            attributes: [],
          },
        },
      });
      return users;
    } catch (error) {
      throw new Error(error);
    }
  },

  getByIdUser: async (userId) => {
    try {
      const user = await Usuario.findOne({
        where: { id: userId },
        include: {
          model: Role,
          through: {
            attributes: [],
          },
        },
      });
      return user;
    } catch (error) {
      throw new Error(error);
    }
  },

  createUser: async (userData) => {
    try {
      let rolesToAdd = [];
      if (userData.roles && userData.roles.length > 0) {
        rolesToAdd = await Role.findAll({
          where: { name: userData.roles },
        });
      } else {
        const defaultRole = await Role.findOne({ where: { name: "USER" } });
        rolesToAdd.push(defaultRole);
      }

      const createdUser = await Usuario.create(userData);
      await createdUser.addRoles(rolesToAdd);

      const userWithRoles = await Usuario.findByPk(createdUser.id, {
        include: {
          model: Role,
          through: {
            attributes: [],
          },
        },
      });

      return userWithRoles.toJSON();
    } catch (error) {
      throw new Error(error);
    }
  },

  updateUser: async (user, id) => {
    try {
      const updatedUser = await Usuario.update(user, {
        where: { id },
        returning: true, // Esto devuelve el registro actualizado
      });
      const userUpdate = await Usuario.findOne({
        where: { id: id },
        include: {
          model: Role,
          through: {
            attributes: [],
          },
        },
      });
      return userUpdate;
    } catch (error) {
      throw new Error(error);
    }
  },

  deleteUsuario: async (userId) => {
    try {
      const user = await Usuario.findByPk(userId);
      if (!user || user.status === "N") {
        return null;
      } else {
        await user.update({ status: "N" });
        return user.toJSON();
      }
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default usuarioService;
