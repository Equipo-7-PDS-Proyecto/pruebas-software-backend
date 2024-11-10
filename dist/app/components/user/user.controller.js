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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_repository_1 = __importDefault(require("./user.repository"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// Método para agregar un usuario, sin devolver la contraseña
function addUser(user) {
    return user_repository_1.default.addUser(user)
        .then(savedUser => {
        // Convertir el documento de Mongoose a un objeto plano
        const userObject = savedUser.toObject();
        // Removemos la contraseña antes de devolver el usuario
        const { pass } = userObject, userWithoutPass = __rest(userObject, ["pass"]);
        // Retornamos solo las propiedades que queremos devolver
        return {
            name: userWithoutPass.name,
            email: userWithoutPass.email,
            user_type: userWithoutPass.user_type,
            address: userWithoutPass.address,
            phone_number: userWithoutPass.phone_number
        };
    });
}
// Método para login
function loginUser({ email, pass }) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_repository_1.default.getUserByEmail(email); // Obtener el usuario por email
        if (!user) {
            return null; // Si no encuentra al usuario, retorna null
        }
        const isMatch = yield bcrypt_1.default.compare(pass, user.pass); // Comparar la contraseña
        if (!isMatch) {
            return null; // Si la contraseña no coincide, retornamos null
        }
        // Convertir el documento a objeto plano y eliminar la contraseña
        const userObject = user.toObject();
        const { pass: _ } = userObject, userWithoutPass = __rest(userObject, ["pass"]);
        // Retornamos solo las propiedades necesarias
        return {
            id: userWithoutPass._id,
            user_type: userWithoutPass.user_type
        };
    });
}
function deleteUserById(id) {
    return user_repository_1.default.deleteUserById(id);
}
function getUserById(id) {
    return user_repository_1.default.getUserById(id);
}
function getUsers() {
    return user_repository_1.default.getUsers();
}
function updateUserById(id, User) {
    //User.modifiedAt = new Date;
    return user_repository_1.default.updateUserById(id, User);
}
exports.default = {
    addUser,
    loginUser,
    deleteUserById,
    getUserById,
    getUsers,
    updateUserById,
};
