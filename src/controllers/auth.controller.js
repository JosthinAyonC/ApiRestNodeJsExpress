import { Usuario } from "../models/Usuario.js";
import jwtHelper from "../middlewares/helper/jwt-helper.js";
import bcryptjs from "bcryptjs";


const authController = {
    login: async (req, res = response) => {

        const { email, password } = req.body;

        try {
            //Ver si el email existe
            const usuario = await Usuario.findOne({where: {email}});
            if (!usuario) {
                return res.status(400).json({
                    msg: 'Correo no registrado'
                })
            }
            //validar si el usuario esta activo
            if (usuario.estado === "N") {
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
            const token = await jwtHelper.generarJWT(usuario.id);

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