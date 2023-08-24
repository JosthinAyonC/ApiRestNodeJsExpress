import { validationResult } from 'express-validator'

const globalMiddleware = {

  idIsNumber: (req, res, next) => {
    const userId = req.params.id;
    if (isNaN(userId)) {
      return res
        .status(400)
        .json({ error: "Error al leer el id pasado por la variable de ruta." });
    }
    next();
  },

  validarCampos: (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }
    next();
  },

  esAdminRole: (req, res = response, next) => {
    if (!req.usuario) {
      return res.status(500).json({
        msg: 'Se quiere verificar el rol sin verificar el token primero'
      });
    }
    const { roles, firstname } = req.usuario;
    const isAdmin = roles.some(role => role.name === 'ADMIN');
    if (!isAdmin) {
      return res.status(401).json({
        msg: `${firstname}, no tienes permisos necesarios para ejecutar esta función`
      });
    }

    next();
  },

  esModRole: (req, res = response, next) => {
    if (!req.usuario) {
      return res.status(500).json({
        msg: 'Se quiere verificar el rol sin verificar el token primero'
      });
    }
    const { roles, firstname } = req.usuario;
    const isAdmin = roles.some(role => role.name === 'MODERATOR');
    if (!isAdmin) {
      return res.status(401).json({
        msg: `${firstname}, no tienes permisos necesarios para ejecutar esta función`
      });
    }

    next();
  }

};

export default globalMiddleware;
