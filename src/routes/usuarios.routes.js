import { Router } from 'express';
import usuarioController from '../controllers/usuario.controller.js'
import { validateUsuario } from '../middlewares/usuario.middleware.js';

const router = Router();

router.get('/usuario', usuarioController.getAllUsuarios);
router.get('/usuario/:id', usuarioController.getUsuarioById);
router.post('/usuario', validateUsuario, usuarioController.createUsuario);
router.put('/usuario/:id', usuarioController.updateUsuario);
router.put('/usuario/delete/:id', usuarioController.deleteUsuario);

export default router;