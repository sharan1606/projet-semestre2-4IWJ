"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var productController = require('../../../dist/controllers/productController');

var Product = require('../../../dist/models/productModel')["default"];

jest.mock('../../../dist/models/productModel', function () {
  var mockConstructor = jest.fn();
  return {
    "default": Object.assign(mockConstructor, {
      find: jest.fn(),
      findOne: jest.fn(),
      deleteOne: jest.fn()
    })
  };
});
describe('Product Controller', function () {
  var mockRequest;
  var mockResponse;
  beforeEach(function () {
    mockRequest = {
      params: {},
      body: {}
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });
  afterEach(function () {
    jest.clearAllMocks();
  });
  describe('getAllProducts', function () {
    it('should handle errors in getAllProducts', function _callee() {
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              Product.find.mockRejectedValue(new Error('Database error'));
              _context.next = 3;
              return regeneratorRuntime.awrap(productController.getAllProducts(mockRequest, mockResponse));

            case 3:
              expect(mockResponse.status).toHaveBeenCalledWith(500);
              expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Erreur serveur',
                error: expect.any(Error)
              });

            case 5:
            case "end":
              return _context.stop();
          }
        }
      });
    });
    it('should fetch all products successfully', function _callee2() {
      var mockProducts;
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              mockProducts = [{
                idProduct: 'test-uuid',
                name: 'Test Product',
                description: 'Test Description',
                price: 99.99,
                stock: 10,
                brand: 'Test Brand',
                category: 'Test Category',
                image: 'test.jpg',
                date_add: new Date()
              }];
              Product.find.mockResolvedValue(mockProducts);
              _context2.next = 4;
              return regeneratorRuntime.awrap(productController.getAllProducts(mockRequest, mockResponse));

            case 4:
              expect(Product.find).toHaveBeenCalled();
              expect(mockResponse.status).toHaveBeenCalledWith(200);
              expect(mockResponse.json).toHaveBeenCalledWith(mockProducts);

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      });
    });
  });
  describe('deleteProduct', function () {
    it('should delete a product successfully', function _callee3() {
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              mockRequest.params = {
                id: 'test-uuid'
              };
              Product.findOne.mockResolvedValue({
                idProduct: 'test-uuid',
                name: 'Test Product'
              });
              Product.deleteOne.mockResolvedValue({
                deletedCount: 1
              });
              _context3.next = 5;
              return regeneratorRuntime.awrap(productController.deleteProduct(mockRequest, mockResponse));

            case 5:
              expect(Product.findOne).toHaveBeenCalledWith({
                idProduct: 'test-uuid'
              });
              expect(Product.deleteOne).toHaveBeenCalledWith({
                idProduct: 'test-uuid'
              });
              expect(mockResponse.status).toHaveBeenCalledWith(200);
              expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Produit supprimé avec succès.'
              });

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      });
    });
    it('should return 404 if product not found', function _callee4() {
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              mockRequest.params = {
                id: 'nonexistent-id'
              };
              Product.findOne.mockResolvedValue(null);
              _context4.next = 4;
              return regeneratorRuntime.awrap(productController.deleteProduct(mockRequest, mockResponse));

            case 4:
              expect(Product.findOne).toHaveBeenCalledWith({
                idProduct: 'nonexistent-id'
              });
              expect(Product.deleteOne).not.toHaveBeenCalled();
              expect(mockResponse.status).toHaveBeenCalledWith(404);
              expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Produit non trouvé.'
              });

            case 8:
            case "end":
              return _context4.stop();
          }
        }
      });
    });
    it('should return 500 if deletion fails', function _callee5() {
      return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              mockRequest.params = {
                id: 'test-uuid'
              };
              Product.findOne.mockRejectedValue(new Error('Database error'));
              _context5.next = 4;
              return regeneratorRuntime.awrap(productController.deleteProduct(mockRequest, mockResponse));

            case 4:
              expect(mockResponse.status).toHaveBeenCalledWith(500);
              expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Erreur serveur',
                error: expect.any(Error)
              });

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      });
    });
  });
  describe('updateProduct', function () {
    it('should update a product successfully', function _callee6() {
      var existingProduct;
      return regeneratorRuntime.async(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              existingProduct = {
                idProduct: 'test-uuid',
                name: 'Original Product',
                description: 'Original Description',
                price: 99.99,
                stock: 10,
                brand: 'Original Brand',
                category: 'Original Category',
                image: 'original.jpg',
                save: jest.fn()
              };
              mockRequest.params = {
                id: 'test-uuid'
              };
              mockRequest.body = {
                name: 'Updated Product',
                price: 149.99
              };
              Product.findOne.mockResolvedValue(existingProduct);
              existingProduct.save.mockResolvedValue(_objectSpread({}, existingProduct, {}, mockRequest.body));
              _context6.next = 7;
              return regeneratorRuntime.awrap(productController.updateProduct(mockRequest, mockResponse));

            case 7:
              expect(Product.findOne).toHaveBeenCalledWith({
                idProduct: 'test-uuid'
              });
              expect(existingProduct.save).toHaveBeenCalled();
              expect(mockResponse.status).toHaveBeenCalledWith(200);
              expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
                name: 'Updated Product',
                price: 149.99
              }));

            case 11:
            case "end":
              return _context6.stop();
          }
        }
      });
    });
    it('should return 404 if product to update not found', function _callee7() {
      return regeneratorRuntime.async(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              mockRequest.params = {
                id: 'nonexistent-id'
              };
              mockRequest.body = {
                name: 'Updated Product'
              };
              Product.findOne.mockResolvedValue(null);
              _context7.next = 5;
              return regeneratorRuntime.awrap(productController.updateProduct(mockRequest, mockResponse));

            case 5:
              expect(Product.findOne).toHaveBeenCalledWith({
                idProduct: 'nonexistent-id'
              });
              expect(mockResponse.status).toHaveBeenCalledWith(404);
              expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Produit non trouvé.'
              });

            case 8:
            case "end":
              return _context7.stop();
          }
        }
      });
    });
    it('should return 500 if update fails', function _callee8() {
      return regeneratorRuntime.async(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              // Setup
              mockRequest.params = {
                id: 'test-uuid'
              }; // Mock erreur lors de la recherche

              Product.findOne.mockRejectedValue(new Error('Database error'));
              _context8.next = 4;
              return regeneratorRuntime.awrap(productController.updateProduct(mockRequest, mockResponse));

            case 4:
              expect(mockResponse.status).toHaveBeenCalledWith(500);
              expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Erreur serveur',
                error: expect.any(Error)
              });

            case 6:
            case "end":
              return _context8.stop();
          }
        }
      });
    });
  });
  describe('createProduct', function () {
    it('should create a product successfully', function _callee9() {
      var saveResult, saveMock;
      return regeneratorRuntime.async(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              mockRequest.body = {
                name: 'New Product',
                description: 'Product Description',
                price: 99.99,
                stock: 50,
                brand: 'Test Brand',
                category: 'Test Category',
                image: 'test.jpg'
              };
              saveResult = _objectSpread({
                idProduct: 'test-uuid'
              }, mockRequest.body);
              saveMock = jest.fn().mockResolvedValue(saveResult);
              Product.mockImplementation(function () {
                return {
                  save: saveMock
                };
              });
              _context9.next = 6;
              return regeneratorRuntime.awrap(productController.createProduct(mockRequest, mockResponse));

            case 6:
              expect(mockResponse.status).toHaveBeenCalledWith(201);
              expect(mockResponse.json).toHaveBeenCalledWith(saveResult);

            case 8:
            case "end":
              return _context9.stop();
          }
        }
      });
    });
    it('should return 500 if creation fails', function _callee10() {
      return regeneratorRuntime.async(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              mockRequest.body = {
                name: 'New Product',
                description: 'Product Description',
                price: 99.99,
                stock: 50,
                brand: 'Test Brand',
                category: 'Test Category',
                image: 'test.jpg'
              };
              Product.mockImplementation(function () {
                return {
                  save: jest.fn().mockRejectedValue(new Error('Save failed'))
                };
              });
              _context10.next = 4;
              return regeneratorRuntime.awrap(productController.createProduct(mockRequest, mockResponse));

            case 4:
              expect(mockResponse.status).toHaveBeenCalledWith(500);
              expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Erreur serveur',
                error: expect.any(Error)
              });

            case 6:
            case "end":
              return _context10.stop();
          }
        }
      });
    });
  });
  describe('getProductById', function () {
    it('should get product successfully', function _callee11() {
      var mockProduct;
      return regeneratorRuntime.async(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              mockProduct = {
                idProduct: 'test-uuid',
                name: 'Test Product',
                description: 'Test Description',
                price: 99.99,
                stock: 10,
                brand: 'Test Brand',
                category: 'Test Category',
                image: 'test.jpg'
              };
              mockRequest.params = {
                id: 'test-uuid'
              };
              Product.findOne.mockResolvedValue(mockProduct);
              _context11.next = 5;
              return regeneratorRuntime.awrap(productController.getProductById(mockRequest, mockResponse));

            case 5:
              expect(Product.findOne).toHaveBeenCalledWith({
                idProduct: 'test-uuid'
              });
              expect(mockResponse.status).toHaveBeenCalledWith(200);
              expect(mockResponse.json).toHaveBeenCalledWith(mockProduct);

            case 8:
            case "end":
              return _context11.stop();
          }
        }
      });
    });
    it('should return 404 if product not found', function _callee12() {
      return regeneratorRuntime.async(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              mockRequest.params = {
                id: 'nonexistent-id'
              };
              Product.findOne.mockResolvedValue(null);
              _context12.next = 4;
              return regeneratorRuntime.awrap(productController.getProductById(mockRequest, mockResponse));

            case 4:
              expect(Product.findOne).toHaveBeenCalledWith({
                idProduct: 'nonexistent-id'
              });
              expect(mockResponse.status).toHaveBeenCalledWith(404);
              expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Produit non trouvé.'
              });

            case 7:
            case "end":
              return _context12.stop();
          }
        }
      });
    });
    it('should return 500 if search fails', function _callee13() {
      return regeneratorRuntime.async(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              mockRequest.params = {
                id: 'test-uuid'
              };
              Product.findOne.mockRejectedValue(new Error('Database error'));
              _context13.next = 4;
              return regeneratorRuntime.awrap(productController.getProductById(mockRequest, mockResponse));

            case 4:
              expect(mockResponse.status).toHaveBeenCalledWith(500);
              expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Erreur serveur',
                error: expect.any(Error)
              });

            case 6:
            case "end":
              return _context13.stop();
          }
        }
      });
    });
  });
});