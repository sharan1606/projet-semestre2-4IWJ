const request = require('supertest');
const app = require('../../server'); 
const Product = require('../../../dist/models/productModel');

jest.mock('../../../dist/models/productModel');

describe('Product Routes', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('GET /api/products - should return all products', async () => {
        Product.find.mockResolvedValue([{ name: 'Laptop', price: 1200 }]);

        const res = await request(app).get('/api/products');

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([{ name: 'Laptop', price: 1200 }]);
    });

    it('GET /api/products/:id - should return a product by ID', async () => {
        const product = { _id: '12345', name: 'Phone', price: 800 };
        Product.findById.mockResolvedValue(product);

        const res = await request(app).get('/api/products/12345');

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(product);
    });

    it('POST /api/products - should create a new product', async () => {
        const newProduct = { name: 'Tablet', price: 500, stock: 15 };
        Product.create.mockResolvedValue({ ...newProduct, _id: '67890' });

        const res = await request(app).post('/api/products').send(newProduct);

        expect(res.statusCode).toBe(201);
        expect(res.body.name).toBe('Tablet');
    });

    it('PUT /api/products/:id - should update an existing product', async () => {
        const updatedProduct = { name: 'Updated Phone', price: 900 };
        Product.findByIdAndUpdate.mockResolvedValue({ ...updatedProduct, _id: '12345' });

        const res = await request(app).put('/api/products/12345').send(updatedProduct);

        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe('Updated Phone');
    });

    it('DELETE /api/products/:id - should delete a product', async () => {
        Product.findByIdAndDelete.mockResolvedValue({ _id: '12345', name: 'Phone' });

        const res = await request(app).delete('/api/products/12345');

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Product deleted successfully');
    });
});