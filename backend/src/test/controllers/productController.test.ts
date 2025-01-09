import request from 'supertest';
import { app } from '../../server'; // Le fichier app.ts où votre serveur Express est configuré
import Product from '../../models/productModel';
import { IProduct } from '../../models/productModel';

// Mock de la méthode Product pour simuler la base de données
jest.mock('../../models/productModel'); // Mock de la classe Product

describe('Product Controller Tests', () => {
  let mockProduct: IProduct;

  beforeAll(() => {
    // Configuration de votre base de données si nécessaire
    // mongoose.connect('mongodb://127.0.0.1/product_test', { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    // Fermer la connexion si nécessaire
    // await mongoose.connection.close();
  });

  beforeEach(() => {
    // Initialisation d'un produit fictif avant chaque test
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
    } as IProduct;
  });

  afterEach(() => {
    jest.clearAllMocks(); // Réinitialiser les mocks après chaque test
  });

  it('should fetch all products successfully', async () => {
    (Product.find as jest.Mock).mockResolvedValue([mockProduct]); // Mock de la méthode find() de Product

    const response = await request(app).get('/api/products'); // En supposant que cette route existe

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1); // Un produit a été mocké
    expect(response.body[0].name).toBe(mockProduct.name);
  });

  it('should fetch a product by ID successfully', async () => {
    (Product.findOne as jest.Mock).mockResolvedValue(mockProduct); // Mock de la méthode findOne()

    const response = await request(app).get(`/api/products/${mockProduct.idProduct}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(mockProduct.name);
  });

  it('should return 404 if product not found', async () => {
    (Product.findOne as jest.Mock).mockResolvedValue(null); // Mock pour simuler un produit non trouvé

    const response = await request(app).get(`/api/products/invalid-id`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Produit non trouvé.');
  });

  it('should create a product successfully', async () => {
    (Product.prototype.save as jest.Mock).mockResolvedValue(mockProduct); // Mock de la méthode save()

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
    (Product.prototype.save as jest.Mock).mockRejectedValue(new Error('Error')); // Mock pour simuler une erreur

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
    (Product.findOne as jest.Mock).mockResolvedValue(mockProduct); // Mock pour findOne
    (Product.prototype.save as jest.Mock).mockResolvedValue(mockProduct); // Mock pour save()

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
    (Product.findOne as jest.Mock).mockResolvedValue(null); // Mock pour simuler un produit non trouvé

    const response = await request(app)
      .put(`/api/products/invalid-id`)
      .send({
        name: 'Updated Product',
      });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Produit non trouvé.');
  });

  it('should delete a product successfully', async () => {
    (Product.findOne as jest.Mock).mockResolvedValue(mockProduct); // Mock pour findOne
    (Product.deleteOne as jest.Mock).mockResolvedValue({ deletedCount: 1 }); // Mock pour deleteOne

    const response = await request(app).delete(`/api/products/${mockProduct.idProduct}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Produit supprimé avec succès.');
  });

  it('should return 404 if product to delete not found', async () => {
    (Product.findOne as jest.Mock).mockResolvedValue(null); // Mock pour simuler un produit non trouvé

    const response = await request(app).delete(`/api/products/invalid-id`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Produit non trouvé.');
  });
});
