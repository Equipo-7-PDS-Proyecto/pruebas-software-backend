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
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../../config"));
var db = mongoose_1.default.connection;
db.on('connecting', function () {
    console.log('%s\x1b[32m%s\x1b[0m', '[storage] ', 'Conectandose a Mongo...');
});
db.on('disconnected', function () {
    console.log('MongoDB disconnected!');
    setTimeout(connect, 5000);
});
db.on('connected', function () {
    console.log('%s\x1b[32m%s\x1b[0m', '[storage] ', 'Conección a Mongo establecida');
});
db.on('error', function (error) {
    console.error('Error in MongoDb connection: ' + error);
    mongoose_1.default.disconnect();
});
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        const mongoUri = `mongodb+srv://${config_1.default.mongo_user}:${config_1.default.mongo_pass}@${config_1.default.mongo_uri}/${config_1.default.mongo_db}`;
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        };
        mongoose_1.default.connect(`${mongoUri}`, options, (err) => {
            if (err) {
                console.error('Failed to connect to mongo on startup - retrying in 5 sec');
                setTimeout(connect, 5000);
            }
        });
    });
}
function disconnect() {
    return __awaiter(this, void 0, void 0, function* () {
        mongoose_1.default.disconnect();
    });
}
exports.default = { connect, disconnect };
