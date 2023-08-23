import { body, validationResult } from 'express-validator';

export const validateUsuario = [
  body('firstname').notEmpty().withMessage('El nombre es obligatorio.'),
  body('lastname').notEmpty().withMessage('El appellido es obligatorio.'),
  body('ci').notEmpty().withMessage('La cedula es obligatoria.')
    .isLength({ min: 10, max: 10 }).withMessage('La cédula debe tener 10 caracteres.'),,
  body('email').notEmpty().withMessage('La contraseña es obligatoria.'),
  body('username').notEmpty().withMessage('El nombre de usuario es obligatorio.'),
  body('password').notEmpty().withMessage('La contraseña es obligatoria.'),
 
];