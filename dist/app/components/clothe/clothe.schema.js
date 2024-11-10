"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const clotheSchema = new mongoose_1.Schema({
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
const ClotheModel = (0, mongoose_1.model)('Clothe', clotheSchema);
exports.default = ClotheModel;
