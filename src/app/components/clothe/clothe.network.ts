import controller from "./clothe.controller";
import { Clothe } from "../../models/clothe.model";
import express, { Response, Request, Router, NextFunction } from "express";
import handler from '../../middlewares/handler.middleware';

const router: Router = express.Router();

// Ruta para obtener todas las prendas
router.get('/all', async (req: Request, res: Response, next: NextFunction) => {
    handler.verification(controller.getClothes, [], res, next);
});

// Ruta para obtener una prenda por ID
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params['id'];
    handler.verification(controller.getClotheById, [id], res, next);
});

// Ruta para crear una nueva prenda
router.post('/add', async (req: Request, res: Response, next: NextFunction) => {
    const { name, description, price, url_photo, category, clothe_type, clothe_size, clothe_color, available_count } = req.body;

    // Creamos un objeto que cumple con la interfaz Clothe
    const newClothe: Clothe = {
        name,
        description,
        price,
        url_photo,
        category,
        clothe_type,
        clothe_size,
        clothe_color,
        available_count
    } as Clothe;
    
    handler.verification(controller.addClothe, [newClothe], res, next);
});

// Ruta para eliminar una prenda por ID
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params['id'];
    handler.verification(controller.deleteClotheById, [id], res, next);
});

// Ruta para actualizar una prenda por ID
router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params['id'];
    const updatedClothe = req.body;
    handler.verification(controller.updateClotheById, [id, updatedClothe], res, next);
});

export default router;
