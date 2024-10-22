import { Transaction } from "../../models/transaction.model";
import clotheController from "../clothe/clothe.controller";
import model from "./transaction.schema";

// Método para agregar una nueva transacción
async function addTransaction(transaction: Transaction): Promise<Transaction> {
    let clothe = await clotheController.getClotheById(transaction.clothe_id as unknown as string);
    if (!clothe) {
        throw new Error('Clothing item not found');
    }

    if (clothe.available_count < transaction.quantity) {
        throw new Error('Not enough stock available');
    }

    let clotheUpdate = {
        available_count : clothe.available_count - transaction.quantity
    }

    await clotheController.updateClotheById(clothe.id, clotheUpdate);
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

async function getSalesReport(start_date : string, end_date :string) {
    // Verificamos si se proporcionaron ambas fechas
    if (!start_date || !end_date) {
        throw new Error('Start date and end date are required.');
    }

    const startDate = new Date(start_date as string);
    const endDate = new Date(end_date as string);

    // Filtrar transacciones por el rango de fechas
    const transactions = await model.find({
        createdAt: { $gte: startDate, $lte: endDate }
    });

    if (!transactions || transactions.length === 0) {
        throw new Error('No transactions found for the given period.');
    }

    // Crear un objeto para agrupar la información
    const salesData: { [key: string]: any } = {};

    // Agrupar por prenda
    for (const transaction of transactions) {
        const { clothe_id, quantity, amount } = transaction;

        // Si la prenda ya está en el objeto, actualizamos sus valores
        if (salesData[clothe_id as unknown as string]) {
            salesData[clothe_id as unknown as string].quantity += quantity;
            salesData[clothe_id as unknown as string].revenue += quantity * amount;
        } else {
            // Si no está, la añadimos
            salesData[clothe_id as unknown as string] = {
                clothe_id,
                quantity: quantity,
                revenue: quantity * amount,
            };
        }
    }

    // Convertimos el objeto a un array para poder ordenar por cantidad
    const salesReport = Object.values(salesData)
        .sort((a: any, b: any) => b.quantity - a.quantity); // Ordenar de mayor a menor cantidad

    return salesReport;
}

export default {
    addTransaction,
    deleteTransactionById,
    getTransactionById,
    getTransactions,
    updateTransactionById,
    getSalesReport
};
