import express,{Application} from 'express';
import userRoutes from './router/userRoute'
import authRoutes from './router/authRoute'
import cors from 'cors';
import morgan from 'morgan'

class Server{
    private app:express.Application;
    private port: string;
    private apiPaths='/api/v1';

    constructor(){
        this.app=express();
        this.port = process.env.PORT || '3000';

        //Middleware
        this.middlewares();
        //Definir rutas
        this.routes()
    }

    middlewares(){
        //Cors
        this.app.use(cors());

        //lectura body
        this.app.use(express.json());

        //accseso carpeta ública 
        this.app.use(express.static('public'))

        //morgan permite ver en consola los mensajes de desarrollo
        this.app.use(morgan('dev'))
    }

    routes(){
        this.app.use(`${this.apiPaths}/auth`, authRoutes)
        this.app.use(`${this.apiPaths}/users`, userRoutes)
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('Server on port'+ this.port);
        })
    }
}

export default Server;