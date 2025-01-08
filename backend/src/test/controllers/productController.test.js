const productController = require('../../dist/controllers/productController');
const Product = require('../../models/Product');

jest.mock('../../models/Product'); 

describe('Product Controller', () => {
    afterEach(() => {
        jest.clearAllMocks(); 
    });

    it('should fetch all products', async () => {
        const mockProducts = [{ name: 'Chargeurs', price: 29.99 }];
        Product.find.mockResolvedValue(mockProducts); 

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await productController.getAllProducts(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockProducts);
    });
});