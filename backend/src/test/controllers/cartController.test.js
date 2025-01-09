const Cart = require("../../../dist/models/cartModel").default;
const Product = require("../../../dist/models/productModel").default;
const cartController = require("../../../dist/controllers/cartController");

jest.mock("../../../dist/models/cartModel");
jest.mock("../../../dist/models/productModel");

describe("Cart Controller", () => {
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

describe("addToCart", () => {
    it("should add a product to the cart", async () => {
      mockRequest.body = { idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2", idProduct: "cbb1d8b3-9f59-40f5-aa42-83ffdbca5949", quantity: 2 };

      const mockProduct = { idProduct: "cbb1d8b3-9f59-40f5-aa42-83ffdbca5949", price: 50 };
      Product.findOne.mockResolvedValue(mockProduct);

      const mockCart = {
        idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2",
        items: [],
        total: 0,
        save: jest.fn().mockResolvedValue(true),
      };
      Cart.findOne.mockResolvedValue(null);
      Cart.mockImplementation(() => mockCart);

      await cartController.addToCart(mockRequest, mockResponse);

      expect(Product.findOne).toHaveBeenCalledWith({ idProduct: "cbb1d8b3-9f59-40f5-aa42-83ffdbca5949" });
      expect(Cart.findOne).toHaveBeenCalledWith({ idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2" });
      expect(mockCart.save).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockCart);
    });

    it("should return 404 if product is not found", async () => {
      mockRequest.body = { idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2", idProduct: "cbb1d8b3-9f59-40f5-aa42-83ffdbca5949", quantity: 2 };

      Product.findOne.mockResolvedValue(null);

      await cartController.addToCart(mockRequest, mockResponse);

      expect(Product.findOne).toHaveBeenCalledWith({ idProduct: "cbb1d8b3-9f59-40f5-aa42-83ffdbca5949" });
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: "Produit non trouvé." });
    });

    it("should return 500 on server error", async () => {
      mockRequest.body = { idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2", idProduct: "cbb1d8b3-9f59-40f5-aa42-83ffdbca5949", quantity: 2 };

      Product.findOne.mockRejectedValue(new Error("Database error"));

      await cartController.addToCart(mockRequest, mockResponse);

      expect(Product.findOne).toHaveBeenCalledWith({ idProduct: "cbb1d8b3-9f59-40f5-aa42-83ffdbca5949" });
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Erreur serveur",
        error: expect.any(Error),
      });
    });
  });

describe("getCart", () => {
    it("should return the cart with populated items", async () => {
      mockRequest.params = { idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2" };

      const mockCart = {
        idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2",
        items: [
          { idProduct: "cbb1d8b3-9f59-40f5-aa42-83ffdbca5949", quantity: 2 },
        ],
        total: 100,
      };

      const mockProduct = { idProduct: "cbb1d8b3-9f59-40f5-aa42-83ffdbca5949", name: "Product 1", price: 50, image: "product1.jpg" };

      Cart.findOne.mockResolvedValue(mockCart);
      Product.findOne.mockResolvedValue(mockProduct);

      await cartController.getCart(mockRequest, mockResponse);

      expect(Cart.findOne).toHaveBeenCalledWith({ idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2" });
      expect(Product.findOne).toHaveBeenCalledWith({ idProduct: "cbb1d8b3-9f59-40f5-aa42-83ffdbca5949" });
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2",
        items: [
          {
            idProduct: "cbb1d8b3-9f59-40f5-aa42-83ffdbca5949",
            quantity: 2,
            name: "Product 1",
            price: 50,
            image: "product1.jpg",
          },
        ],
        total: 100,
      });
    });

    it("should return 404 if cart is not found", async () => {
      mockRequest.params = { idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2" };

      Cart.findOne.mockResolvedValue(null);

      await cartController.getCart(mockRequest, mockResponse);

      expect(Cart.findOne).toHaveBeenCalledWith({ idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2" });
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: "Panier non trouvé." });
    });

    it("should return 500 on server error", async () => {
      mockRequest.params = { idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2" };

      Cart.findOne.mockRejectedValue(new Error("Database error"));

      await cartController.getCart(mockRequest, mockResponse);

      expect(Cart.findOne).toHaveBeenCalledWith({ idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2" });
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Erreur serveur",
        error: expect.any(Error),
      });
    });
  });

describe("updateCartItem", () => {
    it("should update the quantity of an item in the cart", async () => {
      mockRequest.body = { idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2", idProduct: "cbb1d8b3-9f59-40f5-aa42-83ffdbca5949", quantity: 3 };

      const mockCart = {
        idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2",
        items: [{ idProduct: "cbb1d8b3-9f59-40f5-aa42-83ffdbca5949", quantity: 2 }],
        save: jest.fn().mockResolvedValue(true),
      };

      const mockProduct = { idProduct: "cbb1d8b3-9f59-40f5-aa42-83ffdbca5949", price: 50 };

      Cart.findOne.mockResolvedValue(mockCart);
      Product.findOne.mockResolvedValue(mockProduct);

      await cartController.updateCartItem(mockRequest, mockResponse);

      expect(Cart.findOne).toHaveBeenCalledWith({ idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2" });
      expect(mockCart.save).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockCart);
    });

    it("should return 404 if cart is not found", async () => {
      mockRequest.body = { idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2", idProduct: "cbb1d8b3-9f59-40f5-aa42-83ffdbca5949", quantity: 3 };

      Cart.findOne.mockResolvedValue(null);

      await cartController.updateCartItem(mockRequest, mockResponse);

      expect(Cart.findOne).toHaveBeenCalledWith({ idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2" });
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: "Panier non trouvé." });
    });
  });

describe("removeFromCart", () => {
    it("should remove an item from the cart", async () => {
      mockRequest.body = { idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2", idProduct: "cbb1d8b3-9f59-40f5-aa42-83ffdbca5949" };

      const mockCart = {
        idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2",
        items: [{ idProduct: "cbb1d8b3-9f59-40f5-aa42-83ffdbca5949", quantity: 2 }],
        save: jest.fn().mockResolvedValue(true),
      };

      Cart.findOne.mockResolvedValue(mockCart);

      await cartController.removeFromCart(mockRequest, mockResponse);

      expect(Cart.findOne).toHaveBeenCalledWith({ idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2" });
      expect(mockCart.save).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockCart);
    });

    it("should return 404 if cart is not found", async () => {
      mockRequest.body = { idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2", idProduct: "cbb1d8b3-9f59-40f5-aa42-83ffdbca5949" };

      Cart.findOne.mockResolvedValue(null);

      await cartController.removeFromCart(mockRequest, mockResponse);

      expect(Cart.findOne).toHaveBeenCalledWith({ idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2" });
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: "Panier non trouvé." });
    });
  });

describe("clearCart", () => {
    it("should clear all items in the cart", async () => {
      mockRequest.params = { idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2" };

      const mockCart = {
        idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2",
        items: [{ idProduct: "cbb1d8b3-9f59-40f5-aa42-83ffdbca5949", quantity: 2 }],
        save: jest.fn().mockResolvedValue(true),
      };

      Cart.findOne.mockResolvedValue(mockCart);

      await cartController.clearCart(mockRequest, mockResponse);

      expect(Cart.findOne).toHaveBeenCalledWith({ idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2" });
      expect(mockCart.save).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: "Panier vidé avec succès." });
    });

    it("should return 404 if cart is not found", async () => {
      mockRequest.params = { idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2" };

      Cart.findOne.mockResolvedValue(null);

      await cartController.clearCart(mockRequest, mockResponse);

      expect(Cart.findOne).toHaveBeenCalledWith({ idUser: "8ac556e4-b9c7-458f-a402-12119cbbceb2" });
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: "Panier non trouvé." });
    });
  });
});
