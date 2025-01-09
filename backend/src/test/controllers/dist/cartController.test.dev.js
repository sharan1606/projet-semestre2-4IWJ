"use strict";

var Cart = require("../../../dist/models/cartModel")["default"];

var Product = require("../../../dist/models/productModel")["default"];

var cartController = require("../../../dist/controllers/cartController");

jest.mock("../../../dist/models/cartModel");
jest.mock("../../../dist/models/productModel");
describe("Cart Controller", function () {
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
  describe("addToCart", function () {
    it("should add a product to the cart", function _callee() {
      var mockProduct, mockCart;
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              mockRequest.body = {
                idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2",
                idProduct: "cbb1d8b3-9f59-40f5-aa42-83ffdbca5949",
                quantity: 2
              };
              mockProduct = {
                idProduct: "cbb1d8b3-9f59-40f5-aa42-83ffdbca5949",
                price: 50
              };
              Product.findOne.mockResolvedValue(mockProduct);
              mockCart = {
                idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2",
                items: [],
                total: 0,
                save: jest.fn().mockResolvedValue(true)
              };
              Cart.findOne.mockResolvedValue(null);
              Cart.mockImplementation(function () {
                return mockCart;
              });
              _context.next = 8;
              return regeneratorRuntime.awrap(cartController.addToCart(mockRequest, mockResponse));

            case 8:
              expect(Product.findOne).toHaveBeenCalledWith({
                idProduct: "cbb1d8b3-9f59-40f5-aa42-83ffdbca5949"
              });
              expect(Cart.findOne).toHaveBeenCalledWith({
                idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2"
              });
              expect(mockCart.save).toHaveBeenCalled();
              expect(mockResponse.status).toHaveBeenCalledWith(200);
              expect(mockResponse.json).toHaveBeenCalledWith(mockCart);

            case 13:
            case "end":
              return _context.stop();
          }
        }
      });
    });
    it("should return 404 if product is not found", function _callee2() {
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              mockRequest.body = {
                idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2",
                idProduct: "cbb1d8b3-9f59-40f5-aa42-83ffdbca5949",
                quantity: 2
              };
              Product.findOne.mockResolvedValue(null);
              _context2.next = 4;
              return regeneratorRuntime.awrap(cartController.addToCart(mockRequest, mockResponse));

            case 4:
              expect(Product.findOne).toHaveBeenCalledWith({
                idProduct: "cbb1d8b3-9f59-40f5-aa42-83ffdbca5949"
              });
              expect(mockResponse.status).toHaveBeenCalledWith(404);
              expect(mockResponse.json).toHaveBeenCalledWith({
                message: "Produit non trouvé."
              });

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      });
    });
    it("should return 500 on server error", function _callee3() {
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              mockRequest.body = {
                idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2",
                idProduct: "cbb1d8b3-9f59-40f5-aa42-83ffdbca5949",
                quantity: 2
              };
              Product.findOne.mockRejectedValue(new Error("Database error"));
              _context3.next = 4;
              return regeneratorRuntime.awrap(cartController.addToCart(mockRequest, mockResponse));

            case 4:
              expect(Product.findOne).toHaveBeenCalledWith({
                idProduct: "cbb1d8b3-9f59-40f5-aa42-83ffdbca5949"
              });
              expect(mockResponse.status).toHaveBeenCalledWith(500);
              expect(mockResponse.json).toHaveBeenCalledWith({
                message: "Erreur serveur",
                error: expect.any(Error)
              });

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      });
    });
  });
  describe("getCart", function () {
    it("should return the cart with populated items", function _callee4() {
      var mockCart, mockProduct;
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              mockRequest.params = {
                idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2"
              };
              mockCart = {
                idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2",
                items: [{
                  idProduct: "cbb1d8b3-9f59-40f5-aa42-83ffdbca5949",
                  quantity: 2
                }],
                total: 100
              };
              mockProduct = {
                idProduct: "cbb1d8b3-9f59-40f5-aa42-83ffdbca5949",
                name: "Product 1",
                price: 50,
                image: "product1.jpg"
              };
              Cart.findOne.mockResolvedValue(mockCart);
              Product.findOne.mockResolvedValue(mockProduct);
              _context4.next = 7;
              return regeneratorRuntime.awrap(cartController.getCart(mockRequest, mockResponse));

            case 7:
              expect(Cart.findOne).toHaveBeenCalledWith({
                idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2"
              });
              expect(Product.findOne).toHaveBeenCalledWith({
                idProduct: "cbb1d8b3-9f59-40f5-aa42-83ffdbca5949"
              });
              expect(mockResponse.status).toHaveBeenCalledWith(200);
              expect(mockResponse.json).toHaveBeenCalledWith({
                idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2",
                items: [{
                  idProduct: "cbb1d8b3-9f59-40f5-aa42-83ffdbca5949",
                  quantity: 2,
                  name: "Product 1",
                  price: 50,
                  image: "product1.jpg"
                }],
                total: 100
              });

            case 11:
            case "end":
              return _context4.stop();
          }
        }
      });
    });
    it("should return 404 if cart is not found", function _callee5() {
      return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              mockRequest.params = {
                idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2"
              };
              Cart.findOne.mockResolvedValue(null);
              _context5.next = 4;
              return regeneratorRuntime.awrap(cartController.getCart(mockRequest, mockResponse));

            case 4:
              expect(Cart.findOne).toHaveBeenCalledWith({
                idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2"
              });
              expect(mockResponse.status).toHaveBeenCalledWith(404);
              expect(mockResponse.json).toHaveBeenCalledWith({
                message: "Panier non trouvé."
              });

            case 7:
            case "end":
              return _context5.stop();
          }
        }
      });
    });
    it("should return 500 on server error", function _callee6() {
      return regeneratorRuntime.async(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              mockRequest.params = {
                idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2"
              };
              Cart.findOne.mockRejectedValue(new Error("Database error"));
              _context6.next = 4;
              return regeneratorRuntime.awrap(cartController.getCart(mockRequest, mockResponse));

            case 4:
              expect(Cart.findOne).toHaveBeenCalledWith({
                idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2"
              });
              expect(mockResponse.status).toHaveBeenCalledWith(500);
              expect(mockResponse.json).toHaveBeenCalledWith({
                message: "Erreur serveur",
                error: expect.any(Error)
              });

            case 7:
            case "end":
              return _context6.stop();
          }
        }
      });
    });
  });
  describe("updateCartItem", function () {
    it("should update the quantity of an item in the cart", function _callee7() {
      var mockCart, mockProduct;
      return regeneratorRuntime.async(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              mockRequest.body = {
                idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2",
                idProduct: "cbb1d8b3-9f59-40f5-aa42-83ffdbca5949",
                quantity: 3
              };
              mockCart = {
                idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2",
                items: [{
                  idProduct: "cbb1d8b3-9f59-40f5-aa42-83ffdbca5949",
                  quantity: 2
                }],
                save: jest.fn().mockResolvedValue(true)
              };
              mockProduct = {
                idProduct: "cbb1d8b3-9f59-40f5-aa42-83ffdbca5949",
                price: 50
              };
              Cart.findOne.mockResolvedValue(mockCart);
              Product.findOne.mockResolvedValue(mockProduct);
              _context7.next = 7;
              return regeneratorRuntime.awrap(cartController.updateCartItem(mockRequest, mockResponse));

            case 7:
              expect(Cart.findOne).toHaveBeenCalledWith({
                idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2"
              });
              expect(mockCart.save).toHaveBeenCalled();
              expect(mockResponse.status).toHaveBeenCalledWith(200);
              expect(mockResponse.json).toHaveBeenCalledWith(mockCart);

            case 11:
            case "end":
              return _context7.stop();
          }
        }
      });
    });
    it("should return 404 if cart is not found", function _callee8() {
      return regeneratorRuntime.async(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              mockRequest.body = {
                idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2",
                idProduct: "cbb1d8b3-9f59-40f5-aa42-83ffdbca5949",
                quantity: 3
              };
              Cart.findOne.mockResolvedValue(null);
              _context8.next = 4;
              return regeneratorRuntime.awrap(cartController.updateCartItem(mockRequest, mockResponse));

            case 4:
              expect(Cart.findOne).toHaveBeenCalledWith({
                idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2"
              });
              expect(mockResponse.status).toHaveBeenCalledWith(404);
              expect(mockResponse.json).toHaveBeenCalledWith({
                message: "Panier non trouvé."
              });

            case 7:
            case "end":
              return _context8.stop();
          }
        }
      });
    });
  });
  describe("removeFromCart", function () {
    it("should remove an item from the cart", function _callee9() {
      var mockCart;
      return regeneratorRuntime.async(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              mockRequest.body = {
                idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2",
                idProduct: "cbb1d8b3-9f59-40f5-aa42-83ffdbca5949"
              };
              mockCart = {
                idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2",
                items: [{
                  idProduct: "cbb1d8b3-9f59-40f5-aa42-83ffdbca5949",
                  quantity: 2
                }],
                save: jest.fn().mockResolvedValue(true)
              };
              Cart.findOne.mockResolvedValue(mockCart);
              _context9.next = 5;
              return regeneratorRuntime.awrap(cartController.removeFromCart(mockRequest, mockResponse));

            case 5:
              expect(Cart.findOne).toHaveBeenCalledWith({
                idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2"
              });
              expect(mockCart.save).toHaveBeenCalled();
              expect(mockResponse.status).toHaveBeenCalledWith(200);
              expect(mockResponse.json).toHaveBeenCalledWith(mockCart);

            case 9:
            case "end":
              return _context9.stop();
          }
        }
      });
    });
    it("should return 404 if cart is not found", function _callee10() {
      return regeneratorRuntime.async(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              mockRequest.body = {
                idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2",
                idProduct: "cbb1d8b3-9f59-40f5-aa42-83ffdbca5949"
              };
              Cart.findOne.mockResolvedValue(null);
              _context10.next = 4;
              return regeneratorRuntime.awrap(cartController.removeFromCart(mockRequest, mockResponse));

            case 4:
              expect(Cart.findOne).toHaveBeenCalledWith({
                idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2"
              });
              expect(mockResponse.status).toHaveBeenCalledWith(404);
              expect(mockResponse.json).toHaveBeenCalledWith({
                message: "Panier non trouvé."
              });

            case 7:
            case "end":
              return _context10.stop();
          }
        }
      });
    });
  });
  describe("clearCart", function () {
    it("should clear all items in the cart", function _callee11() {
      var mockCart;
      return regeneratorRuntime.async(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              mockRequest.params = {
                idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2"
              };
              mockCart = {
                idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2",
                items: [{
                  idProduct: "cbb1d8b3-9f59-40f5-aa42-83ffdbca5949",
                  quantity: 2
                }],
                save: jest.fn().mockResolvedValue(true)
              };
              Cart.findOne.mockResolvedValue(mockCart);
              _context11.next = 5;
              return regeneratorRuntime.awrap(cartController.clearCart(mockRequest, mockResponse));

            case 5:
              expect(Cart.findOne).toHaveBeenCalledWith({
                idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2"
              });
              expect(mockCart.save).toHaveBeenCalled();
              expect(mockResponse.status).toHaveBeenCalledWith(200);
              expect(mockResponse.json).toHaveBeenCalledWith({
                message: "Panier vidé avec succès."
              });

            case 9:
            case "end":
              return _context11.stop();
          }
        }
      });
    });
    it("should return 404 if cart is not found", function _callee12() {
      return regeneratorRuntime.async(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              mockRequest.params = {
                idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2"
              };
              Cart.findOne.mockResolvedValue(null);
              _context12.next = 4;
              return regeneratorRuntime.awrap(cartController.clearCart(mockRequest, mockResponse));

            case 4:
              expect(Cart.findOne).toHaveBeenCalledWith({
                idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2"
              });
              expect(mockResponse.status).toHaveBeenCalledWith(404);
              expect(mockResponse.json).toHaveBeenCalledWith({
                message: "Panier non trouvé."
              });

            case 7:
            case "end":
              return _context12.stop();
          }
        }
      });
    });
  });
});