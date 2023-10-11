import dotenv from "dotenv";
import Server from "./app";

// configuracion variables de entornos
dotenv.config()

const server= new Server();


server.listen();