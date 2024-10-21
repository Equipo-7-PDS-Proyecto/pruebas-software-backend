import { Document } from "mongoose"

export interface Clothe extends Document {
    name: string;
    description: string;
    price: number;
    url_photo: string;
    category: string;
    clothe_type: string;
    clothe_size: string;
    clothe_color: string;
    available_count: number;
}