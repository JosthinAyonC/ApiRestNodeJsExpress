import { Router } from 'express';
import usuarioController from '../controllers/usuario.controller.js'

const router = Router();

router.get('/usuario', usuarioController.getAllUsuarios);
router.get('/usuario/:id', usuarioController.getUsuarioById);
router.post('/usuario', usuarioController.createUsuario);
router.put('/usuario/:id', usuarioController.updateUsuario);
router.put('/usuario/delete/:id', usuarioController.deleteUsuario);

export default router;