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
const backend_1 = require("../../backend");
const mongoose_module_1 = __importDefault(require("../../storage/mongoose.module"));
const chai_1 = require("chai");
const chai_http_1 = __importDefault(require("chai-http"));
const sinon_1 = __importDefault(require("sinon"));
const user_schema_1 = __importDefault(require("../../components/user/user.schema"));
const clothe_schema_1 = __importDefault(require("../../components/clothe/clothe.schema"));
const transaction_schema_1 = __importDefault(require("../../components/transaction/transaction.schema"));
const chai = (0, chai_1.use)(chai_http_1.default);
describe('Transaction Routes', () => {
    let server;
    let consoleErrorStub;
    let clothe1;
    let clothe2;
    let clothe3;
    let user;
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        consoleErrorStub = sinon_1.default.stub(console, 'error');
        server = (0, backend_1.createServer)();
        yield mongoose_module_1.default.connect();
        yield transaction_schema_1.default.deleteMany({});
        yield clothe_schema_1.default.deleteMany({});
        yield user_schema_1.default.deleteMany({});
        // Crear un usuario y prendas iniciales para las pruebas
        user = yield user_schema_1.default.create({
            name: 'Transaction User',
            pass: 'password123',
            email: 'transactionuser@example.com',
            user_type: 1
        });
        clothe1 = yield clothe_schema_1.default.create({
            name: 'Jeans',
            description: 'A pair of blue jeans',
            price: 59.99,
            url_photo: 'http://example.com/jeans.png',
            category: 'pants',
            clothe_type: 'jeans',
            clothe_size: 'M',
            clothe_color: 'blue',
            available_count: 10
        });
        clothe2 = yield clothe_schema_1.default.create({
            name: 'Sweater',
            description: 'A warm sweater',
            price: 39.99,
            url_photo: 'http://example.com/sweater.png',
            category: 'tops',
            clothe_type: 'sweater',
            clothe_size: 'L',
            clothe_color: 'red',
            available_count: 5
        });
        clothe3 = yield clothe_schema_1.default.create({
            name: 'NotEnoughShirt',
            description: 'A bad shirt',
            price: 59.99,
            url_photo: 'http://example.com/shirt.png',
            category: 'shirts',
            clothe_type: 'shirt',
            clothe_size: 'M',
            clothe_color: 'blue',
            available_count: 1
        });
    }));
    after(() => __awaiter(void 0, void 0, void 0, function* () {
        yield transaction_schema_1.default.deleteMany({});
        yield clothe_schema_1.default.deleteMany({});
        yield user_schema_1.default.deleteMany({});
        //await mongooseModule.disconnect();
        consoleErrorStub.restore();
    }));
    describe('POST /purchase', () => {
        it('should process a purchase and return 200', (done) => {
            const purchaseData = {
                user: user.id,
                cart: [
                    {
                        clothe_id: clothe1.id,
                        quantity: 2,
                        amount: 59.99
                    },
                    {
                        clothe_id: clothe2.id,
                        quantity: 1,
                        amount: 39.99
                    }
                ]
            };
            chai.request(server)
                .post('/api/transaction/purchase')
                .send(purchaseData)
                .end((err, res) => {
                (0, chai_1.expect)(res).to.have.status(200);
                (0, chai_1.expect)(res.body).to.have.property('status', 200);
                (0, chai_1.expect)(res.body.message).to.be.an('array'); // Verifica que la respuesta sea un array
                done();
            });
        });
        it('should return 400 for missing or invalid fields in the request', (done) => {
            const invalidPurchaseData = {
                user: '',
                cart: [] // Carrito vacío o datos inválidos
            };
            chai.request(server)
                .post('/api/transaction/purchase')
                .send(invalidPurchaseData)
                .end((err, res) => {
                (0, chai_1.expect)(res).to.have.status(400);
                //expect(res.body).to.have.property('status', 400);
                //expect(res.body).to.have.property('message', 'Invalid request format or empty cart');
                done();
            });
        });
        it('should return 500 for not enough item in inventory', (done) => {
            const purchaseData = {
                user: user.id,
                cart: [
                    {
                        clothe_id: clothe3.id,
                        quantity: 2,
                        amount: 59.99
                    }
                ]
            };
            chai.request(server)
                .post('/api/transaction/purchase')
                .send(purchaseData)
                .end((err, res) => {
                (0, chai_1.expect)(res).to.have.status(500);
                //expect(res.body).to.have.property('status', 400);
                //expect(res.body).to.have.property('message', 'Invalid request format or empty cart');
                done();
            });
        });
    });
});
