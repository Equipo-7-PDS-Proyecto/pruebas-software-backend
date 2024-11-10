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
const clothe_controller_1 = __importDefault(require("./clothe.controller"));
const express_1 = __importDefault(require("express"));
const handler_middleware_1 = __importDefault(require("../../middlewares/handler.middleware"));
const router = express_1.default.Router();
// Ruta para obtener todas las prendas
router.get('/all', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    handler_middleware_1.default.verification(clothe_controller_1.default.getClothes, [], res, next);
}));
// Ruta para obtener una prenda por ID
router.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params['id'];
    handler_middleware_1.default.verification(clothe_controller_1.default.getClotheById, [id], res, next);
}));
// Ruta para crear una nueva prenda
router.post('/add', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, url_photo, category, clothe_type, clothe_size, clothe_color, available_count } = req.body;
    // Creamos un objeto que cumple con la interfaz Clothe
    const newClothe = {
        name,
        description,
        price,
        url_photo,
        category,
        clothe_type,
        clothe_size,
        clothe_color,
        available_count
    };
    handler_middleware_1.default.verification(clothe_controller_1.default.addClothe, [newClothe], res, next);
}));
// Ruta para eliminar una prenda por ID
router.delete('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params['id'];
    handler_middleware_1.default.verification(clothe_controller_1.default.deleteClotheById, [id], res, next);
}));
// Ruta para actualizar una prenda por ID
router.put('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params['id'];
    const updatedClothe = req.body;
    handler_middleware_1.default.verification(clothe_controller_1.default.updateClotheById, [id, updatedClothe], res, next);
}));
exports.default = router;
