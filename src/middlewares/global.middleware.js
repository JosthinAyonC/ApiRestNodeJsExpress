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
};

export default globalMiddleware;
