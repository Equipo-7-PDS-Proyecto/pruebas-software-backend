"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./user"));
const clothe_1 = __importDefault(require("./clothe"));
const transaction_1 = __importDefault(require("./transaction"));
const components = [user_1.default, clothe_1.default, transaction_1.default];
exports.default = components;
