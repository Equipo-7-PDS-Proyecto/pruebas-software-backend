import express, { Request, Response, NextFunction } from "express";
import controller from "./transaction.controller";
import handler from '../../middlewares/handler.middleware';
import { Transaction } from "../../models/transaction.model";

const router = express.Router();

// Endpoint para realizar una compra
router.post('/purchase', async (req: Request, res: Response, next: NextFunction) => {
    const { user, cart } = req.body;

    // Validamos que el carrito y el usuario existan en la request
    if (!user || !cart || !Array.isArray(cart) || cart.length === 0) {
        return res.status(400).json({ message: "Invalid request format or empty cart" });
    }

    // Función que se pasa al handler.verification para realizar las transacciones
    const processPurchase = async () => {
        return await Promise.all(cart.map((item: any) => {
            const transactionData : Transaction = {
                user_id: user,
                clothe_id: item.clothe_id,
                quantity: item.quantity,
                amount: item.amount
            } as Transaction;
            return controller.addTransaction(transactionData);
        }));
    };

    // Usamos handler.verification para procesar la compra
    //await processPurchase();
    //return res.status(200).json({ message: "Successful purchase" });
    handler.verification(processPurchase, [], res, next);
});

export default router;
