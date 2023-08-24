import { Usuario } from '../../models/Usuario.js';

const usuarioHelper = {
    emailExiste: async (email = '') => {
      const existeEmail = await Usuario.findOne({ where: { email } });
      if (existeEmail) {
        throw new Error(`El email: ${email}, ya esta registrado, pruebe con otro.`);
      }
    },
    ciExiste: async (id) => {
      const existeCi = await Usuario.findOne({ where: { ci: id } });
      if (existeCi) {
        throw new Error(`Ya existe un usuario con esa identificación: ${id}.`);
      }
    },
    usernameExiste: async (username) => {
      const existeUsername = await Usuario.findOne({ where: { username: username } });
      if (existeUsername) {
        throw new Error(`El username: ${username}, ya esta registrado, pruebe con otro.`);
      }
    },
  };
  
export default usuarioHelper;