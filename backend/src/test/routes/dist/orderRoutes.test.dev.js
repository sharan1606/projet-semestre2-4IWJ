"use strict";

var request = require("supertest");

var mongoose = require("mongoose");

var _require = require("mongodb-memory-server"),
    MongoMemoryServer = _require.MongoMemoryServer;

var app = require("../../../dist/server");

var Order = require("../../../dist/models/orderModel")["default"];

var mongoServer;
beforeAll(function _callee() {
  var uri;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(MongoMemoryServer.create());

        case 2:
          mongoServer = _context.sent;
          uri = mongoServer.getUri();
          _context.next = 6;
          return regeneratorRuntime.awrap(mongoose.disconnect());

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(mongoose.connect(uri));

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
});
afterAll(function _callee2() {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(mongoose.disconnect());

        case 2:
          _context2.next = 4;
          return regeneratorRuntime.awrap(mongoServer.stop());

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});
describe("Order API Integration Tests", function () {
  beforeEach(function _callee3() {
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(Order.deleteMany());

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    });
  });
  it("should create a new order via POST /api/orders", function _callee4() {
    var res;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return regeneratorRuntime.awrap(request(app).post("/api/orders").send({
              idOrder: "mock-id",
              userId: "123",
              products: ["product1", "product2"],
              total_amount: 100,
              delivery_address: "123 rue test",
              status: "En cours"
            }));

          case 2:
            res = _context4.sent;
            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty("idOrder", "mock-id");
            expect(res.body).toHaveProperty("products");

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    });
  });
  it("should fetch all orders via GET /api/orders", function _callee5() {
    var res;
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return regeneratorRuntime.awrap(Order.create({
              idOrder: "mock-id",
              userId: "123",
              products: ["product1", "product2"],
              total_amount: 100,
              delivery_address: "123 rue test",
              status: "En cours"
            }));

          case 2:
            _context5.next = 4;
            return regeneratorRuntime.awrap(request(app).get("/api/orders"));

          case 4:
            res = _context5.sent;
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveLength(1);

          case 7:
          case "end":
            return _context5.stop();
        }
      }
    });
  });
  it("should fetch a specific order via GET /api/orders/:id", function _callee6() {
    var order, res;
    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return regeneratorRuntime.awrap(Order.create({
              idOrder: "mock-id",
              userId: "123",
              products: ["product1"],
              total_amount: 50,
              delivery_address: "123 rue test",
              status: "En cours"
            }));

          case 2:
            order = _context6.sent;
            _context6.next = 5;
            return regeneratorRuntime.awrap(request(app).get("/api/orders/".concat(order._id)));

          case 5:
            res = _context6.sent;
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty("idOrder", "mock-id");

          case 8:
          case "end":
            return _context6.stop();
        }
      }
    });
  });
  it("should update an order via PUT /api/orders/:id", function _callee7() {
    var order, res;
    return regeneratorRuntime.async(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return regeneratorRuntime.awrap(Order.create({
              idOrder: "mock-id",
              userId: "123",
              products: ["product1"],
              total_amount: 50,
              delivery_address: "123 rue test",
              status: "En cours"
            }));

          case 2:
            order = _context7.sent;
            _context7.next = 5;
            return regeneratorRuntime.awrap(request(app).put("/api/orders/".concat(order._id)).send({
              status: "Completed"
            }));

          case 5:
            res = _context7.sent;
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty("status", "Completed");

          case 8:
          case "end":
            return _context7.stop();
        }
      }
    });
  });
  it("should delete an order via DELETE /api/orders/:id", function _callee8() {
    var order, res;
    return regeneratorRuntime.async(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return regeneratorRuntime.awrap(Order.create({
              idOrder: "mock-id",
              userId: "123",
              products: ["product1"],
              total_amount: 50,
              delivery_address: "123 rue test",
              status: "En cours"
            }));

          case 2:
            order = _context8.sent;
            _context8.next = 5;
            return regeneratorRuntime.awrap(request(app)["delete"]("/api/orders/".concat(order._id)));

          case 5:
            res = _context8.sent;
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty("message", "Order deleted successfully");

          case 8:
          case "end":
            return _context8.stop();
        }
      }
    });
  });
});