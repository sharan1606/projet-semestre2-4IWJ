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
});