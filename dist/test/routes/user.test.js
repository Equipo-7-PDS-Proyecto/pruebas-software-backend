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
const backend_1 = require("../../app/backend");
const mongoose_module_1 = __importDefault(require("../../app/storage/mongoose.module"));
const user_schema_1 = __importDefault(require("../../app/components/user/user.schema"));
const chai_1 = require("chai");
const chai_http_1 = __importDefault(require("chai-http")); // Use default import
const chai = (0, chai_1.use)(chai_http_1.default);
describe('User Routes', () => {
    let server;
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        server = (0, backend_1.createServer)();
        yield mongoose_module_1.default.connect();
    }));
    after(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_module_1.default.disconnect(); // Asegúrate de cerrar la conexión al final de las pruebas
    }));
    describe('GET /all', () => {
        it('should return all users', (done) => {
            chai.request(server)
                .get('/api/user/all') // Suponiendo que la ruta esté bajo /api/user
                .end((err, res) => {
                (0, chai_1.expect)(res).to.have.status(200);
                (0, chai_1.expect)(res.body).to.be.an('array');
                done();
            });
        });
    });
    describe('GET /:id', () => {
        it('should return a user by ID', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield user_schema_1.default.create({
                name: 'Test User',
                pass: 'password123',
                email: 'testuser@example.com',
                user_type: 1
            });
            const userId = user._id;
            chai.request(server)
                .get(`/api/user/${userId}`)
                .end((err, res) => {
                (0, chai_1.expect)(res).to.have.status(200);
                (0, chai_1.expect)(res.body).to.have.property('name', 'Test User');
                (0, chai_1.expect)(res.body).to.have.property('email', 'testuser@example.com');
                (0, chai_1.expect)(res.body).to.have.property('user_type', 1);
            });
        }));
        it('should return 404 for a non-existing user', (done) => {
            const fakeId = '610c1f1e3f1a9b0b3c589123';
            chai.request(server)
                .get(`/api/user/${fakeId}`)
                .end((err, res) => {
                (0, chai_1.expect)(res).to.have.status(404);
                done();
            });
        });
    });
    describe('POST /register', () => {
        it('should register a new user', (done) => {
            const newUser = {
                name: 'New User',
                pass: 'password123',
                email: 'newuser@example.com',
                user_type: 1
            };
            chai.request(server)
                .post('/api/user/register')
                .send(newUser)
                .end((err, res) => {
                (0, chai_1.expect)(res).to.have.status(201);
                (0, chai_1.expect)(res.body).to.have.property('message', 'User created successfully');
                (0, chai_1.expect)(res.body.user).to.have.property('name', 'New User');
                done();
            });
        });
        it('should return 400 for missing fields', (done) => {
            const incompleteUser = {
                name: 'Incomplete User',
                pass: 'password123',
            };
            chai.request(server)
                .post('/api/user/register')
                .send(incompleteUser)
                .end((err, res) => {
                (0, chai_1.expect)(res).to.have.status(400);
                done();
            });
        });
    });
    describe('POST /login', () => {
        it('should login an existing user with correct credentials', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield user_schema_1.default.create({
                name: 'Test User',
                pass: 'password123',
                email: 'testuser@example.com',
                user_type: 1
            });
            const loginData = {
                email: 'testuser@example.com',
                pass: 'password123'
            };
            chai.request(server)
                .post('/api/user/login')
                .send(loginData)
                .end((err, res) => {
                (0, chai_1.expect)(res).to.have.status(200);
                (0, chai_1.expect)(res.body).to.have.property('message', 'Login successful');
                (0, chai_1.expect)(res.body.user).to.have.property('name', 'Test User');
            });
        }));
        it('should return 401 for incorrect credentials', (done) => {
            const loginData = {
                email: 'testuser@example.com',
                pass: 'wrongpassword'
            };
            chai.request(server)
                .post('/api/user/login')
                .send(loginData)
                .end((err, res) => {
                (0, chai_1.expect)(res).to.have.status(401);
                (0, chai_1.expect)(res.body).to.have.property('message', 'Invalid credentials');
                done();
            });
        });
    });
});
