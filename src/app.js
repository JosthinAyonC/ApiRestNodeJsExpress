import * as dotenv from "dotenv";
import express from "express";
import usuariosRoutes from "./routes/usuarios.routes.js";

dotenv.config();
const app = express();

//Middlewares
app.use(express.json());
app.use(usuariosRoutes);

export default app;