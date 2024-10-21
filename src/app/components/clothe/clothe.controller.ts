import repository from "./clothe.repository";
import { Clothe } from "../../models/clothe.model";

// Método para agregar una prenda (Clothe)
function addClothe(clothe: Clothe): Promise<Clothe> {
    return repository.addClothe(clothe);
}

// Método para eliminar una prenda por ID
function deleteClotheById(id: string) {
    return repository.deleteClotheById(id);
}

// Método para obtener una prenda por ID
function getClotheById(id: string): Promise<Clothe | null> {
    return repository.getClotheById(id);
}

// Método para obtener todas las prendas
function getClothes(): Promise<Clothe[] | null> {
    return repository.getClothes();
}

// Método para actualizar una prenda por ID
function updateClotheById(id: string, clothe: Partial<Clothe>): Promise<Clothe | null> {
    return repository.updateClotheById(id, clothe);
}

export default {
    addClothe,
    deleteClotheById,
    getClotheById,
    getClothes,
    updateClotheById,
};
