import usuarioController from "../controllers/usuario.controller.js";
import usuarioHelper from "../middlewares/helper/usuario.helper.js";
import roleHelper from "../middlewares/helper/role.helper.js";
import jwtHelper from "../middlewares/helper/jwt-helper.js";
import globalMiddleware from "../middlewares/global.middleware.js";
import { Router } from "express";
import { check } from "express-validator";

const router = Router();

router.get("/usuario", [
  jwtHelper.validarJWT,
  globalMiddleware.esAdminRole,
], usuarioController.getAllUsuarios);

router.get("/usuario/:id", [
  jwtHelper.validarJWT,
], globalMiddleware.idIsNumber, usuarioController.getUsuarioById);

router.post(
  "/usuario",
  [
    jwtHelper.validarJWT,
    globalMiddleware.esAdminRole,
    check("firstname", "El nombre es obligatorio").not().isEmpty(),
    check("lastname", "El apellido es obligatorio").not().isEmpty(),
    check("username", "El nombre de usuario es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").not().isEmpty(),
    check("password", "El password es obligatorio").not().isEmpty(),
    check("ci", "La cedula es obligatoria").not().isEmpty(),
    check("username", "El username ya esta registrado").custom(
      usuarioHelper.usernameExiste
    ),
    check("email", "El email no es valido").isEmail(),
    check("email").custom(usuarioHelper.emailExiste),
    check("password", "El password debe tener al menos 6 caracteres").isLength({
      min: 6,
    }),
    check("ci").custom(usuarioHelper.ciExiste),
    check("ci").isLength({ min: 10, max: 10 }).isNumeric(),
    check("roles").optional().custom(roleHelper.rolesSonValidos),
    globalMiddleware.validarCampos,
  ],
  usuarioController.createUsuario
);

router.put(
  "/usuario/:id",
  [
    jwtHelper.validarJWT,
    globalMiddleware.esAdminRole,
    check("username").optional().custom(usuarioHelper.usernameExiste),
    check("email").optional().isEmail().custom(usuarioHelper.emailExiste),
    check("roles").optional().custom(roleHelper.rolesSonValidos),
    check("password").optional().isLength({ min: 6 }),
    check("ci")
      .optional()
      .isLength({ min: 10, max: 10 })
      .isNumeric()
      .custom(usuarioHelper.ciExiste),
    globalMiddleware.idIsNumber,
    globalMiddleware.validarCampos,
  ],
  usuarioController.updateUsuario
);

router.put("/usuario/delete/:id", [
  jwtHelper.validarJWT,
  globalMiddleware.esAdminRole,
], usuarioController.deleteUsuario);

export default router;
