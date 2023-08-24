import { Router } from 'express';
import globalMiddleware from "../middlewares/global.middleware.js";
import authController from '../controllers/auth.controller.js';


const router = Router();

router.post('/login', [
    check('email', 'Ingrese un correo valido').isEmail(),
    check('password', 'Contraseña obligatoria').not().isEmpty(),
    globalMiddleware.validarCampos
], authController.login);