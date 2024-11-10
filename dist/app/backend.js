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
exports.createServer = void 0;
const mongoose_module_1 = __importDefault(require("./storage/mongoose.module"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./components/index"));
const response_middleware_1 = __importDefault(require("./middlewares/response.middleware"));
const config_1 = __importDefault(require("../config"));
// Creamos la función para configurar el servidor
function createServer() {
    const server = (0, express_1.default)();
    server.use(express_1.default.json());
    server.use((0, morgan_1.default)("dev"));
    server.use((0, cors_1.default)());
    server.use(express_1.default.urlencoded({ extended: false }));
    server.set('etag', false);
    server.use('/api', ...index_1.default);
    server.use((err, req, res, next) => {
        response_middleware_1.default.error(res, "error");
    });
    return server;
}
exports.createServer = createServer;
// Conectamos a la base de datos y levantamos el servidor
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const server = createServer();
        try {
            yield mongoose_module_1.default.connect();
            server.listen(6000, "0.0.0.0", () => {
                console.log("servidor escuchando en: http://localhost:" + config_1.default.port);
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.default = { main };
