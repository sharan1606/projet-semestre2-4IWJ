import orderController from '../../../src/controllers/orderController';
import Order from '../../../src/models/orderModel';

jest.mock('../../../src/models/orderModel');

describe('Order Controller', () => {
    afterEach(() => {
        jest.clearAllMocks(); 
    });

    describe('createOrder', () => {
        it('should create a new order successfully', async () => {
            const req = { body: { userId: '123', products: ['product1', 'product2'], total_amount: 100 } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            Order.create.mockResolvedValue({ userId: '123', products: ['product1', 'product2'], total_amount: 100 });

            await orderController.createOrder(req, res);

            expect(Order.create).toHaveBeenCalledWith({
                userId: '123',
                products: ['product1', 'product2'],
                total_amount: 100,
            });
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                userId: '123',
                products: ['product1', 'product2'],
                total_amount: 100,
            });
        });

        it('should return 500 if order creation fails', async () => {
            const req = { body: { userId: '123', products: ['product1', 'product2'] } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            Order.create.mockRejectedValue(new Error('Database Error'));

            await orderController.createOrder(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Database Error' });
        });
    });

    describe('getAllOrders', () => {
        it('should fetch all orders successfully', async () => {
            const req = {};
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            Order.find.mockResolvedValue([{ userId: '123', products: ['product1', 'product2'] }]);

            await orderController.getAllOrders(req, res);

            expect(Order.find).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([{ userId: '123', products: ['product1', 'product2'] }]);
        });

        it('should return 500 if fetching orders fails', async () => {
            const req = {};
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            Order.find.mockRejectedValue(new Error('Database Error'));

            await orderController.getAllOrders(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Database Error' });
        });
    });
});
