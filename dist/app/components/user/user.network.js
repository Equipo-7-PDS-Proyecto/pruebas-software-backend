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
const user_controller_1 = __importDefault(require("./user.controller"));
const express_1 = __importDefault(require("express"));
const handler_middleware_1 = __importDefault(require("../../middlewares/handler.middleware"));
const router = express_1.default.Router();
router.get('/all', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    handler_middleware_1.default.verification(user_controller_1.default.getUsers, [], res, next);
}));
router.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params['id'];
    handler_middleware_1.default.verification(user_controller_1.default.getUserById, [id], res, next);
}));
// Ruta para crear un nuevo usuario (registro)
router.post('/register', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, pass, email, user_type } = req.body;
    // Creamos un objeto que cumple con la interfaz UserI
    const newUser = {
        name,
        pass,
        email,
        user_type
    };
    handler_middleware_1.default.verification(user_controller_1.default.addUser, [newUser], res, next);
}));
router.post('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, pass } = req.body;
    handler_middleware_1.default.verification(user_controller_1.default.loginUser, [{ email, pass }], res, next);
}));
router.put('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params['id'];
    const updatedUser = req.body;
    handler_middleware_1.default.verification(user_controller_1.default.updateUserById, [id, updatedUser], res, next);
}));
exports.default = router;
