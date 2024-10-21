import repository from "./transaction.repository";
import { Transaction } from "../../models/transaction.model";

// Método para agregar una nueva transacción
function addTransaction(transaction: Transaction): Promise<Transaction> {
    return repository.addTransaction(transaction);
}

// Método para eliminar una transacción por ID
function deleteTransactionById(id: string) {
    return repository.deleteTransactionById(id);
}

// Método para obtener una transacción por ID
function getTransactionById(id: string): Promise<Transaction | null> {
    return repository.getTransactionById(id);
}

// Método para obtener todas las transacciones
function getTransactions(): Promise<Transaction[] | null> {
    return repository.getTransactions();
}

// Método para actualizar una transacción por ID
function updateTransactionById(id: string, transaction: Partial<Transaction>): Promise<Transaction | null> {
    return repository.updateTransactionById(id, transaction);
}

export default {
    addTransaction,
    deleteTransactionById,
    getTransactionById,
    getTransactions,
    updateTransactionById,
};
