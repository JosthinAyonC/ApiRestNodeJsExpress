import { validationResult } from "express-validator";

const usuarioMiddleware = {
  validarCampos: (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }
    next();
  },
};

export default usuarioMiddleware;
