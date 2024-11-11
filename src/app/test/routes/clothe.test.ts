import { createServer } from '../../backend';
import mongooseModule from '../../storage/mongoose.module';

import { use, expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import Clothe from '../../components/clothe/clothe.schema';
const chai = use(chaiHttp);

describe('Clothe Routes', () => {
    let server: any;
    let consoleErrorStub: any;

    before(async () => {
        consoleErrorStub = sinon.stub(console, 'error');
        server = createServer();
        await mongooseModule.connect_testing();
        await Clothe.deleteMany({});

        // Crear una prenda inicial para las pruebas
        const clothe = await Clothe.create({
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
    });

    after(async () => {
        await Clothe.deleteMany({});
        //await mongooseModule.disconnect();
        consoleErrorStub.restore();
    });

    describe('GET /all', () => {
        it('should return 200 on success', (done) => {
            chai.request(server)
                .get('/api/clothe/all')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('status', 200);
                    expect(res.body.message).to.be.an('array');  // Verifica que sea un array
                    done();
                });
        });
    });

    describe('GET /:id', () => {
        it('should return 200 for an existing clothe', async () => {
            const clothe = await Clothe.create({
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
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('status', 200);
                    expect(res.body.message).to.have.property('name', 'Jacket');
                    expect(res.body.message).to.have.property('price', 49.99);
                    //done();
                });
        });

        it('should return 400 for a non-existing clothe', (done) => {
            const fakeId = '6716c895cb5bd6464b9e8b8c';
            chai.request(server)
                .get(`/api/clothe/${fakeId}`)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('status', 400);
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
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('status', 200);
                    expect(res.body.message).to.have.property('name', 'Sweater');
                    expect(res.body.message).to.have.property('price', 29.99);
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
                    expect(res).to.have.status(500);
                    expect(res.body).to.have.property('status', 500);
                    //expect(res.body).to.have.property('message', 'Validation failed');
                    done();
                });
        });
    });

    describe('DELETE /:id', () => {
        it('should delete a clothe and return 200', async () => {
            const clothe = await Clothe.create({
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
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('status', 200);
                    //expect(res.body).to.have.property('message', 'Clothe deleted successfully');
                    //done();
                });
        });

        it('should return 400 for a non-existing clothe', (done) => {
            const fakeId = '6716c895cb5bd6464b9e8b8c';
            chai.request(server)
                .delete(`/api/clothe/${fakeId}`)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('status', 400);
                    //expect(res.body).to.have.property('message', 'Clothe not found');
                    done();
                });
        });
    });

    describe('PUT /:id', () => {
        it('should update a clothe and return 200', async () => {
            const clothe = await Clothe.create({
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
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('status', 200);
                    expect(res.body.message).to.have.property('name', 'Updated Shoes');
                    expect(res.body.message).to.have.property('price', 44.99);
                    //done();
                });
        });

        it('should return 400 for a non-existing clothe', (done) => {
            const fakeId = '6716c895cb5bd6464b9e8b8c';
            const updatedClothe = {
                name: 'Updated Item'
            };

            chai.request(server)
                .put(`/api/clothe/${fakeId}`)
                .send(updatedClothe)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('status', 400);
                    //expect(res.body).to.have.property('message', 'Clothe not found');
                    done();
                });
        });
    });
});
