import express, { Request, Response, NextFunction } from "express";
import controller from "./transaction.controller";
import handler from '../../middlewares/handler.middleware';
import { Transaction as TransactionI } from "../../models/transaction.model";
import Transaction from "./transaction.schema";

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
            const transactionData : TransactionI = {
                user_id: user,
                clothe_id: item.clothe_id,
                quantity: item.quantity,
                amount: item.amount
            } as TransactionI;
            return controller.addTransaction(transactionData);
        }));
    };

    // Usamos handler.verification para procesar la compra
    //await processPurchase();
    //return res.status(200).json({ message: "Successful purchase" });
    handler.verification(processPurchase, [], res, next);
});

router.post('/sales-report', async (req: Request, res: Response, next: NextFunction) => {
    const {start_date , end_date} = req.body;
    handler.verification(controller.getSalesReport, [start_date, end_date], res, next);
});

router.get('/all', async (req: Request, res: Response, next: NextFunction) => {
    handler.verification(controller.getTransactions, [], res, next);
});


export default router;
