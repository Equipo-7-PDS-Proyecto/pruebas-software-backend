import mongooseModule from "./storage/mongoose.module";
import express, { NextFunction, Express, Request, Response } from 'express';
import morgan from "morgan";
import cors from "cors";
import components from "./components/index";
import response from './middlewares/response.middleware'; 
import config from "../config";

// Creamos la función para configurar el servidor
function createServer(): Express {
    const server: Express = express();

    server.use(express.json());
    server.use(morgan("dev"));
    server.use(cors());

    server.use(express.urlencoded({ extended: false }));
    server.set('etag', false);

    server.use('/api', ...components);
    
    server.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        response.error(res, "error");
    });

    return server;
}

// Conectamos a la base de datos y levantamos el servidor
async function main() {
    const server = createServer();
    
    try {
        await mongooseModule.connect();
        server.listen(6000, "0.0.0.0",() => {
            console.log("servidor escuchando en: http://localhost:" + config.port);
        });
    } catch (error) {
        console.log(error);
    }
}

export { createServer };
export default { main };
