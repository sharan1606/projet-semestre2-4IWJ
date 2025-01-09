const productController = require('../../../dist/controllers/productController');
const Product = require('../../../dist/models/productModel').default;


jest.mock('../../../dist/models/productModel', () => {
    const mockConstructor = jest.fn();
    return {
      default: Object.assign(mockConstructor, {
        find: jest.fn(),
        findOne: jest.fn(),
        deleteOne: jest.fn()
      })
    };
  });
  
describe('Product Controller', () => {
  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    mockRequest = {
      params: {},
      body: {}
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllProducts', () => {
    it('should handle errors in getAllProducts', async () => {
      Product.find.mockRejectedValue(new Error('Database error'));

      await productController.getAllProducts(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Erreur serveur',
        error: expect.any(Error)
      });
    });

    it('should fetch all products successfully', async () => {
      const mockProducts = [{
        idProduct: 'test-uuid',
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99,
        stock: 10,
        brand: 'Test Brand',
        category: 'Test Category',
        image: 'test.jpg',
        date_add: new Date()
      }];

      Product.find.mockResolvedValue(mockProducts);

      await productController.getAllProducts(mockRequest, mockResponse);

      expect(Product.find).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockProducts);
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product successfully', async () => {
      mockRequest.params = { id: 'test-uuid' };
      
      Product.findOne.mockResolvedValue({
        idProduct: 'test-uuid',
        name: 'Test Product'
      });
      
      Product.deleteOne.mockResolvedValue({ deletedCount: 1 });

      await productController.deleteProduct(mockRequest, mockResponse);

      expect(Product.findOne).toHaveBeenCalledWith({ idProduct: 'test-uuid' });
      expect(Product.deleteOne).toHaveBeenCalledWith({ idProduct: 'test-uuid' });
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Produit supprimé avec succès.'
      });
    });

    it('should return 404 if product not found', async () => {
      mockRequest.params = { id: 'nonexistent-id' };
      
      Product.findOne.mockResolvedValue(null);

      await productController.deleteProduct(mockRequest, mockResponse);

      expect(Product.findOne).toHaveBeenCalledWith({ idProduct: 'nonexistent-id' });
      expect(Product.deleteOne).not.toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Produit non trouvé.'
      });
    });

    it('should return 500 if deletion fails', async () => {
      mockRequest.params = { id: 'test-uuid' };
      
      Product.findOne.mockRejectedValue(new Error('Database error'));

      await productController.deleteProduct(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Erreur serveur',
        error: expect.any(Error)

        
      });
    });
  });
  describe('updateProduct', () => {
    it('should update a product successfully', async () => {
      const existingProduct = {
        idProduct: 'test-uuid',
        name: 'Original Product',
        description: 'Original Description',
        price: 99.99,
        stock: 10,
        brand: 'Original Brand',
        category: 'Original Category',
        image: 'original.jpg',
        save: jest.fn() 
      };


      mockRequest.params = { id: 'test-uuid' };
      mockRequest.body = {
        name: 'Updated Product',
        price: 149.99
      };

    
      Product.findOne.mockResolvedValue(existingProduct);

 
      existingProduct.save.mockResolvedValue({
        ...existingProduct,
        ...mockRequest.body
      });


      await productController.updateProduct(mockRequest, mockResponse);


      expect(Product.findOne).toHaveBeenCalledWith({ idProduct: 'test-uuid' });
      expect(existingProduct.save).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Updated Product',
          price: 149.99
        })
      );
    });

    it('should return 404 if product to update not found', async () => {

      mockRequest.params = { id: 'nonexistent-id' };
      mockRequest.body = {
        name: 'Updated Product'
      };
      
    
      Product.findOne.mockResolvedValue(null);

      await productController.updateProduct(mockRequest, mockResponse);

    
      expect(Product.findOne).toHaveBeenCalledWith({ idProduct: 'nonexistent-id' });
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Produit non trouvé.'
      });
    });

    it('should return 500 if update fails', async () => {
      // Setup
      mockRequest.params = { id: 'test-uuid' };
      
      // Mock erreur lors de la recherche
      Product.findOne.mockRejectedValue(new Error('Database error'));


      await productController.updateProduct(mockRequest, mockResponse);

 
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Erreur serveur',
        error: expect.any(Error)
      });
    });
});
describe('createProduct', () => {
    it('should create a product successfully', async () => {
      mockRequest.body = {
        name: 'New Product',
        description: 'Product Description',
        price: 99.99,
        stock: 50,
        brand: 'Test Brand', 
        category: 'Test Category',
        image: 'test.jpg'
      };

      const saveResult = {
        idProduct: 'test-uuid',
        ...mockRequest.body
      };

      const saveMock = jest.fn().mockResolvedValue(saveResult);
      Product.mockImplementation(() => ({
        save: saveMock
      }));

      await productController.createProduct(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(saveResult);
    });

    it('should return 500 if creation fails', async () => {
      mockRequest.body = {
        name: 'New Product',
        description: 'Product Description',
        price: 99.99,
        stock: 50,
        brand: 'Test Brand',
        category: 'Test Category',
        image: 'test.jpg'
      };

      Product.mockImplementation(() => ({
        save: jest.fn().mockRejectedValue(new Error('Save failed'))
      }));

      await productController.createProduct(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Erreur serveur',
        error: expect.any(Error)
      });
    });
});
describe('getProductById', () => {
    it('should get product successfully', async () => {
      const mockProduct = {
        idProduct: 'test-uuid',
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99,
        stock: 10,
        brand: 'Test Brand',
        category: 'Test Category', 
        image: 'test.jpg'
      };
 
      mockRequest.params = { id: 'test-uuid' };
 
      Product.findOne.mockResolvedValue(mockProduct);
 
      await productController.getProductById(mockRequest, mockResponse);
 
      expect(Product.findOne).toHaveBeenCalledWith({ idProduct: 'test-uuid' });
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockProduct);
    });
 
    it('should return 404 if product not found', async () => {
      mockRequest.params = { id: 'nonexistent-id' };
 
      Product.findOne.mockResolvedValue(null);
 
      await productController.getProductById(mockRequest, mockResponse);
 
      expect(Product.findOne).toHaveBeenCalledWith({ idProduct: 'nonexistent-id' });
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Produit non trouvé.'
      });
    });
 
    it('should return 500 if search fails', async () => {
      mockRequest.params = { id: 'test-uuid' };
 
      Product.findOne.mockRejectedValue(new Error('Database error'));
 
      await productController.getProductById(mockRequest, mockResponse);
 
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Erreur serveur',
        error: expect.any(Error)
      });
    });
 });
      });
    