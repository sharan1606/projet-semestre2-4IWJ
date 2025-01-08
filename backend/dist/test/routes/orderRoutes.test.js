const request = require('supertest');
const app = require('../../server'); 
const Order = require('../../models/orderModel');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Order API Integration Tests', () => {
    beforeEach(async () => {
        await Order.deleteMany();
    });

    it('should create a new order via POST /api/orders', async () => {
        const res = await request(app)
            .post('/api/orders')
            .send({ userId: '123', products: ['product1', 'product2'], total_amount: 100 });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('userId', '123');
        expect(res.body).toHaveProperty('products');
    });

    it('should fetch all orders via GET /api/orders', async () => {
        await Order.create({ userId: '123', products: ['product1', 'product2'], total_amount: 100 });

        const res = await request(app).get('/api/orders');

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveLength(1);
    });

    it('should fetch a specific order via GET /api/orders/:id', async () => {
        const order = await Order.create({ userId: '123', products: ['product1'], total_amount: 50 });

        const res = await request(app).get(`/api/orders/${order._id}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('userId', '123');
    });

    it('should update an order via PUT /api/orders/:id', async () => {
        const order = await Order.create({ userId: '123', products: ['product1'], total_amount: 50 });

        const res = await request(app)
            .put(`/api/orders/${order._id}`)
            .send({ status: 'Completed' });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('status', 'Completed');
    });

    it('should delete an order via DELETE /api/orders/:id', async () => {
        const order = await Order.create({ userId: '123', products: ['product1'], total_amount: 50 });

        const res = await request(app).delete(`/api/orders/${order._id}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', 'Order deleted successfully');
    });
});