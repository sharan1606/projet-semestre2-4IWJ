const request = require('supertest');
const app = require('../../server'); 

const User = require('../../../dist/models/userModel'); 
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

jest.mock('../../../dist/models/userModel');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('nodemailer');

describe('Auth Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('POST /api/auth/register - should register a new user', async () => {
        const newUser = {
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
        User.prototype.save.mockResolvedValue({
            ...newUser,
            idUser: '12345',
            isVerified: false,
        });
        jwt.sign.mockReturnValue('generatedToken');
        nodemailer.createTransport.mockReturnValue({
            sendMail: jest.fn().mockResolvedValue(true),
        });

        const res = await request(app).post('/api/auth/register').send(newUser);

        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('Utilisateur créé avec succès. Veuillez confirmer votre email.');
    });

    it('POST /api/auth/register - should return error if user already exists', async () => {
        const newUser = {
            email: 'test@example.com',
            password: 'password123',
            firstname: 'John',
            lastname: 'Doe',
            address: '123 Main St',
            telephone: '1234567890'
        };

        User.findOne.mockResolvedValue(newUser); 

        const res = await request(app).post('/api/auth/register').send(newUser);

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe('Utilisateur déjà existant');
    });

    it('POST /api/auth/login - should login a user', async () => {
        const loginData = { email: 'test@example.com', password: 'password123' };
        const user = {
            email: 'test@example.com',
            password: 'hashedpassword',
            isVerified: true,
            idUser: '12345',
            firstname: 'John',
            lastname: 'Doe',
        };

        User.findOne.mockResolvedValue(user);
        bcryptjs.compare.mockResolvedValue(true);
        jwt.sign.mockReturnValue('generatedToken');

        const res = await request(app).post('/api/auth/login').send(loginData);

        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBe('generatedToken');
    });

    it('POST /api/auth/login - should return error for incorrect password', async () => {
        const loginData = { email: 'test@example.com', password: 'password123' };
        const user = {
            email: 'test@example.com',
            password: 'hashedpassword',
            isVerified: true,
            idUser: '12345',
            firstname: 'John',
            lastname: 'Doe',
        };

        User.findOne.mockResolvedValue(user);
        bcryptjs.compare.mockResolvedValue(false);

        const res = await request(app).post('/api/auth/login').send(loginData);

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe('Email ou mot de passe incorrect.');
    });

    it('POST /api/auth/forgot-password - should send a reset password email', async () => {
        const email = { email: 'test@example.com' };
        const user = { idUser: '12345', email: 'test@example.com' };

        User.findOne.mockResolvedValue(user);
        jwt.sign.mockReturnValue('generatedToken');
        nodemailer.createTransport.mockReturnValue({
            sendMail: jest.fn().mockResolvedValue(true),
        });

        const res = await request(app).post('/api/auth/forgot-password').send(email);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Email de réinitialisation envoyé avec succès.');
    });

    it('POST /api/auth/forgot-password - should return error if user not found', async () => {
        const email = { email: 'test@example.com' };

        User.findOne.mockResolvedValue(null);

        const res = await request(app).post('/api/auth/forgot-password').send(email);

        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe('Utilisateur non trouvé.');
    });

    it('POST /api/auth/reset-password/:token - should reset password', async () => {
        const token = 'validToken';
        const newPassword = { newPassword: 'newpassword123' };

        jwt.verify.mockReturnValue({ id: '12345' });
        User.findOne.mockResolvedValue({
            idUser: '12345',
            password: 'hashedpassword',
            save: jest.fn().mockResolvedValue(true),
        });
        bcryptjs.genSalt.mockResolvedValue('salt');
        bcryptjs.hash.mockResolvedValue('newhashedpassword');

        const res = await request(app).post(`/api/auth/reset-password/${token}`).send(newPassword);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Mot de passe réinitialisé avec succès.');
    });

    it('POST /api/auth/reset-password/:token - should return error if link is invalid', async () => {
        const token = 'invalidToken';
        const newPassword = { newPassword: 'newpassword123' };

        jwt.verify.mockImplementation(() => { throw new Error('Invalid token'); });

        const res = await request(app).post(`/api/auth/reset-password/${token}`).send(newPassword);

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe('Lien invalide ou expiré.');
    });

    it('POST /api/auth/confirm-email/:token - should confirm email', async () => {
        const token = 'validToken';
        const decoded = { id: '12345' };

        jwt.verify.mockReturnValue(decoded);
        User.findOne.mockResolvedValue({
            idUser: '12345',
            isVerified: false,
            save: jest.fn().mockResolvedValue(true),
        });

        const res = await request(app).post(`/api/auth/confirm-email/${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Email confirmé avec succès.');
    });

    it('POST /api/auth/confirm-email/:token - should return error if email already confirmed', async () => {
        const token = 'validToken';
        const decoded = { id: '12345' };

        jwt.verify.mockReturnValue(decoded);
        User.findOne.mockResolvedValue({
            idUser: '12345',
            isVerified: true,
        });

        const res = await request(app).post(`/api/auth/confirm-email/${token}`);

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe('Email déjà confirmé.');
    });
});
