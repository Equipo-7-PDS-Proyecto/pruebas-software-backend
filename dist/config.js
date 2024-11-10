"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    mongo_user: process.env.MONGO_USER,
    mongo_pass: process.env.MONGO_PASS,
    mongo_uri: process.env.MONGO_URI,
    mongo_db: process.env.MONGO_DATABASE,
    port: process.env.PORT || 6000,
};
exports.default = config;
