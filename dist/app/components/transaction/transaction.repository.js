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
const clothe_controller_1 = __importDefault(require("../clothe/clothe.controller"));
const transaction_schema_1 = __importDefault(require("./transaction.schema"));
// Método para agregar una nueva transacción
function addTransaction(transaction) {
    return __awaiter(this, void 0, void 0, function* () {
        let clothe = yield clothe_controller_1.default.getClotheById(transaction.clothe_id);
        if (!clothe) {
            throw new Error('Clothing item not found');
        }
        if (clothe.available_count < transaction.quantity) {
            throw new Error('Not enough stock available');
        }
        let clotheUpdate = {
            available_count: clothe.available_count - transaction.quantity
        };
        yield clothe_controller_1.default.updateClotheById(clothe.id, clotheUpdate);
        return transaction_schema_1.default.create(transaction);
    });
}
// Método para eliminar una transacción por ID
function deleteTransactionById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return transaction_schema_1.default.findByIdAndRemove({ _id: id });
    });
}
// Método para obtener una transacción por ID
function getTransactionById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return transaction_schema_1.default.findById(id);
    });
}
// Método para obtener todas las transacciones
function getTransactions() {
    return __awaiter(this, void 0, void 0, function* () {
        return transaction_schema_1.default.find();
    });
}
// Método para actualizar una transacción por ID
function updateTransactionById(id, transaction) {
    return __awaiter(this, void 0, void 0, function* () {
        return transaction_schema_1.default.findByIdAndUpdate(id, transaction, { new: true });
    });
}
function getSalesReport(start_date, end_date) {
    return __awaiter(this, void 0, void 0, function* () {
        // Verificamos si se proporcionaron ambas fechas
        if (!start_date || !end_date) {
            throw new Error('Start date and end date are required.');
        }
        const startDate = new Date(start_date);
        const endDate = new Date(end_date);
        // Filtrar transacciones por el rango de fechas
        const transactions = yield transaction_schema_1.default.find({
            createdAt: { $gte: startDate, $lte: endDate }
        });
        if (!transactions || transactions.length === 0) {
            throw new Error('No transactions found for the given period.');
        }
        // Crear un objeto para agrupar la información
        const salesData = {};
        // Agrupar por prenda
        for (const transaction of transactions) {
            const { clothe_id, quantity, amount } = transaction;
            // Si la prenda ya está en el objeto, actualizamos sus valores
            if (salesData[clothe_id]) {
                salesData[clothe_id].quantity += quantity;
                salesData[clothe_id].revenue += quantity * amount;
            }
            else {
                // Si no está, la añadimos
                salesData[clothe_id] = {
                    clothe_id,
                    quantity: quantity,
                    revenue: quantity * amount,
                };
            }
        }
        // Convertimos el objeto a un array para poder ordenar por cantidad
        const salesReport = Object.values(salesData)
            .sort((a, b) => b.quantity - a.quantity); // Ordenar de mayor a menor cantidad
        return salesReport;
    });
}
exports.default = {
    addTransaction,
    deleteTransactionById,
    getTransactionById,
    getTransactions,
    updateTransactionById,
    getSalesReport
};
