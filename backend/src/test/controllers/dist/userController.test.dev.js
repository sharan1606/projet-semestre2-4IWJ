"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var userController = require('../../../dist/controllers/userController');

var User = require('../../../dist/models/userModel')["default"];

var bcrypt = require('bcryptjs');

var crypto = require('crypto');

jest.mock('../../../dist/models/userModel');
jest.mock('bcryptjs');
jest.mock('crypto');
describe('User Controller', function () {
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
  describe('getAllUsers', function () {
    it('should fetch all users successfully', function _callee() {
      var mockUsers;
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              mockUsers = [{
                idUser: '1',
                email: 'test1@example.com',
                firstname: 'John',
                lastname: 'Doe'
              }, {
                idUser: '2',
                email: 'test2@example.com',
                firstname: 'Jane',
                lastname: 'Smith'
              }];
              User.find.mockResolvedValue(mockUsers);
              _context.next = 4;
              return regeneratorRuntime.awrap(userController.getAllUsers(mockRequest, mockResponse));

            case 4:
              expect(User.find).toHaveBeenCalled();
              expect(mockResponse.status).toHaveBeenCalledWith(200);
              expect(mockResponse.json).toHaveBeenCalledWith(mockUsers);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      });
    });
    it('should return 500 on server error', function _callee2() {
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              User.find.mockRejectedValue(new Error('Database error'));
              _context2.next = 3;
              return regeneratorRuntime.awrap(userController.getAllUsers(mockRequest, mockResponse));

            case 3:
              expect(mockResponse.status).toHaveBeenCalledWith(500);
              expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Erreur serveur',
                error: expect.any(Error)
              });

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      });
    });
  });
  describe('getUserById', function () {
    it('should fetch a user successfully', function _callee3() {
      var mockUser;
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              mockUser = {
                idUser: '1',
                email: 'test@example.com',
                firstname: 'John',
                lastname: 'Doe'
              };
              User.findById.mockResolvedValue(mockUser);
              mockRequest.params.id = '1';
              _context3.next = 5;
              return regeneratorRuntime.awrap(userController.getUserById(mockRequest, mockResponse));

            case 5:
              expect(User.findById).toHaveBeenCalledWith('1');
              expect(mockResponse.status).toHaveBeenCalledWith(200);
              expect(mockResponse.json).toHaveBeenCalledWith(mockUser);

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      });
    });
    it('should return 404 if user not found', function _callee4() {
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              User.findById.mockResolvedValue(null);
              mockRequest.params.id = '1';
              _context4.next = 4;
              return regeneratorRuntime.awrap(userController.getUserById(mockRequest, mockResponse));

            case 4:
              expect(User.findById).toHaveBeenCalledWith('1');
              expect(mockResponse.status).toHaveBeenCalledWith(404);
              expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Utilisateur non trouvé.'
              });

            case 7:
            case "end":
              return _context4.stop();
          }
        }
      });
    });
    it('should return 500 on server error', function _callee5() {
      return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              User.findById.mockRejectedValue(new Error('Database error'));
              mockRequest.params.id = '1';
              _context5.next = 4;
              return regeneratorRuntime.awrap(userController.getUserById(mockRequest, mockResponse));

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
  describe('createUser', function () {
    it('should create a new user successfully', function _callee6() {
      var mockCreatedUser;
      return regeneratorRuntime.async(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              mockRequest.body = {
                email: 'test@example.com',
                password: 'password123',
                firstname: 'John',
                lastname: 'Doe',
                address: '123 Main St',
                telephone: '1234567890'
              };
              User.findOne.mockResolvedValue(null);
              bcrypt.genSalt.mockResolvedValue('salt');
              bcrypt.hash.mockResolvedValue('hashedpassword');
              crypto.randomUUID.mockReturnValue('unique-id');
              mockCreatedUser = _objectSpread({
                idUser: 'unique-id'
              }, mockRequest.body, {
                password: 'hashedpassword'
              });
              User.prototype.save.mockResolvedValue(mockCreatedUser);
              _context6.next = 9;
              return regeneratorRuntime.awrap(userController.createUser(mockRequest, mockResponse));

            case 9:
              expect(User.findOne).toHaveBeenCalledWith({
                email: 'test@example.com'
              });
              expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
              expect(bcrypt.hash).toHaveBeenCalledWith('password123', 'salt');
              expect(User.prototype.save).toHaveBeenCalled();
              expect(mockResponse.status).toHaveBeenCalledWith(201);
              expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
                _id: expect.anything(),
                email: 'test@example.com',
                firstname: 'John',
                lastname: 'Doe'
              }));

            case 15:
            case "end":
              return _context6.stop();
          }
        }
      });
    });
    it('should return 400 if email is already in use', function _callee7() {
      return regeneratorRuntime.async(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              User.findOne.mockResolvedValue({
                email: 'test@example.com'
              });
              mockRequest.body.email = 'test@example.com';
              _context7.next = 4;
              return regeneratorRuntime.awrap(userController.createUser(mockRequest, mockResponse));

            case 4:
              expect(User.findOne).toHaveBeenCalledWith({
                email: 'test@example.com'
              });
              expect(mockResponse.status).toHaveBeenCalledWith(400);
              expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Email déjà utilisé.'
              });

            case 7:
            case "end":
              return _context7.stop();
          }
        }
      });
    });
  });
  describe('updateUser', function () {
    it('should update a user successfully', function _callee8() {
      var mockUser;
      return regeneratorRuntime.async(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              mockUser = {
                firstname: 'John',
                lastname: 'Doe',
                email: 'test@example.com',
                address: '123 Main St',
                telephone: '1234567890',
                save: jest.fn().mockResolvedValue(true)
              };
              User.findById.mockResolvedValue(mockUser);
              mockRequest.params.id = '1';
              mockRequest.body.firstname = 'Updated Name';
              _context8.next = 6;
              return regeneratorRuntime.awrap(userController.updateUser(mockRequest, mockResponse));

            case 6:
              expect(User.findById).toHaveBeenCalledWith('1');
              expect(mockUser.save).toHaveBeenCalled();
              expect(mockResponse.status).toHaveBeenCalledWith(200);
              expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
                email: 'test@example.com',
                firstname: 'Updated Name'
              }));

            case 10:
            case "end":
              return _context8.stop();
          }
        }
      });
    });
    it('should return 404 if user not found', function _callee9() {
      return regeneratorRuntime.async(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              User.findById.mockResolvedValue(null);
              mockRequest.params.id = '1';
              _context9.next = 4;
              return regeneratorRuntime.awrap(userController.updateUser(mockRequest, mockResponse));

            case 4:
              expect(User.findById).toHaveBeenCalledWith('1');
              expect(mockResponse.status).toHaveBeenCalledWith(404);
              expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Utilisateur non trouvé.'
              });

            case 7:
            case "end":
              return _context9.stop();
          }
        }
      });
    });
  });
  describe('deleteUser', function () {
    it('should delete a user successfully', function _callee10() {
      return regeneratorRuntime.async(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              User.findById.mockResolvedValue({});
              mockRequest.params.id = '1';
              _context10.next = 4;
              return regeneratorRuntime.awrap(userController.deleteUser(mockRequest, mockResponse));

            case 4:
              expect(User.findById).toHaveBeenCalledWith('1');
              expect(User.deleteOne).toHaveBeenCalledWith({
                _id: '1'
              });
              expect(mockResponse.status).toHaveBeenCalledWith(200);
              expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Utilisateur supprimé avec succès.'
              });

            case 8:
            case "end":
              return _context10.stop();
          }
        }
      });
    });
    it('should return 404 if user not found', function _callee11() {
      return regeneratorRuntime.async(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              User.findById.mockResolvedValue(null);
              mockRequest.params.id = '1';
              _context11.next = 4;
              return regeneratorRuntime.awrap(userController.deleteUser(mockRequest, mockResponse));

            case 4:
              expect(User.findById).toHaveBeenCalledWith('1');
              expect(mockResponse.status).toHaveBeenCalledWith(404);
              expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Utilisateur non trouvé.'
              });

            case 7:
            case "end":
              return _context11.stop();
          }
        }
      });
    });
  });
});