"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const clothe_network_1 = __importDefault(require("./clothe.network"));
const clothe = (0, express_1.default)();
clothe.use('/clothe', clothe_network_1.default);
exports.default = clothe;
