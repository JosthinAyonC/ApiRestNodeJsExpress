import { jwt } from 'jsonwebtoken'
import * as dotenv from "dotenv";
dotenv.config();

export const generarJWT = (uid = '') => {

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

}
