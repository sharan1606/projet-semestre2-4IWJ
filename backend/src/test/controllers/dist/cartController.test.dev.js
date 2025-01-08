"use strict";

// Compiler le controller TypeScript en JS avant les tests
require('@babel/register')({
  extensions: ['.js', '.ts'],
  presets: ['@babel/preset-typescript']
});

var cartController = require('../../controllers/cartController');

var Cart = require('../../models/cartModel');

var Product = require('../../models/productModel'); // Mock des modèles


jest.mock('../../models/cartModel', function () {
  return {
    findOne: jest.fn()
  };
});
jest.mock('../../models/productModel', function () {
  return {
    findOne: jest.fn()
  };
});
describe('Cart Controller Tests', function () {
  var mockRequest;
  var mockResponse;
  var responseObject;
  beforeEach(function () {
    responseObject = {
      statusCode: 0,
      jsonValue: null
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockImplementation(function (result) {
        responseObject.jsonValue = result;
      })
    };
    jest.clearAllMocks();
  });
  describe('addToCart', function () {
    it('should add a new item to cart successfully', function _callee() {
      var mockProduct, mockCart;
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              mockProduct = {
                idProduct: '123',
                price: 10
              };
              mockCart = {
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
              _context.next = 7;
              return regeneratorRuntime.awrap(cartController.addToCart(mockRequest, mockResponse));

            case 7:
              expect(mockResponse.status).toHaveBeenCalledWith(200);
              expect(Cart.findOne).toHaveBeenCalledWith({
                idUser: 'user123'
              });
              expect(mockCart.save).toHaveBeenCalled();

            case 10:
            case "end":
              return _context.stop();
          }
        }
      });
    });
  });
  describe('getCart', function () {
    it('should get cart with populated items', function _callee2() {
      var mockCart, mockProduct;
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              mockCart = {
                idUser: 'user123',
                items: [{
                  idProduct: '123',
                  quantity: 2
                }],
                total: 20
              };
              mockProduct = {
                idProduct: '123',
                name: 'Test Product',
                price: 10,
                image: 'test.jpg'
              };
              Cart.findOne.mockResolvedValue(mockCart);
              Product.findOne.mockResolvedValue(mockProduct);
              mockRequest = {
                params: {
                  idUser: 'user123'
                }
              };
              _context2.next = 7;
              return regeneratorRuntime.awrap(cartController.getCart(mockRequest, mockResponse));

            case 7:
              expect(mockResponse.status).toHaveBeenCalledWith(200);
              expect(responseObject.jsonValue.items[0]).toHaveProperty('name', 'Test Product');

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      });
    });
  });
  describe('updateCartItem', function () {
    it('should update item quantity', function _callee3() {
      var mockCart;
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              mockCart = {
                idUser: 'user123',
                items: [{
                  idProduct: '123',
                  quantity: 1
                }],
                total: 10,
                save: jest.fn().mockResolvedValue(true)
              };
              Cart.findOne.mockResolvedValue(mockCart);
              Product.findOne.mockResolvedValue({
                price: 10
              });
              mockRequest = {
                body: {
                  idUser: 'user123',
                  idProduct: '123',
                  quantity: 2
                }
              };
              _context3.next = 6;
              return regeneratorRuntime.awrap(cartController.updateCartItem(mockRequest, mockResponse));

            case 6:
              expect(mockResponse.status).toHaveBeenCalledWith(200);
              expect(mockCart.save).toHaveBeenCalled();

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      });
    });
  });
  describe('clearCart', function () {
    it('should clear cart successfully', function _callee4() {
      var mockCart;
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              mockCart = {
                idUser: 'user123',
                items: [{
                  idProduct: '123',
                  quantity: 1
                }],
                total: 10,
                save: jest.fn().mockResolvedValue(true)
              };
              Cart.findOne.mockResolvedValue(mockCart);
              mockRequest = {
                params: {
                  idUser: 'user123'
                }
              };
              _context4.next = 5;
              return regeneratorRuntime.awrap(cartController.clearCart(mockRequest, mockResponse));

            case 5:
              expect(mockResponse.status).toHaveBeenCalledWith(200);
              expect(responseObject.jsonValue.message).toBe('Panier vidé avec succès.');
              expect(mockCart.save).toHaveBeenCalled();

            case 8:
            case "end":
              return _context4.stop();
          }
        }
      });
    });
  });
});