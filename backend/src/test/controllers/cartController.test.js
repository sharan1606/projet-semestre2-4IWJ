// Compiler le controller TypeScript en JS avant les tests
require('@babel/register')({
  extensions: ['.js', '.ts'],
  presets: ['@babel/preset-typescript']
});

const cartController = require('../../controllers/cartController');
const Cart = require('../../models/cartModel');
const Product = require('../../models/productModel');

// Mock des modèles
jest.mock('../../models/cartModel', () => ({
  findOne: jest.fn()
}));

jest.mock('../../models/productModel', () => ({
  findOne: jest.fn()
}));

describe('Cart Controller Tests', () => {
  let mockRequest;
  let mockResponse;
  let responseObject;

  beforeEach(() => {
    responseObject = {
      statusCode: 0,
      jsonValue: null
    };
    
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockImplementation((result) => {
        responseObject.jsonValue = result;
      })
    };
    
    jest.clearAllMocks();
  });

  describe('addToCart', () => {
    it('should add a new item to cart successfully', async () => {
      const mockProduct = {
        idProduct: '123',
        price: 10
      };

      const mockCart = {
        idUser: 'user123',
        items: [],
        total: 0,
        save: jest.fn().mockResolvedValue(true)
      };

      Product.findOne.mockResolvedValue(mockProduct);
      Cart.findOne.mockResolvedValue(mockCart);

      mockRequest = {
        body: {
          idUser: 'user123',
          idProduct: '123',
          quantity: 2
        }
      };

      await cartController.addToCart(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(Cart.findOne).toHaveBeenCalledWith({ idUser: 'user123' });
      expect(mockCart.save).toHaveBeenCalled();
    });
  });

  describe('getCart', () => {
    it('should get cart with populated items', async () => {
      const mockCart = {
        idUser: 'user123',
        items: [{ idProduct: '123', quantity: 2 }],
        total: 20
      };

      const mockProduct = {
        idProduct: '123',
        name: 'Test Product',
        price: 10,
        image: 'test.jpg'
      };

      Cart.findOne.mockResolvedValue(mockCart);
      Product.findOne.mockResolvedValue(mockProduct);

      mockRequest = {
        params: { idUser: 'user123' }
      };

      await cartController.getCart(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(responseObject.jsonValue.items[0]).toHaveProperty('name', 'Test Product');
    });
  });

  describe('updateCartItem', () => {
    it('should update item quantity', async () => {
      const mockCart = {
        idUser: 'user123',
        items: [{ idProduct: '123', quantity: 1 }],
        total: 10,
        save: jest.fn().mockResolvedValue(true)
      };

      Cart.findOne.mockResolvedValue(mockCart);
      Product.findOne.mockResolvedValue({ price: 10 });

      mockRequest = {
        body: {
          idUser: 'user123',
          idProduct: '123',
          quantity: 2
        }
      };

      await cartController.updateCartItem(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockCart.save).toHaveBeenCalled();
    });
  });

  describe('clearCart', () => {
    it('should clear cart successfully', async () => {
      const mockCart = {
        idUser: 'user123',
        items: [{ idProduct: '123', quantity: 1 }],
        total: 10,
        save: jest.fn().mockResolvedValue(true)
      };

      Cart.findOne.mockResolvedValue(mockCart);

      mockRequest = {
        params: { idUser: 'user123' }
      };

      await cartController.clearCart(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(responseObject.jsonValue.message).toBe('Panier vidé avec succès.');
      expect(mockCart.save).toHaveBeenCalled();
    });
  });
});