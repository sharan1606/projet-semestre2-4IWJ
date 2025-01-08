const request = require('supertest');
const app = require('../../../dist/server');
const authController = require('../controllers/authController');
jest.mock('../controllers/authController'); 

describe('Auth Routes', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('POST /api/auth/register - should call registerUser and return success', async () => {
        const newUser = {
            email: 'test@example.com',
            password: 'password123',
            firstname: 'John',
            lastname: 'Doe',
            address: '123 Main St',
            telephone: '1234567890'
        };

        authController.registerUser.mockResolvedValue({
            statusCode: 201,
            body: { message: 'Utilisateur créé avec succès. Veuillez confirmer votre email.' }
        });

        const res = await request(app).post('/api/auth/register').send(newUser);

        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('Utilisateur créé avec succès. Veuillez confirmer votre email.');
        expect(authController.registerUser).toHaveBeenCalled();
    });

    it('POST /api/auth/login - should call loginUser and return token', async () => {
        const loginData = { email: 'test@example.com', password: 'password123' };

        authController.loginUser.mockResolvedValue({
            statusCode: 200,
            body: { token: 'generatedToken' }
        });

        const res = await request(app).post('/api/auth/login').send(loginData);

        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBe('generatedToken');
        expect(authController.loginUser).toHaveBeenCalled();
    });

    it('GET /api/auth/confirm/:token - should call confirmEmail and return success', async () => {
        const token = 'validToken';

        authController.confirmEmail.mockResolvedValue({
            statusCode: 200,
            body: { message: 'Email confirmé avec succès.' }
        });

        const res = await request(app).get(`/api/auth/confirm/${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Email confirmé avec succès.');
        expect(authController.confirmEmail).toHaveBeenCalled();
    });

    it('POST /api/auth/forgot-password - should call forgotPassword and return success', async () => {
        const email = { email: 'test@example.com' };

        authController.forgotPassword.mockResolvedValue({
            statusCode: 200,
            body: { message: 'Email de réinitialisation envoyé avec succès.' }
        });

        const res = await request(app).post('/api/auth/forgot-password').send(email);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Email de réinitialisation envoyé avec succès.');
        expect(authController.forgotPassword).toHaveBeenCalled();
    });

    it('POST /api/auth/reset-password/:token - should call resetPassword and return success', async () => {
        const token = 'validToken';
        const newPassword = { newPassword: 'newpassword123' };

        authController.resetPassword.mockResolvedValue({
            statusCode: 200,
            body: { message: 'Mot de passe réinitialisé avec succès.' }
        });

        const res = await request(app).post(`/api/auth/reset-password/${token}`).send(newPassword);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Mot de passe réinitialisé avec succès.');
        expect(authController.resetPassword).toHaveBeenCalled();
    });
});