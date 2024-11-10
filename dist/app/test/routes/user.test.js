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
const user_schema_1 = __importDefault(require("../../components/user/user.schema"));
const chai_1 = require("chai");
const chai_http_1 = __importDefault(require("chai-http")); // Use default import
const sinon_1 = __importDefault(require("sinon"));
const chai = (0, chai_1.use)(chai_http_1.default);
describe('User Routes', () => {
    let server;
    let consoleErrorStub;
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        consoleErrorStub = sinon_1.default.stub(console, 'error');
        server = (0, backend_1.createServer)();
        yield mongoose_module_1.default.connect();
        yield user_schema_1.default.deleteMany({});
        const user = yield user_schema_1.default.create({
            name: 'First User',
            pass: 'password2x',
            email: 'firstUser@example.com',
            user_type: 1
        });
    }));
    after(() => __awaiter(void 0, void 0, void 0, function* () {
        yield user_schema_1.default.deleteMany({});
        //await mongooseModule.disconnect();
        consoleErrorStub.restore();
    }));
    /* afterEach(async () => {
        // Limpiar usuarios de prueba después de cada test
        await User.deleteMany({});
    }); */
    describe('GET /all', () => {
        it('should return 200 on success', (done) => {
            chai.request(server)
                .get('/api/user/all') // Ajusta según tu ruta de usuarios
                .end((err, res) => {
                (0, chai_1.expect)(res).to.have.status(200); // Verifica que el estado sea 200
                //expect(res.body.message.message).to.be.an('array');  // Verifica que sea un array
                //console.log(res);
                done();
            });
        });
    });
    describe('GET /:id', () => {
        it('should return a 200 for an existing user', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield user_schema_1.default.create({
                name: 'Test User',
                pass: 'password123',
                email: 'testuser1@example.com',
                user_type: 1
            });
            const userId = user._id;
            chai.request(server)
                .get(`/api/user/${userId}`) // Ajusta según la ruta de tu app
                .end((err, res) => {
                (0, chai_1.expect)(res).to.have.status(200); // Usar código 200 para éxito
                //expect(res.body.message).to.have.property('name', 'Test User');
                //expect(res.body.message).to.have.property('email', 'testuser@example.com');
            });
        }));
        it('should return 400 for a non-existing user', (done) => {
            const fakeId = '6716c895cb5bd6464b9e8b8c';
            chai.request(server)
                .get(`/api/user/${fakeId}`)
                .end((err, res) => {
                (0, chai_1.expect)(res).to.have.status(400); // Usar código 400 para errores
                done();
            });
        });
    });
    describe('POST /register', () => {
        it('should register a new user returning 200', (done) => {
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
                (0, chai_1.expect)(res).to.have.status(200); // Usar código 200 para éxito
                //expect(res.body.message).to.have.property('message', 'User created successfully');
                //expect(res.body.message.user).to.have.property('name', 'New User');
                done();
            });
        });
        it('should return 500 for missing fields', (done) => {
            const incompleteUser = {
                name: 'Incomplete User',
                pass: 'password123',
            };
            chai.request(server)
                .post('/api/user/register')
                .send(incompleteUser)
                .end((err, res) => {
                (0, chai_1.expect)(res).to.have.status(500);
                done();
            });
        });
    });
    describe('POST /login', () => {
        it('should login an existing user with correct credentials with 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield user_schema_1.default.create({
                name: 'Test User',
                pass: 'password123',
                email: 'testuser2@example.com',
                user_type: 1
            });
            const loginData = {
                email: 'testuser2@example.com',
                pass: 'password123'
            };
            chai.request(server)
                .post('/api/user/login')
                .send(loginData)
                .end((err, res) => {
                (0, chai_1.expect)(res).to.have.status(200); // Usar código 200 para éxito
                //done();
            });
        }));
        it('should return 400 for incorrect credentials', (done) => {
            const loginData = {
                email: 'testuser2@example.com',
                pass: 'wrongpassword'
            };
            chai.request(server)
                .post('/api/user/login')
                .send(loginData)
                .end((err, res) => {
                (0, chai_1.expect)(res).to.have.status(400); // Usar código 400 para errores
                done();
            });
        });
    });
});
