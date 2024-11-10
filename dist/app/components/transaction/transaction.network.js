"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transaction_controller_1 = __importDefault(require("./transaction.controller"));
const handler_middleware_1 = __importDefault(require("../../middlewares/handler.middleware"));
const router = express_1.default.Router();
// Endpoint para realizar una compra
router.post('/purchase', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, cart } = req.body;
    // Validamos que el carrito y el usuario existan en la request
    if (!user || !cart || !Array.isArray(cart) || cart.length === 0) {
        return res.status(400).json({ message: "Invalid request format or empty cart" });
    }
    // Función que se pasa al handler.verification para realizar las transacciones
    const processPurchase = () => __awaiter(void 0, void 0, void 0, function* () {
        return yield Promise.all(cart.map((item) => {
            const transactionData = {
                user_id: user,
                clothe_id: item.clothe_id,
                quantity: item.quantity,
                amount: item.amount
            };
            return transaction_controller_1.default.addTransaction(transactionData);
        }));
    });
    // Usamos handler.verification para procesar la compra
    //await processPurchase();
    //return res.status(200).json({ message: "Successful purchase" });
    handler_middleware_1.default.verification(processPurchase, [], res, next);
}));
router.post('/sales-report', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { start_date, end_date } = req.body;
    handler_middleware_1.default.verification(transaction_controller_1.default.getSalesReport, [start_date, end_date], res, next);
}));
router.get('/all', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    handler_middleware_1.default.verification(transaction_controller_1.default.getTransactions, [], res, next);
}));
exports.default = router;
