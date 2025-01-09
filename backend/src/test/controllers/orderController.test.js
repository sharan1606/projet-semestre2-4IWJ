const orderController = require('../../../dist/controllers/orderController');
const Order = require('../../../dist/models/orderModel').default;

jest.mock('../../../dist/models/orderModel');

describe('Order Controller', () => {
  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createOrder', () => {
    beforeEach(() => {
      mockRequest = {
        body: {
          idUser: '123',
          total_amount: 100,
          delivery_address: '123 rue test',
          status: 'En cours'
        }
      };
    });

    it('should create a new order successfully', async () => {
      const mockCreatedOrder = {
        idOrder: 'mock-uuid',
        ...mockRequest.body,
      };

      const mockOrderInstance = {
        save: jest.fn().mockResolvedValue(mockCreatedOrder)
      };
      
      Order.mockImplementation(() => mockOrderInstance);

      await orderController.createOrder(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(mockCreatedOrder);
    });

    it('should return 500 if order creation fails', async () => {
      const mockOrderInstance = {
        save: jest.fn().mockRejectedValue(new Error('Database Error'))
      };
      
      Order.mockImplementation(() => mockOrderInstance);

      await orderController.createOrder(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Erreur serveur',
        error: expect.any(Error)
      });
    });
  });

  describe('getAllOrders', () => {
    it('should fetch all orders successfully', async () => {
      const mockOrders = [
        { idUser: '123', total_amount: 100, delivery_address: '123 rue test' }
      ];

      Order.find = jest.fn().mockResolvedValue(mockOrders);

      await orderController.getAllOrders(mockRequest, mockResponse);

      expect(Order.find).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockOrders);
    });

    it('should return 500 if fetching orders fails', async () => {
      Order.find = jest.fn().mockRejectedValue(new Error('Database Error'));

      await orderController.getAllOrders(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Erreur serveur',
        error: expect.any(Error)
      });
    });
  });
  describe('deleteOrder', () => {
    beforeEach(() => {
      mockRequest = {
        params: {
          id: 'mock-id',
        },
      };
    });

    it('should delete an order successfully', async () => {
      const mockOrder = {
        deleteOne: jest.fn().mockResolvedValue(),
      };

      Order.findById = jest.fn().mockResolvedValue(mockOrder);

      await orderController.deleteOrder(mockRequest, mockResponse);

      expect(Order.findById).toHaveBeenCalledWith('mock-id');
      expect(mockOrder.deleteOne).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Commande supprimée avec succès.',
      });
    });

    it('should return 404 if order is not found', async () => {
      Order.findById = jest.fn().mockResolvedValue(null);

      await orderController.deleteOrder(mockRequest, mockResponse);

      expect(Order.findById).toHaveBeenCalledWith('mock-id');
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Commande non trouvée.',
      });
    });

    it('should return 500 if deletion fails', async () => {
      Order.findById = jest.fn().mockRejectedValue(new Error('Database Error'));

      await orderController.deleteOrder(mockRequest, mockResponse);

      expect(Order.findById).toHaveBeenCalledWith('mock-id');
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Erreur serveur',
        error: expect.any(Error),
      });
    });
  });
  describe('updateOrder', () => {
    beforeEach(() => {
      mockRequest = {
        params: {
          id: 'mock-id',
        },
        body: {
          total_amount: 150,
          delivery_address: '456 rue test',
          status: 'Livré',
        },
      };
    });

    it('should update an order successfully', async () => {
      const mockOrder = {
        total_amount: 100,
        delivery_address: '123 rue test',
        status: 'En cours',
        save: jest.fn().mockResolvedValue({
          total_amount: 150,
          delivery_address: '456 rue test',
          status: 'Livré',
        }),
      };

      Order.findById = jest.fn().mockResolvedValue(mockOrder);

      await orderController.updateOrder(mockRequest, mockResponse);

      expect(Order.findById).toHaveBeenCalledWith('mock-id');
      expect(mockOrder.save).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        total_amount: 150,
        delivery_address: '456 rue test',
        status: 'Livré',
      });
    });

    it('should return 404 if order is not found', async () => {
      Order.findById = jest.fn().mockResolvedValue(null);

      await orderController.updateOrder(mockRequest, mockResponse);

      expect(Order.findById).toHaveBeenCalledWith('mock-id');
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Commande non trouvée.',
      });
    });

    it('should return 500 if update fails', async () => {
      Order.findById = jest.fn().mockRejectedValue(new Error('Database Error'));

      await orderController.updateOrder(mockRequest, mockResponse);

      expect(Order.findById).toHaveBeenCalledWith('mock-id');
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Erreur serveur',
        error: expect.any(Error),
      });
    });
  });
  describe('getOrderById', () => {
    beforeEach(() => {
      mockRequest = {
        params: {
          id: 'mock-id',
        },
      };
    });

    it('should fetch an order successfully', async () => {
      const mockOrder = {
        idUser: '123',
        total_amount: 100,
        delivery_address: '123 rue test',
        status: 'En cours',
      };

      Order.findById = jest.fn().mockResolvedValue(mockOrder);

      await orderController.getOrderById(mockRequest, mockResponse);

      expect(Order.findById).toHaveBeenCalledWith('mock-id');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockOrder);
    });

    it('should return 404 if order is not found', async () => {
      Order.findById = jest.fn().mockResolvedValue(null);

      await orderController.getOrderById(mockRequest, mockResponse);

      expect(Order.findById).toHaveBeenCalledWith('mock-id');
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Commande non trouvée.',
      });
    });

    it('should return 500 if fetching the order fails', async () => {
      Order.findById = jest.fn().mockRejectedValue(new Error('Database Error'));

      await orderController.getOrderById(mockRequest, mockResponse);

      expect(Order.findById).toHaveBeenCalledWith('mock-id');
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Erreur serveur',
        error: expect.any(Error),
      });
    });
  });
});