import usuarioService from "../services/usuarios.services.js";

const usuarioController = {
  getAllUsuarios: async (req, res) => {
    try {
      const users = await usuarioService.getAllUsers();
      if (users.length > 0) {
        res.json(users);
      } else {
        res.status(404).json({ error: "No hay usuarios registrados." });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getUsuarioById: async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await usuarioService.getByIdUser(userId);
      if (user) {
        res.json(user);
      } else {
        res
          .status(404)
          .json({ error: `Usuario con id: ${userId} no encontrado.` });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createUsuario: async (req, res) => {
    try {
      const newUser = req.body;
      const createdUser = await usuarioService.createUser(newUser);
      res.status(201).json(createdUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateUsuario: async (req, res) => {
    try {
      const userEdit = req.body;
      const userId = req.params.id;
      const userEditado = await usuarioService.updateUser(userEdit, userId);
      if (userEditado) {
        res.status(200).json(userEditado);
      } else {
        res.status(404).json({ error: `El usuario con ${userId} no existe.` });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteUsuario: async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await usuarioService.deleteUsuario(userId);
      if (user) {
        res.json({ message: "Usuario eliminado exitosamente" });
      } else {
        res.status(404).json({ error: `El usuario con ${userId} no existe.` });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default usuarioController;
