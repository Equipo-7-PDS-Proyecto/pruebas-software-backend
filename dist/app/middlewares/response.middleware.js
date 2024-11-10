"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Entrega una respuesta http exitosa estandarizada
 *
 * [ status ] : check
 *
 * @param res
 * @param message
 * @param status
 */
function success(res, message, status) {
    let StatusCode = status || 200;
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
function error(res, message, status) {
    let StatusCode = status || 500;
    res.status(StatusCode)
        .send({
        error: message,
        status: StatusCode,
        message: ""
    });
}
exports.default = { success, error };
