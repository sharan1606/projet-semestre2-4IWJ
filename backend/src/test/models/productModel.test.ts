import mongoose from 'mongoose';
import Product from '../../models/productModel'; // Assurez-vous du bon chemin d'importation

describe('Product Model', () => {
  // Connexion à une base de données MongoDB en mémoire pour les tests
  beforeAll(async () => {
    const url = 'mongodb://127.0.0.1/product_test'; // Ou utiliser un in-memory database comme MongoMemoryServer
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    // Fermer la connexion après tous les tests
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    // Nettoyer les collections avant chaque test pour éviter les interférences entre les tests
    await Product.deleteMany({});
  });

  test('should create a new product', async () => {
    const productData = {
      idProduct: 'prod123',
      name: 'Product 1',
      description: 'Product description',
      price: 100,
      stock: 50,
      brand: 'Brand 1',
      category: 'Category 1',
      image: 'image_url',
      date_add: new Date(),
    };

    const product = new Product(productData);
    const savedProduct = await product.save();

    expect(savedProduct._id).toBeDefined(); // Vérifier que le produit a bien été sauvegardé et qu'il a un _id
    expect(savedProduct.name).toBe(productData.name); // Vérifier que le nom est correctement sauvegardé
    expect(savedProduct.price).toBe(productData.price); // Vérifier que le prix est correct
    expect(savedProduct.stock).toBe(productData.stock); // Vérifier que le stock est correct
  });

  test('should fail to create a product without required fields', async () => {
    const productData = {
      // Missing some required fields like 'name', 'price', etc.
      idProduct: 'prod124',
      description: 'Product description',
      brand: 'Brand 2',
      category: 'Category 2',
      image: 'image_url',
      date_add: new Date(),
    };

    const product = new Product(productData);

    // Attendre que l'erreur soit levée
    let error;
    try {
      await product.save();
    } catch (e) {
      error = e;
    }

    // Vérifier qu'une erreur est levée lors de la tentative d'enregistrement d'un produit invalide
    expect(error).toBeDefined();
    expect(error.errors.name).toBeDefined(); // Vérifier que l'erreur est sur le champ 'name'
    expect(error.errors.price).toBeDefined(); // Vérifier que l'erreur est sur le champ 'price'
  });

  test('should find a product by id', async () => {
    const productData = {
      idProduct: 'prod125',
      name: 'Product 2',
      description: 'Product description 2',
      price: 200,
      stock: 30,
      brand: 'Brand 3',
      category: 'Category 3',
      image: 'image_url_2',
      date_add: new Date(),
    };

    const product = new Product(productData);
    const savedProduct = await product.save();

    // Chercher le produit par son id
    const foundProduct = await Product.findById(savedProduct._id);

    expect(foundProduct).not.toBeNull(); // Vérifier que le produit est trouvé
    expect(foundProduct?.idProduct).toBe(productData.idProduct); // Vérifier que l'id correspond
  });

  test('should delete a product by id', async () => {
    const productData = {
      idProduct: 'prod126',
      name: 'Product 3',
      description: 'Product description 3',
      price: 150,
      stock: 40,
      brand: 'Brand 4',
      category: 'Category 4',
      image: 'image_url_3',
      date_add: new Date(),
    };

    const product = new Product(productData);
    const savedProduct = await product.save();

    // Supprimer le produit
    const result = await Product.deleteOne({ _id: savedProduct._id });

    // Vérifier que le produit a bien été supprimé
    expect(result.deletedCount).toBe(1);
  });
});
