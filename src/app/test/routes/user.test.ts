import { createServer } from '../../backend';
import mongooseModule from '../../storage/mongoose.module';
import User from '../../components/user/user.schema';

import { use, expect } from 'chai';
import chaiHttp from 'chai-http';  // Use default import
import sinon from 'sinon';
const chai = use(chaiHttp);

describe('User Routes', () => {
    let server: any;
    let consoleErrorStub: any;

    before(async () => {
        consoleErrorStub = sinon.stub(console, 'error');
        server = createServer();
        await mongooseModule.connect_testing();
        await User.deleteMany({});

        const user = await User.create({
            name: 'First User',
            pass: 'password2x',
            email: 'firstUser@example.com',
            user_type: 1
        });
    });

    after(async () => {
        await User.deleteMany({});
        //await mongooseModule.disconnect();
        consoleErrorStub.restore();
    });

    /* afterEach(async () => {
        // Limpiar usuarios de prueba después de cada test
        await User.deleteMany({});
    }); */
    
    describe('GET /all', () => {
        it('should return 200 on success', (done) => {
            chai.request(server)
                .get('/api/user/all')  // Ajusta según tu ruta de usuarios
                .end((err, res) => {
                    expect(res).to.have.status(200);  // Verifica que el estado sea 200
                    //expect(res.body.message.message).to.be.an('array');  // Verifica que sea un array
                    //console.log(res);
                    done();
                });
        });
    });

    describe('GET /:id', () => {
        it('should return a 200 for an existing user', async () => {
            const user = await User.create({
                name: 'Test User',
                pass: 'password123',
                email: 'testuser1@example.com',
                user_type: 1
            });

            const userId = user._id;

            chai.request(server)
                .get(`/api/user/${userId}`)  // Ajusta según la ruta de tu app
                .end((err, res) => {
                    expect(res).to.have.status(200);  // Usar código 200 para éxito
                    //expect(res.body.message).to.have.property('name', 'Test User');
                    //expect(res.body.message).to.have.property('email', 'testuser@example.com');
                });
        });

        it('should return 400 for a non-existing user', (done) => {
            const fakeId = '6716c895cb5bd6464b9e8b8c';
            chai.request(server)
                .get(`/api/user/${fakeId}`)
                .end((err, res) => {
                    expect(res).to.have.status(400);  // Usar código 400 para errores
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
                    expect(res).to.have.status(200);  // Usar código 200 para éxito
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
                    expect(res).to.have.status(500);
                    done();
                });
        });
    });

    describe('POST /login', () => {
        it('should login an existing user with correct credentials with 200', async () => {
            const user = await User.create({
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
                    expect(res).to.have.status(200);  // Usar código 200 para éxito
                    //done();
                });
        });

        it('should return 400 for incorrect credentials', (done) => {
            const loginData = {
                email: 'testuser2@example.com',
                pass: 'wrongpassword'
            };

            chai.request(server)
                .post('/api/user/login')
                .send(loginData)
                .end((err, res) => {
                    expect(res).to.have.status(400);  // Usar código 400 para errores
                    done();
                });
        });
    });
});
