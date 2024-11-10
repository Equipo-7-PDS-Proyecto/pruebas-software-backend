"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const clothe_repository_1 = __importDefault(require("./clothe.repository"));
// Método para agregar una prenda (Clothe)
function addClothe(clothe) {
    return clothe_repository_1.default.addClothe(clothe);
}
// Método para eliminar una prenda por ID
function deleteClotheById(id) {
    return clothe_repository_1.default.deleteClotheById(id);
}
// Método para obtener una prenda por ID
function getClotheById(id) {
    return clothe_repository_1.default.getClotheById(id);
}
// Método para obtener todas las prendas
function getClothes() {
    return clothe_repository_1.default.getClothes();
}
// Método para actualizar una prenda por ID
function updateClotheById(id, clothe) {
    return clothe_repository_1.default.updateClotheById(id, clothe);
}
exports.default = {
    addClothe,
    deleteClotheById,
    getClotheById,
    getClothes,
    updateClotheById,
};
