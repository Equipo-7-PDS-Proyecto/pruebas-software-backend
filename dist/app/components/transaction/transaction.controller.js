"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transaction_repository_1 = __importDefault(require("./transaction.repository"));
// Método para agregar una nueva transacción
function addTransaction(transaction) {
    return transaction_repository_1.default.addTransaction(transaction);
}
// Método para eliminar una transacción por ID
function deleteTransactionById(id) {
    return transaction_repository_1.default.deleteTransactionById(id);
}
// Método para obtener una transacción por ID
function getTransactionById(id) {
    return transaction_repository_1.default.getTransactionById(id);
}
// Método para obtener todas las transacciones
function getTransactions() {
    return transaction_repository_1.default.getTransactions();
}
// Método para actualizar una transacción por ID
function updateTransactionById(id, transaction) {
    return transaction_repository_1.default.updateTransactionById(id, transaction);
}
function getSalesReport(start_date, end_date) {
    return transaction_repository_1.default.getSalesReport(start_date, end_date);
}
exports.default = {
    addTransaction,
    deleteTransactionById,
    getTransactionById,
    getTransactions,
    updateTransactionById,
    getSalesReport
};
