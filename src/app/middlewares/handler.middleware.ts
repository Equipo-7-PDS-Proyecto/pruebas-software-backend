
import { NextFunction } from 'express';
import response from './response.middleware';

const ERROR = {
  "0"  : "Error en el servidor",
  "1"  : "Peticion mal formada",
  "2"  : "Faltan campos requeridos",
  "3"  : "No se pudo eliminar",
  "4"  : "La compañia no existe",
  "5"  : "El campo no existe",
  "6"  : "El sector no existe",
  "7"  : "El invernadero no existe",
  "8"  : "La zona no existe",
  "9"  : "El usuario no existe",
  "10" : "El connect no existe",
  "11" : "El contacto no existe",
  "12" : "El datasensor no existe",
  "13" : "El sensor no existe",
  "14" : "El switch no existe",
  "15" : "El nodo no existe",
  "16" : "La transacción no existe",
  "17" : "El usuario no pertenece a ninguna empresa",
  "18" : "No hay sensores",
  "19" : "El campo ya existe",
  "20" : "No hay sectores",
  "21" : "La ruta no existe",
  "22" : "El sensor ya existe",
  "23" : "El switch ya existe",
  "24" : "El usuario ya existe",
  "25" : "El usuario está inactivo",
  "26" : "El código no coincide",
  "27" : "Los switches ya estaban asignados",
  "28" : "Los sensores ya estaban asignados",
  "29" : "Los switches no estaban asignados a la zona",
  "30" : "Los sensores no estaban asignados a la zona",
  "31" : "El sector no pertenece a ningún greenhouse o campo",
  "32" : "No hay switches",
  "33" : "No hay zonas",
  "34" : "El schedule no existe",
  "35" : "No hay nodos sin asignar"
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
