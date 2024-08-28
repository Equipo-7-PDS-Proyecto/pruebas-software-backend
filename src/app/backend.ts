import mongooseModule from "./storage/mongoose.module"

import express, { NextFunction, Express, Request, Response } from 'express';
import morgan from "morgan";
import cors from "cors";
import components from "./components/index"
import response from './middlewares/response.middleware'; 

import config from "../config";


async function main(){
    const server: Express = express();

    server.use(express.json());
    server.use(morgan("dev"));
    server.use(cors());

    server.use(express.urlencoded({ extended: false }));
    server.set('etag', false);

    server.use('/api', ...components);
    
    server.use((err:Error,req:Request,res:Response,next:NextFunction)=>{
        response.error(res,"error");
      })

    
    try{
        await mongooseModule.connect();
        //console.log("Mongoose connection successful");
        server.listen(config.port, () => {
            console.log("servidor escuchando en: http://localhost:" + config.port);
        });
    }catch (error){
        console.log(error)
    }
}

export default { main };
