"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Esquema para Transaction
const transactionSchema = new mongoose_1.Schema({
    clothe_id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Clothe', required: true },
    user_id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 }, // Cantidad por defecto 1
}, { timestamps: true }); // Timestamps para createdAt y updatedAt
// Modelo de Transaction
const Transaction = (0, mongoose_1.model)('Transaction', transactionSchema);
exports.default = Transaction;
