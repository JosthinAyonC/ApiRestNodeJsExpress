import { Usuario } from '../models/Usuario.js';
import { Op } from 'sequelize';

const usuarioService = {

    getAllUsers: async () => {
        try {
            const users = await Usuario.findAll({ where: { status: { [Op.ne]: 'N' } } });
            return users;
        } catch (error) {
            throw new Error(error);
        }
    },

    getByIdUser: async (userId) => {
        try {
            const user = await Usuario.findByPk(userId);
            return user;
        } catch (error) {
            throw new Error(error);
        }
    },

    createUser: async (userData) => {
        try {
            console.log(userData);
            const createdUser = await Usuario.create(userData);
            console.log('Usuario guardado:', createdUser.toJSON());
            return createdUser.toJSON();
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

            if (updatedUser[0] === 0) {
                throw new Error('Usuario no encontrado');
            }

            return updatedUser[1][0].toJSON();
        } catch (error) {
            throw new Error(error);
        }
    }, 
    
    deleteUsuario: async (userId) => {
        try {
            const user = await Usuario.findByPk(userId);
            if (!user || user.status === 'N') {
                return null;
            }else{
                await user.update({ status: 'N' }); 
                return user.toJSON();
            }
        } catch (error) {
            throw new Error(error);
        }
    }
};

export default usuarioService;
