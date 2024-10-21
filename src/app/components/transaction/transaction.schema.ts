import { Schema, model } from "mongoose";
import { Transaction as TransactionI} from "../../models/transaction.model";

// Esquema para Transaction
const transactionSchema = new Schema<TransactionI>({
    clothe_id: { type: Schema.Types.ObjectId, ref: 'Clothe', required: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 }, // Cantidad por defecto 1
}, { timestamps: true }); // Timestamps para createdAt y updatedAt

// Modelo de Transaction
const Transaction = model<TransactionI>('Transaction', transactionSchema);

export default Transaction;