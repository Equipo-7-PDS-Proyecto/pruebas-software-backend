import { Transaction } from "../../models/transaction.model";
import model from "./transaction.schema";

// Método para agregar una nueva transacción
async function addTransaction(transaction: Transaction): Promise<Transaction> {
    return model.create<Transaction>(transaction);
}

// Método para eliminar una transacción por ID
async function deleteTransactionById(id: string) {
    return model.findByIdAndRemove({ _id: id });
}

// Método para obtener una transacción por ID
async function getTransactionById(id: string): Promise<Transaction | null> {
    return model.findById(id);
}

// Método para obtener todas las transacciones
async function getTransactions(): Promise<Transaction[] | null> {
    return model.find();
}

// Método para actualizar una transacción por ID
async function updateTransactionById(id: string, transaction: Partial<Transaction>): Promise<Transaction | null> {
    return model.findByIdAndUpdate(id, transaction, { new: true });
}

export default {
    addTransaction,
    deleteTransactionById,
    getTransactionById,
    getTransactions,
    updateTransactionById,
};
