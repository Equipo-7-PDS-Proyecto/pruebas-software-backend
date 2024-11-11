import { createServer } from '../../backend';
import mongooseModule from '../../storage/mongoose.module';
import { use, expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import User from '../../components/user/user.schema';
import Clothe from '../../components/clothe/clothe.schema';
import { Clothe as ClotheI } from '../../models/clothe.model';
import Transaction from '../../components/transaction/transaction.schema';
import user from '../../components/user';
import { User as UserI } from '../../models/user.model';
const chai = use(chaiHttp);

describe('Transaction Routes', () => {
    let server: any;
    let consoleErrorStub: any;
    let clothe1 : ClotheI;
    let clothe2 : ClotheI;
    let clothe3 : ClotheI;
    let user : UserI
    before(async () => {
        consoleErrorStub = sinon.stub(console, 'error');
        server = createServer();
        await mongooseModule.connect_testing();

        await Transaction.deleteMany({});
        await Clothe.deleteMany({});
        await User.deleteMany({});

        // Crear un usuario y prendas iniciales para las pruebas
        user = await User.create({
            name: 'Transaction User',
            pass: 'password123',
            email: 'transactionuser@example.com',
            user_type: 1
        });

        clothe1 = await Clothe.create({
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

        clothe2 = await Clothe.create({
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

        clothe3 = await Clothe.create({
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
    });

    after(async () => {
        await Transaction.deleteMany({});
        await Clothe.deleteMany({});
        await User.deleteMany({});
        //await mongooseModule.disconnect();
        consoleErrorStub.restore();
    });

    describe('POST /purchase', () => {
        it('should process a purchase and return 200', (done) => {
            const purchaseData = {
                user: user.id,  // Suponiendo que usamos el ID del usuario
                cart: [
                    {
                        clothe_id: clothe1.id,  // Asegúrate de usar IDs válidos de prendas creadas
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
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('status', 200);
                    expect(res.body.message).to.be.an('array');  // Verifica que la respuesta sea un array
                    done();
                });
        });

        it('should return 400 for missing or invalid fields in the request', (done) => {

            const invalidPurchaseData = {
                user: '',
                cart: []  // Carrito vacío o datos inválidos
            };

            chai.request(server)
                .post('/api/transaction/purchase')
                .send(invalidPurchaseData)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    //expect(res.body).to.have.property('status', 400);
                    //expect(res.body).to.have.property('message', 'Invalid request format or empty cart');
                    done();
                });
        });

        it('should return 500 for not enough item in inventory', (done) => {
            const purchaseData = {
                user: user.id,  // Suponiendo que usamos el ID del usuario
                cart: [
                    {
                        clothe_id: clothe3.id,  // Asegúrate de usar IDs válidos de prendas creadas
                        quantity: 2,
                        amount: 59.99
                    }
                ]
            };

            chai.request(server)
                .post('/api/transaction/purchase')
                .send(purchaseData)
                .end((err, res) => {
                    expect(res).to.have.status(500);
                    //expect(res.body).to.have.property('status', 400);
                    //expect(res.body).to.have.property('message', 'Invalid request format or empty cart');
                    done();
                });
        });

    });
});
