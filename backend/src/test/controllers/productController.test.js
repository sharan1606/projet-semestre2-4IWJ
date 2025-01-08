import request from 'supertest';
import { app } from '../app'; // Supposons que votre serveur Express est dans `app.ts`
import Product from '../models/productModel';
import { IProduct } from '../models/productModel';

// Nous mockons mongoose et les méthodes liées à Product
jest.mock('../models/productModel'); // Ceci va mocker toute la classe Product

describe('Product Controller Tests', () => {
  let mockProduct: IProduct;

  beforeEach(() => {
    // Initialisation d'un produit fictif
    mockProduct = {
      idProduct: '1',
      name: 'Test Product',
      description: 'A test product',
      price: 100,
      stock: 50,
      brand: 'TestBrand',
      category: 'TestCategory',
      image: 'test-image.jpg',
      date_add: new Date(),
    } as unknown as IProduct;
  });

  afterEach(() => {
    jest.clearAllMocks(); // Réinitialise les mocks après chaque test
  });

  it('should fetch all products successfully', async () => {
    // Mock de la méthode find() de Product
    (Product.find as jest.Mock).mockResolvedValue([mockProduct]);

    const response = await request(app).get('/api/products'); // En supposant que cette route existe

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1); // Nous avons mocké un produit
    expect(response.body[0].name).toBe(mockProduct.name);
  });

  it('should fetch a product by ID successfully', async () => {
    // Mock de la méthode findOne()
    (Product.findOne as jest.Mock).mockResolvedValue(mockProduct);

    const response = await request(app).get(`/api/products/${mockProduct.idProduct}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(mockProduct.name);
  });

  it('should return 404 if product not found', async () => {
    // Mock de la méthode findOne()
    (Product.findOne as jest.Mock).mockResolvedValue(null);

    const response = await request(app).get(`/api/products/invalid-id`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Produit non trouvé.');
  });

  it('should create a product successfully', async () => {
    // Mock de la méthode save()
    (Product.prototype.save as jest.Mock).mockResolvedValue(mockProduct);

    const response = await request(app)
      .post('/api/products')
      .send({
        name: 'New Product',
        description: 'New description',
        price: 100,
        stock: 50,
        brand: 'NewBrand',
        category: 'NewCategory',
        image: 'new-image.jpg',
      });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('New Product');
  });

  it('should return 500 if product creation fails', async () => {
    // Mock pour simuler une erreur lors de la sauvegarde
    (Product.prototype.save as jest.Mock).mockRejectedValue(new Error('Error'));

    const response = await request(app)
      .post('/api/products')
      .send({
        name: 'New Product',
        description: 'New description',
        price: 100,
        stock: 50,
        brand: 'NewBrand',
        category: 'NewCategory',
        image: 'new-image.jpg',
      });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Erreur serveur');
  });

  it('should update a product successfully', async () => {
    // Mock pour findOne et save
    (Product.findOne as jest.Mock).mockResolvedValue(mockProduct);
    (Product.prototype.save as jest.Mock).mockResolvedValue(mockProduct);

    const response = await request(app)
      .put(`/api/products/${mockProduct.idProduct}`)
      .send({
        name: 'Updated Product',
        description: 'Updated description',
        price: 200,
        stock: 100,
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Updated Product');
  });

  it('should return 404 if product to update not found', async () => {
    // Mock pour simuler un produit non trouvé
    (Product.findOne as jest.Mock).mockResolvedValue(null);

    const response = await request(app)
      .put(`/api/products/invalid-id`)
      .send({
        name: 'Updated Product',
      });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Produit non trouvé.');
  });

  it('should delete a product successfully', async () => {
    // Mock pour findOne et deleteOne
    (Product.findOne as jest.Mock).mockResolvedValue(mockProduct);
    (Product.deleteOne as jest.Mock).mockResolvedValue({ deletedCount: 1 });

    const response = await request(app).delete(`/api/products/${mockProduct.idProduct}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Produit supprimé avec succès.');
  });

  it('should return 404 if product to delete not found', async () => {
    // Mock pour simuler un produit non trouvé
    (Product.findOne as jest.Mock).mockResolvedValue(null);

    const response = await request(app).delete(`/api/products/invalid-id`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Produit non trouvé.');
  });
});