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
const mongoose_1 = require("mongoose");
const user_model_1 = require("../../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const definition = {
    name: { type: String, required: true },
    pass: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: [/.+@.+\..+/, 'Invalid email'] },
    user_type: { type: Number, enum: user_model_1.UserType, default: user_model_1.UserType.Regular },
    address: { type: String, default: "" },
    phone_number: { type: String, default: "" }
};
const schema = new mongoose_1.Schema(definition, { timestamps: true });
// Método para hashear la contraseña antes de guardarla
schema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (!user.isModified('pass'))
            return next();
        const salt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(user.pass, salt);
        user.pass = hash;
        next();
    });
});
// Método para comparar la contraseña
schema.methods.comparePassword = function (candidatePassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this; // Definir correctamente el tipo de `this`
        return yield bcrypt_1.default.compare(candidatePassword, user.pass); // Compara la contraseña con el hash almacenado
    });
};
const User = (0, mongoose_1.model)('User', schema, 'users');
exports.default = User;
