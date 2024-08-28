import {Response} from "express";

/**
 * Entrega una respuesta http exitosa estandarizada
 * 
 * [ status ] : check
 * 
 * @param res 
 * @param message 
 * @param status 
 */
function success(res: Response, message: any, status?: number){
    let StatusCode: number = status || 200
    
    res.status(StatusCode)
    .send({
        error: "",
        status: StatusCode,
        message: message
    });

}

/**
 * Entrega una respuesta http fallida estandarizada
 * 
 * [ status ] : check
 * 
 * @param res 
 * @param message 
 * @param status 
 */
function error(res: Response, message: any, status?: number){
    let StatusCode: number = status || 500
        
    res.status(StatusCode)
    .send({
        error: message,
        status: StatusCode,
        message: ""
    });
}

export default {success, error};