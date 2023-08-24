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
};

export default globalMiddleware;
