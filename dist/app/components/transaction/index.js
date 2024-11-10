"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transaction_network_1 = __importDefault(require("./transaction.network"));
const transaction = (0, express_1.default)();
transaction.use('/transaction', transaction_network_1.default);
exports.default = transaction;
