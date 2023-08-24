import { Usuario } from "../../models/Usuario.js";
import jwt from 'jsonwebtoken'
import * as dotenv from "dotenv";

dotenv.config();


const jwtHelper = {

    generarJWT: (uid = '') => {

        return new Promise((resolve, reject) => {

            const payload = { uid };
            jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
                expiresIn: '30m'
            }, (err, token) => {
                if (err) {
                    console.log(err);
                    reject('No se pudo generar el token');
                } else {
                    resolve(token);
                }
            })

        })

    },

    validarJWT: async (req = request, res = response, next) => {

        const token = req.header('x-token');

        if (!token) {
            return res.status(401).json({
                msg: 'Asegurese de mandar la authorización en la peticion'
            });
        }
        try {
            const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
            const usuario = await Usuario.findByPk(uid); // Lee el usuario que deseo extraer por su id

            if (!usuario) {
                return res.status(401).json({
                    msg: 'Usuario no existe en la DB'
                })
            }

            if (usuario.estado === "N") {
                return res.status(401).json({
                    msg: 'Usuario no registrado en la DB'
                })
            }

            req.usuario = usuario;
            next();

        } catch (error) {
            console.log(error);
            res.status(401).json({
                msg: 'Token no valido'
            })
        }

    }
}
export default jwtHelper;