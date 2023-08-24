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
    console.log(req);
    if (!req.usuario) {
      return res.status(500).json({
        msg: 'Se quiere verificar el rol sin verificar el token primero'
      })
    }
    const { rol, nombre } = req.usuario;

    if (rol !== 'ADMIN') {
      return res.status(401).json({
        msg: `${nombre}, no tienes permisos necesarios para ejecutar esta funcion`
      })
    }
    next();
  }
};

export default globalMiddleware;
