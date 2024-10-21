import { Document, Schema} from "mongoose";

// Interfaz para Transaction
export interface Transaction extends Document {
    clothe_id: Schema.Types.ObjectId;  // ID de la prenda vendida
    user_id: Schema.Types.ObjectId;    // ID del usuario que compró
    amount: number;                    // Monto de la transacción
    quantity: number;                  // Cantidad de prendas compradas
}