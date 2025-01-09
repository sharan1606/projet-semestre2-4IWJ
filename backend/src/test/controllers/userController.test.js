const userController = require('../../../dist/controllers/userController');
const User = require('../../../dist/models/userModel').default;
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

jest.mock('../../../dist/models/userModel');
jest.mock('bcryptjs');
jest.mock('crypto');

describe('User Controller', () => {
  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    mockRequest = {
      params: {},
      body: {},
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllUsers', () => {
    it('should fetch all users successfully', async () => {
      const mockUsers = [
        { idUser: '1', email: 'test1@example.com', firstname: 'John', lastname: 'Doe' },
        { idUser: '2', email: 'test2@example.com', firstname: 'Jane', lastname: 'Smith' },
      ];

      User.find.mockResolvedValue(mockUsers);

      await userController.getAllUsers(mockRequest, mockResponse);

      expect(User.find).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockUsers);
    });

    it('should return 500 on server error', async () => {
      User.find.mockRejectedValue(new Error('Database error'));

      await userController.getAllUsers(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Erreur serveur', error: expect.any(Error) });
    });
  });

  describe('getUserById', () => {
    it('should fetch a user successfully', async () => {
      const mockUser = { idUser: '1', email: 'test@example.com', firstname: 'John', lastname: 'Doe' };

      User.findById.mockResolvedValue(mockUser);
      mockRequest.params.id = '1';

      await userController.getUserById(mockRequest, mockResponse);

      expect(User.findById).toHaveBeenCalledWith('1');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockUser);
    });

    it('should return 404 if user not found', async () => {
      User.findById.mockResolvedValue(null);
      mockRequest.params.id = '1';

      await userController.getUserById(mockRequest, mockResponse);

      expect(User.findById).toHaveBeenCalledWith('1');
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Utilisateur non trouvé.' });
    });

    it('should return 500 on server error', async () => {
      User.findById.mockRejectedValue(new Error('Database error'));
      mockRequest.params.id = '1';

      await userController.getUserById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Erreur serveur', error: expect.any(Error) });
    });
  });

  describe('createUser', () => {
    it('should create a new user successfully', async () => {
      mockRequest.body = {
        email: 'test@example.com',
        password: 'password123',
        firstname: 'John',
        lastname: 'Doe',
        address: '123 Main St',
        telephone: '1234567890',
      };

      User.findOne.mockResolvedValue(null);
      bcrypt.genSalt.mockResolvedValue('salt');
      bcrypt.hash.mockResolvedValue('hashedpassword');
      crypto.randomUUID.mockReturnValue('unique-id');
      const mockCreatedUser = { idUser: 'unique-id', ...mockRequest.body, password: 'hashedpassword' };
      User.prototype.save.mockResolvedValue(mockCreatedUser);

      await userController.createUser(mockRequest, mockResponse);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 'salt');
      expect(User.prototype.save).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
        _id: expect.anything(),
        email: 'test@example.com',
        firstname: 'John',
        lastname: 'Doe',
      }));
    });

    it('should return 400 if email is already in use', async () => {
      User.findOne.mockResolvedValue({ email: 'test@example.com' });
      mockRequest.body.email = 'test@example.com';

      await userController.createUser(mockRequest, mockResponse);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Email déjà utilisé.' });
    });
  });

  describe('updateUser', () => {
    it('should update a user successfully', async () => {
      const mockUser = {
        firstname: 'John',
        lastname: 'Doe',
        email: 'test@example.com',
        address: '123 Main St',
        telephone: '1234567890',
        save: jest.fn().mockResolvedValue(true),
      };

      User.findById.mockResolvedValue(mockUser);
      mockRequest.params.id = '1';
      mockRequest.body.firstname = 'Updated Name';

      await userController.updateUser(mockRequest, mockResponse);

      expect(User.findById).toHaveBeenCalledWith('1');
      expect(mockUser.save).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
        email: 'test@example.com',
        firstname: 'Updated Name',
      }));
    });

    it('should return 404 if user not found', async () => {
      User.findById.mockResolvedValue(null);
      mockRequest.params.id = '1';

      await userController.updateUser(mockRequest, mockResponse);

      expect(User.findById).toHaveBeenCalledWith('1');
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Utilisateur non trouvé.' });
    });
  });

  describe('deleteUser', () => {
    it('should delete a user successfully', async () => {
      User.findById.mockResolvedValue({});
      mockRequest.params.id = '1';

      await userController.deleteUser(mockRequest, mockResponse);

      expect(User.findById).toHaveBeenCalledWith('1');
      expect(User.deleteOne).toHaveBeenCalledWith({ _id: '1' });
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Utilisateur supprimé avec succès.' });
    });

    it('should return 404 if user not found', async () => {
      User.findById.mockResolvedValue(null);
      mockRequest.params.id = '1';

      await userController.deleteUser(mockRequest, mockResponse);

      expect(User.findById).toHaveBeenCalledWith('1');
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Utilisateur non trouvé.' });
    });
  });
});
