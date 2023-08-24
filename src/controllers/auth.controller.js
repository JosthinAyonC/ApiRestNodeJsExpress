import { Usuario } from "../models/Usuario";
import generarJWT from "../middlewares/helper/jwt-generator.js";

const authController = {
    login: async (req, res = response) => {

        const { email, password } = req.body;

        try {
            //Ver si el email existe
            const usuario = await Usuario.findOne({ email });
            if (!usuario) {
                return res.status(400).json({
                    msg: 'Correo no registrado'
                })
            }
            //validar si el usuario esta activo
            if (!usuario.estado) {
                return res.status(400).json({
                    msg: 'Usuario inactivo'
                })
            }
            //Verificar password
            const validPassword = bcryptjs.compareSync(password, usuario.password);
            if (!validPassword) {
                return res.status(400).json({
                    msg: 'Contrasenia: incorrecta'
                })
            }
            //Generar el JWT
            const token = await generarJWT(usuario.id);

            res.json({
                usuario,
                token
            });

        } catch (error) {
            return res.status(500).json({
                msg: 'Algo salio mal'
            })
        }
    }
}

export default authController;