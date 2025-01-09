"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var request = require('supertest');

var app = require('../../server');

var User = require('../../../dist/models/userModel');

var bcryptjs = require('bcryptjs');

var jwt = require('jsonwebtoken');

var nodemailer = require('nodemailer');

jest.mock('../../../dist/models/userModel');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('nodemailer');
describe('Auth Controller', function () {
  afterEach(function () {
    jest.clearAllMocks();
  });
  it('POST /api/auth/register - should register a new user', function _callee() {
    var newUser, res;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            newUser = {
              email: 'test@example.com',
              password: 'password123',
              firstname: 'John',
              lastname: 'Doe',
              address: '123 Main St',
              telephone: '1234567890'
            };
            User.findOne.mockResolvedValue(null);
            bcryptjs.genSalt.mockResolvedValue('salt');
            bcryptjs.hash.mockResolvedValue('hashedpassword');
            User.prototype.save.mockResolvedValue(_objectSpread({}, newUser, {
              idUser: '12345',
              isVerified: false
            }));
            jwt.sign.mockReturnValue('generatedToken');
            nodemailer.createTransport.mockReturnValue({
              sendMail: jest.fn().mockResolvedValue(true)
            });
            _context.next = 9;
            return regeneratorRuntime.awrap(request(app).post('/api/auth/register').send(newUser));

          case 9:
            res = _context.sent;
            expect(res.statusCode).toBe(201);
            expect(res.body.message).toBe('Utilisateur créé avec succès. Veuillez confirmer votre email.');

          case 12:
          case "end":
            return _context.stop();
        }
      }
    });
  });
  it('POST /api/auth/register - should return error if user already exists', function _callee2() {
    var newUser, res;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            newUser = {
              email: 'test@example.com',
              password: 'password123',
              firstname: 'John',
              lastname: 'Doe',
              address: '123 Main St',
              telephone: '1234567890'
            };
            User.findOne.mockResolvedValue(newUser);
            _context2.next = 4;
            return regeneratorRuntime.awrap(request(app).post('/api/auth/register').send(newUser));

          case 4:
            res = _context2.sent;
            expect(res.statusCode).toBe(400);
            expect(res.body.message).toBe('Utilisateur déjà existant');

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
  it('POST /api/auth/login - should login a user', function _callee3() {
    var loginData, user, res;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            loginData = {
              email: 'test@example.com',
              password: 'password123'
            };
            user = {
              email: 'test@example.com',
              password: 'hashedpassword',
              isVerified: true,
              idUser: '12345',
              firstname: 'John',
              lastname: 'Doe'
            };
            User.findOne.mockResolvedValue(user);
            bcryptjs.compare.mockResolvedValue(true);
            jwt.sign.mockReturnValue('generatedToken');
            _context3.next = 7;
            return regeneratorRuntime.awrap(request(app).post('/api/auth/login').send(loginData));

          case 7:
            res = _context3.sent;
            expect(res.statusCode).toBe(200);
            expect(res.body.token).toBe('generatedToken');

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    });
  });
  it('POST /api/auth/login - should return error for incorrect password', function _callee4() {
    var loginData, user, res;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            loginData = {
              email: 'test@example.com',
              password: 'password123'
            };
            user = {
              email: 'test@example.com',
              password: 'hashedpassword',
              isVerified: true,
              idUser: '12345',
              firstname: 'John',
              lastname: 'Doe'
            };
            User.findOne.mockResolvedValue(user);
            bcryptjs.compare.mockResolvedValue(false);
            _context4.next = 6;
            return regeneratorRuntime.awrap(request(app).post('/api/auth/login').send(loginData));

          case 6:
            res = _context4.sent;
            expect(res.statusCode).toBe(400);
            expect(res.body.message).toBe('Email ou mot de passe incorrect.');

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    });
  });
  it('POST /api/auth/forgot-password - should send a reset password email', function _callee5() {
    var email, user, res;
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            email = {
              email: 'test@example.com'
            };
            user = {
              idUser: '12345',
              email: 'test@example.com'
            };
            User.findOne.mockResolvedValue(user);
            jwt.sign.mockReturnValue('generatedToken');
            nodemailer.createTransport.mockReturnValue({
              sendMail: jest.fn().mockResolvedValue(true)
            });
            _context5.next = 7;
            return regeneratorRuntime.awrap(request(app).post('/api/auth/forgot-password').send(email));

          case 7:
            res = _context5.sent;
            expect(res.statusCode).toBe(200);
            expect(res.body.message).toBe('Email de réinitialisation envoyé avec succès.');

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    });
  });
  it('POST /api/auth/forgot-password - should return error if user not found', function _callee6() {
    var email, res;
    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            email = {
              email: 'test@example.com'
            };
            User.findOne.mockResolvedValue(null);
            _context6.next = 4;
            return regeneratorRuntime.awrap(request(app).post('/api/auth/forgot-password').send(email));

          case 4:
            res = _context6.sent;
            expect(res.statusCode).toBe(404);
            expect(res.body.message).toBe('Utilisateur non trouvé.');

          case 7:
          case "end":
            return _context6.stop();
        }
      }
    });
  });
  it('POST /api/auth/reset-password/:token - should reset password', function _callee7() {
    var token, newPassword, res;
    return regeneratorRuntime.async(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            token = 'validToken';
            newPassword = {
              newPassword: 'newpassword123'
            };
            jwt.verify.mockReturnValue({
              id: '12345'
            });
            User.findOne.mockResolvedValue({
              idUser: '12345',
              password: 'hashedpassword',
              save: jest.fn().mockResolvedValue(true)
            });
            bcryptjs.genSalt.mockResolvedValue('salt');
            bcryptjs.hash.mockResolvedValue('newhashedpassword');
            _context7.next = 8;
            return regeneratorRuntime.awrap(request(app).post("/api/auth/reset-password/".concat(token)).send(newPassword));

          case 8:
            res = _context7.sent;
            expect(res.statusCode).toBe(200);
            expect(res.body.message).toBe('Mot de passe réinitialisé avec succès.');

          case 11:
          case "end":
            return _context7.stop();
        }
      }
    });
  });
  it('POST /api/auth/reset-password/:token - should return error if link is invalid', function _callee8() {
    var token, newPassword, res;
    return regeneratorRuntime.async(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            token = 'invalidToken';
            newPassword = {
              newPassword: 'newpassword123'
            };
            jwt.verify.mockImplementation(function () {
              throw new Error('Invalid token');
            });
            _context8.next = 5;
            return regeneratorRuntime.awrap(request(app).post("/api/auth/reset-password/".concat(token)).send(newPassword));

          case 5:
            res = _context8.sent;
            expect(res.statusCode).toBe(400);
            expect(res.body.message).toBe('Lien invalide ou expiré.');

          case 8:
          case "end":
            return _context8.stop();
        }
      }
    });
  });
  it('POST /api/auth/confirm-email/:token - should confirm email', function _callee9() {
    var token, decoded, res;
    return regeneratorRuntime.async(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            token = 'validToken';
            decoded = {
              id: '12345'
            };
            jwt.verify.mockReturnValue(decoded);
            User.findOne.mockResolvedValue({
              idUser: '12345',
              isVerified: false,
              save: jest.fn().mockResolvedValue(true)
            });
            _context9.next = 6;
            return regeneratorRuntime.awrap(request(app).post("/api/auth/confirm-email/".concat(token)));

          case 6:
            res = _context9.sent;
            expect(res.statusCode).toBe(200);
            expect(res.body.message).toBe('Email confirmé avec succès.');

          case 9:
          case "end":
            return _context9.stop();
        }
      }
    });
  });
  it('POST /api/auth/confirm-email/:token - should return error if email already confirmed', function _callee10() {
    var token, decoded, res;
    return regeneratorRuntime.async(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            token = 'validToken';
            decoded = {
              id: '12345'
            };
            jwt.verify.mockReturnValue(decoded);
            User.findOne.mockResolvedValue({
              idUser: '12345',
              isVerified: true
            });
            _context10.next = 6;
            return regeneratorRuntime.awrap(request(app).post("/api/auth/confirm-email/".concat(token)));

          case 6:
            res = _context10.sent;
            expect(res.statusCode).toBe(400);
            expect(res.body.message).toBe('Email déjà confirmé.');

          case 9:
          case "end":
            return _context10.stop();
        }
      }
    });
  });
});