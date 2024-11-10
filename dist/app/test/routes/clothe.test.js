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
const clothe_schema_1 = __importDefault(require("../../components/clothe/clothe.schema"));
const chai = (0, chai_1.use)(chai_http_1.default);
describe('Clothe Routes', () => {
    let server;
    let consoleErrorStub;
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        consoleErrorStub = sinon_1.default.stub(console, 'error');
        server = (0, backend_1.createServer)();
        yield mongoose_module_1.default.connect();
        yield clothe_schema_1.default.deleteMany({});
        // Crear una prenda inicial para las pruebas
        const clothe = yield clothe_schema_1.default.create({
            name: 'T-Shirt',
            description: 'A cool T-shirt',
            price: 19.99,
            url_photo: 'http://example.com/tshirt.png',
            category: 'tops',
            clothe_type: 'shirt',
            clothe_size: 'M',
            clothe_color: 'blue',
            available_count: 10
        });
    }));
    after(() => __awaiter(void 0, void 0, void 0, function* () {
        yield clothe_schema_1.default.deleteMany({});
        //await mongooseModule.disconnect();
        consoleErrorStub.restore();
    }));
    describe('GET /all', () => {
        it('should return 200 on success', (done) => {
            chai.request(server)
                .get('/api/clothe/all')
                .end((err, res) => {
                (0, chai_1.expect)(res).to.have.status(200);
                (0, chai_1.expect)(res.body).to.have.property('status', 200);
                (0, chai_1.expect)(res.body.message).to.be.an('array'); // Verifica que sea un array
                done();
            });
        });
    });
    describe('GET /:id', () => {
        it('should return 200 for an existing clothe', () => __awaiter(void 0, void 0, void 0, function* () {
            const clothe = yield clothe_schema_1.default.create({
                name: 'Jacket',
                description: 'A stylish jacket',
                price: 49.99,
                url_photo: 'http://example.com/jacket.png',
                category: 'outerwear',
                clothe_type: 'jacket',
                clothe_size: 'L',
                clothe_color: 'black',
                available_count: 5
            });
            const clotheId = clothe._id;
            chai.request(server)
                .get(`/api/clothe/${clotheId}`)
                .end((err, res) => {
                (0, chai_1.expect)(res).to.have.status(200);
                (0, chai_1.expect)(res.body).to.have.property('status', 200);
                (0, chai_1.expect)(res.body.message).to.have.property('name', 'Jacket');
                (0, chai_1.expect)(res.body.message).to.have.property('price', 49.99);
                //done();
            });
        }));
        it('should return 400 for a non-existing clothe', (done) => {
            const fakeId = '6716c895cb5bd6464b9e8b8c';
            chai.request(server)
                .get(`/api/clothe/${fakeId}`)
                .end((err, res) => {
                (0, chai_1.expect)(res).to.have.status(400);
                (0, chai_1.expect)(res.body).to.have.property('status', 400);
                //expect(res.body).to.have.property('message', 'Clothe not found');
                done();
            });
        });
    });
    describe('POST /add', () => {
        it('should add a new clothe and return 200', (done) => {
            const newClothe = {
                name: 'Sweater',
                description: 'A cozy sweater',
                price: 29.99,
                url_photo: 'http://example.com/sweater.png',
                category: 'tops',
                clothe_type: 'sweater',
                clothe_size: 'L',
                clothe_color: 'green',
                available_count: 15
            };
            chai.request(server)
                .post('/api/clothe/add')
                .send(newClothe)
                .end((err, res) => {
                (0, chai_1.expect)(res).to.have.status(200);
                (0, chai_1.expect)(res.body).to.have.property('status', 200);
                (0, chai_1.expect)(res.body.message).to.have.property('name', 'Sweater');
                (0, chai_1.expect)(res.body.message).to.have.property('price', 29.99);
                done();
            });
        });
        it('should return 500 for missing required fields', (done) => {
            const incompleteClothe = {
                name: 'Shirt',
                price: 19.99
            };
            chai.request(server)
                .post('/api/clothe/add')
                .send(incompleteClothe)
                .end((err, res) => {
                (0, chai_1.expect)(res).to.have.status(500);
                (0, chai_1.expect)(res.body).to.have.property('status', 500);
                //expect(res.body).to.have.property('message', 'Validation failed');
                done();
            });
        });
    });
    describe('DELETE /:id', () => {
        it('should delete a clothe and return 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const clothe = yield clothe_schema_1.default.create({
                name: 'Cap',
                description: 'A cool cap',
                price: 9.99,
                url_photo: 'http://example.com/cap.png',
                category: 'accessories',
                clothe_type: 'cap',
                clothe_size: 'One Size',
                clothe_color: 'red',
                available_count: 20
            });
            const clotheId = clothe._id;
            chai.request(server)
                .delete(`/api/clothe/${clotheId}`)
                .end((err, res) => {
                (0, chai_1.expect)(res).to.have.status(200);
                (0, chai_1.expect)(res.body).to.have.property('status', 200);
                //expect(res.body).to.have.property('message', 'Clothe deleted successfully');
                //done();
            });
        }));
        it('should return 400 for a non-existing clothe', (done) => {
            const fakeId = '6716c895cb5bd6464b9e8b8c';
            chai.request(server)
                .delete(`/api/clothe/${fakeId}`)
                .end((err, res) => {
                (0, chai_1.expect)(res).to.have.status(400);
                (0, chai_1.expect)(res.body).to.have.property('status', 400);
                //expect(res.body).to.have.property('message', 'Clothe not found');
                done();
            });
        });
    });
    describe('PUT /:id', () => {
        it('should update a clothe and return 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const clothe = yield clothe_schema_1.default.create({
                name: 'Shoes',
                description: 'Comfortable shoes',
                price: 39.99,
                url_photo: 'http://example.com/shoes.png',
                category: 'footwear',
                clothe_type: 'shoes',
                clothe_size: '10',
                clothe_color: 'white',
                available_count: 25
            });
            const clotheId = clothe._id;
            const updatedClothe = {
                name: 'Updated Shoes',
                price: 44.99
            };
            chai.request(server)
                .put(`/api/clothe/${clotheId}`)
                .send(updatedClothe)
                .end((err, res) => {
                (0, chai_1.expect)(res).to.have.status(200);
                (0, chai_1.expect)(res.body).to.have.property('status', 200);
                (0, chai_1.expect)(res.body.message).to.have.property('name', 'Updated Shoes');
                (0, chai_1.expect)(res.body.message).to.have.property('price', 44.99);
                //done();
            });
        }));
        it('should return 400 for a non-existing clothe', (done) => {
            const fakeId = '6716c895cb5bd6464b9e8b8c';
            const updatedClothe = {
                name: 'Updated Item'
            };
            chai.request(server)
                .put(`/api/clothe/${fakeId}`)
                .send(updatedClothe)
                .end((err, res) => {
                (0, chai_1.expect)(res).to.have.status(400);
                (0, chai_1.expect)(res.body).to.have.property('status', 400);
                //expect(res.body).to.have.property('message', 'Clothe not found');
                done();
            });
        });
    });
});
