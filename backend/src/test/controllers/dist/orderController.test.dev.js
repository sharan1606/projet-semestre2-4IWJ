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
});