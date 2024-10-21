import { Clothe } from "../../models/clothe.model";
import model from "./clothe.schema";

async function addClothe(clothe: Clothe): Promise<Clothe> {
    return model.create<Clothe>(clothe);
}

async function deleteClotheById(id: string) {
    return model.findByIdAndRemove({ _id: id });
}

async function getClotheById(id: string): Promise<Clothe | null> {
    return model.findById(id);
}

async function getClothes(): Promise<Clothe[] | null> {
    return model.find();
}

async function updateClotheById(id: string, clothe: Partial<Clothe>): Promise<Clothe | null> {
    return model.findByIdAndUpdate(id, clothe, { new: true });
}

export default {
    addClothe,
    deleteClotheById,
    getClotheById,
    getClothes,
    updateClotheById,
};
