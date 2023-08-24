import app from './app.js';
import { sequelize } from './db/database.js';

// import './models/Role.js';
// import './models/Usuario.js';

async function main() {
    
    try {
        // Conexion con la base de datos
        await sequelize.sync({force: false});
        console.log('Database connected');

        // Levantamiento del servidor
        app.listen(process.env.PORT);
        console.log('Server on port', process.env.PORT);
        
        //Migracion de las entidades
    } catch (error) {
        console.error(error);
    }
}


main();