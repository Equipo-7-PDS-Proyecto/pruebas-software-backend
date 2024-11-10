"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_middleware_1 = __importDefault(require("./response.middleware"));
const ERROR = {
    "0": "Error en el servidor",
    "1": "Peticion mal formada",
    "2": "Faltan campos requeridos",
    "3": "No se pudo eliminar"
};
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
function verification(callback, args, res, next, statusCodes = { success: 200, error: 400 }) {
    return __awaiter(this, void 0, void 0, function* () {
        var successCode = statusCodes.success;
        var errorCode = statusCodes.error;
        try {
            const result = yield callback(...args);
            (!result) ? response_middleware_1.default.error(res, "no se ha podido resolver la query", errorCode) : response_middleware_1.default.success(res, result, successCode);
        }
        catch (error) {
            console.error("[error] ", error);
            next(error);
        }
    });
}
exports.default = {
    verification,
    ERROR
};
