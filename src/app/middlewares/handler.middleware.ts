
import { NextFunction } from 'express';
import response from './response.middleware';

const ERROR = {
  "0"  : "Error en el servidor",
  "1"  : "Peticion mal formada",
  "2"  : "Faltan campos requeridos",
  "3"  : "No se pudo eliminar"
}

/**
 * Maneja la respuesta http a partir del resultado de la funcion entregada
 * 
 * status: dev
 * 
 * --- el codigo de respuesta debe ser variable
 * 
 * @param callback : funcion encapsulada
 * @param args : argumentos de la funcion
 * @param res : respuesta http
 */
async function  verification(callback:Function,args:any[], res:any,next:NextFunction,statusCodes = {success:200,error:400}){

    var successCode = statusCodes.success;
    var errorCode   = statusCodes.error;

    try {
      const result = await callback(...args);
      (!result) ? response.error(res, "no se ha podido resolver la query", errorCode):response.success(res, result, successCode);
      
    } catch (error) {
      console.error("[error] ", error);  
      next(error);

    }
}


export default  {
    verification,
    ERROR
}
