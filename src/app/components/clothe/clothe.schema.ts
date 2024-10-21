import { Schema, model } from "mongoose";
import { Clothe as ClotheI } from "../../models/clothe.model";

const clotheSchema = new Schema<ClotheI>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    url_photo: { type: String, required: true },
    category: { type: String, required: true },
    clothe_type: { type: String, required: true },
    clothe_size: { type: String, required: true },
    clothe_color: { type: String, required: true },
    available_count: { type: Number, required: true },
}, { timestamps: true }); // Agregamos timestamps para createdAt y updatedAt

const ClotheModel = model<ClotheI>('Clothe', clotheSchema);

export default ClotheModel;