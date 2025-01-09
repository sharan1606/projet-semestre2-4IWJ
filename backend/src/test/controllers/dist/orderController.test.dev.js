"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var orderController = require('../../../dist/controllers/orderController');

var Order = require('../../../dist/models/orderModel')["default"];

jest.mock('../../../dist/models/orderModel');
describe('Order Controller', function () {
  var mockRequest;
  var mockResponse;
  beforeEach(function () {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });
  afterEach(function () {
    jest.clearAllMocks();
  });
  describe('createOrder', function () {
    beforeEach(function () {
      mockRequest = {
        body: {
          idUser: '123',
          total_amount: 100,
          delivery_address: '123 rue test',
          status: 'En cours'
        }
      };
    });
    it('should create a new order successfully', function _callee() {
      var mockCreatedOrder, mockOrderInstance;
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              mockCreatedOrder = _objectSpread({
                idOrder: 'mock-uuid'
              }, mockRequest.body);
              mockOrderInstance = {
                save: jest.fn().mockResolvedValue(mockCreatedOrder)
              };
              Order.mockImplementation(function () {
                return mockOrderInstance;
              });
              _context.next = 5;
              return regeneratorRuntime.awrap(orderController.createOrder(mockRequest, mockResponse));

            case 5:
              expect(mockResponse.status).toHaveBeenCalledWith(201);
              expect(mockResponse.json).toHaveBeenCalledWith(mockCreatedOrder);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      });
    });
    it('should return 500 if order creation fails', function _callee2() {
      var mockOrderInstance;
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              mockOrderInstance = {
                save: jest.fn().mockRejectedValue(new Error('Database Error'))
              };
              Order.mockImplementation(function () {
                return mockOrderInstance;
              });
              _context2.next = 4;
              return regeneratorRuntime.awrap(orderController.createOrder(mockRequest, mockResponse));

            case 4:
              expect(mockResponse.status).toHaveBeenCalledWith(500);
              expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Erreur serveur',
                error: expect.any(Error)
              });

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      });
    });
  });
  describe('getAllOrders', function () {
    it('should fetch all orders successfully', function _callee3() {
      var mockOrders;
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              mockOrders = [{
                idUser: '123',
                total_amount: 100,
                delivery_address: '123 rue test'
              }];
              Order.find = jest.fn().mockResolvedValue(mockOrders);
              _context3.next = 4;
              return regeneratorRuntime.awrap(orderController.getAllOrders(mockRequest, mockResponse));

            case 4:
              expect(Order.find).toHaveBeenCalled();
              expect(mockResponse.status).toHaveBeenCalledWith(200);
              expect(mockResponse.json).toHaveBeenCalledWith(mockOrders);

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      });
    });
    it('should return 500 if fetching orders fails', function _callee4() {
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              Order.find = jest.fn().mockRejectedValue(new Error('Database Error'));
              _context4.next = 3;
              return regeneratorRuntime.awrap(orderController.getAllOrders(mockRequest, mockResponse));

            case 3:
              expect(mockResponse.status).toHaveBeenCalledWith(500);
              expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Erreur serveur',
                error: expect.any(Error)
              });

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      });
    });
  });
  describe('deleteOrder', function () {
    beforeEach(function () {
      mockRequest = {
        params: {
          id: 'mock-id'
        }
      };
    });
    it('should delete an order successfully', function _callee5() {
      var mockOrder;
      return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              mockOrder = {
                deleteOne: jest.fn().mockResolvedValue()
              };
              Order.findById = jest.fn().mockResolvedValue(mockOrder);
              _context5.next = 4;
              return regeneratorRuntime.awrap(orderController.deleteOrder(mockRequest, mockResponse));

            case 4:
              expect(Order.findById).toHaveBeenCalledWith('mock-id');
              expect(mockOrder.deleteOne).toHaveBeenCalled();
              expect(mockResponse.status).toHaveBeenCalledWith(200);
              expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Commande supprimée avec succès.'
              });

            case 8:
            case "end":
              return _context5.stop();
          }
        }
      });
    });
    it('should return 404 if order is not found', function _callee6() {
      return regeneratorRuntime.async(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              Order.findById = jest.fn().mockResolvedValue(null);
              _context6.next = 3;
              return regeneratorRuntime.awrap(orderController.deleteOrder(mockRequest, mockResponse));

            case 3:
              expect(Order.findById).toHaveBeenCalledWith('mock-id');
              expect(mockResponse.status).toHaveBeenCalledWith(404);
              expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Commande non trouvée.'
              });

            case 6:
            case "end":
              return _context6.stop();
          }
        }
      });
    });
    it('should return 500 if deletion fails', function _callee7() {
      return regeneratorRuntime.async(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              Order.findById = jest.fn().mockRejectedValue(new Error('Database Error'));
              _context7.next = 3;
              return regeneratorRuntime.awrap(orderController.deleteOrder(mockRequest, mockResponse));

            case 3:
              expect(Order.findById).toHaveBeenCalledWith('mock-id');
              expect(mockResponse.status).toHaveBeenCalledWith(500);
              expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Erreur serveur',
                error: expect.any(Error)
              });

            case 6:
            case "end":
              return _context7.stop();
          }
        }
      });
    });
  });
  describe('updateOrder', function () {
    beforeEach(function () {
      mockRequest = {
        params: {
          id: 'mock-id'
        },
        body: {
          total_amount: 150,
          delivery_address: '456 rue test',
          status: 'Livré'
        }
      };
    });
    it('should update an order successfully', function _callee8() {
      var mockOrder;
      return regeneratorRuntime.async(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              mockOrder = {
                total_amount: 100,
                delivery_address: '123 rue test',
                status: 'En cours',
                save: jest.fn().mockResolvedValue({
                  total_amount: 150,
                  delivery_address: '456 rue test',
                  status: 'Livré'
                })
              };
              Order.findById = jest.fn().mockResolvedValue(mockOrder);
              _context8.next = 4;
              return regeneratorRuntime.awrap(orderController.updateOrder(mockRequest, mockResponse));

            case 4:
              expect(Order.findById).toHaveBeenCalledWith('mock-id');
              expect(mockOrder.save).toHaveBeenCalled();
              expect(mockResponse.status).toHaveBeenCalledWith(200);
              expect(mockResponse.json).toHaveBeenCalledWith({
                total_amount: 150,
                delivery_address: '456 rue test',
                status: 'Livré'
              });

            case 8:
            case "end":
              return _context8.stop();
          }
        }
      });
    });
    it('should return 404 if order is not found', function _callee9() {
      return regeneratorRuntime.async(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              Order.findById = jest.fn().mockResolvedValue(null);
              _context9.next = 3;
              return regeneratorRuntime.awrap(orderController.updateOrder(mockRequest, mockResponse));

            case 3:
              expect(Order.findById).toHaveBeenCalledWith('mock-id');
              expect(mockResponse.status).toHaveBeenCalledWith(404);
              expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Commande non trouvée.'
              });

            case 6:
            case "end":
              return _context9.stop();
          }
        }
      });
    });
    it('should return 500 if update fails', function _callee10() {
      return regeneratorRuntime.async(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              Order.findById = jest.fn().mockRejectedValue(new Error('Database Error'));
              _context10.next = 3;
              return regeneratorRuntime.awrap(orderController.updateOrder(mockRequest, mockResponse));

            case 3:
              expect(Order.findById).toHaveBeenCalledWith('mock-id');
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
  describe('getOrderById', function () {
    beforeEach(function () {
      mockRequest = {
        params: {
          id: 'mock-id'
        }
      };
    });
    it('should fetch an order successfully', function _callee11() {
      var mockOrder;
      return regeneratorRuntime.async(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              mockOrder = {
                idUser: '123',
                total_amount: 100,
                delivery_address: '123 rue test',
                status: 'En cours'
              };
              Order.findById = jest.fn().mockResolvedValue(mockOrder);
              _context11.next = 4;
              return regeneratorRuntime.awrap(orderController.getOrderById(mockRequest, mockResponse));

            case 4:
              expect(Order.findById).toHaveBeenCalledWith('mock-id');
              expect(mockResponse.status).toHaveBeenCalledWith(200);
              expect(mockResponse.json).toHaveBeenCalledWith(mockOrder);

            case 7:
            case "end":
              return _context11.stop();
          }
        }
      });
    });
    it('should return 404 if order is not found', function _callee12() {
      return regeneratorRuntime.async(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              Order.findById = jest.fn().mockResolvedValue(null);
              _context12.next = 3;
              return regeneratorRuntime.awrap(orderController.getOrderById(mockRequest, mockResponse));

            case 3:
              expect(Order.findById).toHaveBeenCalledWith('mock-id');
              expect(mockResponse.status).toHaveBeenCalledWith(404);
              expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Commande non trouvée.'
              });

            case 6:
            case "end":
              return _context12.stop();
          }
        }
      });
    });
    it('should return 500 if fetching the order fails', function _callee13() {
      return regeneratorRuntime.async(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              Order.findById = jest.fn().mockRejectedValue(new Error('Database Error'));
              _context13.next = 3;
              return regeneratorRuntime.awrap(orderController.getOrderById(mockRequest, mockResponse));

            case 3:
              expect(Order.findById).toHaveBeenCalledWith('mock-id');
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