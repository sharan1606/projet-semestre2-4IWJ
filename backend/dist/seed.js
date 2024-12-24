"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userModel_1 = __importDefault(require("./models/userModel"));
const accessoryModel_1 = __importDefault(require("./models/accessoryModel"));
const categoryModel_1 = __importDefault(require("./models/categoryModel"));
const orderModel_1 = __importDefault(require("./models/orderModel"));
const orderDetailModel_1 = __importDefault(require("./models/orderDetailModel"));
const basketModel_1 = __importDefault(require("./models/basketModel"));
const articleModel_1 = __importDefault(require("./models/articleModel"));
const paymentModel_1 = __importDefault(require("./models/paymentModel"));
const addressModel_1 = __importDefault(require("./models/addressModel"));
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
    }
    catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
});
const seedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Insertion d'un document dans chaque collection pour les créer
        yield userModel_1.default.create({ lastname: 'John', firstname: 'Doe', email: 'jdoe@example.com', password: 'password1234&', is_admin: false });
        yield accessoryModel_1.default.create({ name: 'Chargeur Samsung', description: 'Chargeur Samsung Type-C compatible appareil Android et nouveau Iphone (iphone 15, iphone 16)', price: 10, stock: 5, color: 'Rouge', material: 'Plastique', compatibility: 'Type C', id_categorie: new mongoose_1.default.Types.ObjectId() });
        yield categoryModel_1.default.create({ name: 'Chargeur' });
        yield orderModel_1.default.create({ order_date: new Date(), total_amount: 100, status: 'En attente', id_user: new mongoose_1.default.Types.ObjectId() });
        yield orderDetailModel_1.default.create({ quantity: 2, unit_price: 50, id_accessory: new mongoose_1.default.Types.ObjectId(), id_order: new mongoose_1.default.Types.ObjectId() });
        yield basketModel_1.default.create({ id_user: new mongoose_1.default.Types.ObjectId() });
        yield articleModel_1.default.create({ quantity: 1, id_accessory: new mongoose_1.default.Types.ObjectId(), id_basket: new mongoose_1.default.Types.ObjectId() });
        yield paymentModel_1.default.create({ payment_date: new Date(), amount: 100, average_payment: 'CB', payment_status: 'Payé', id_order: new mongoose_1.default.Types.ObjectId() });
        yield addressModel_1.default.create({ address_l1: '1 avenue Foche', address_l2: 'digicode : 1234, 3ème étage', city: 'Paris', zip_code: '75001', country: 'France', id_user: new mongoose_1.default.Types.ObjectId() });
        console.log('Database seeded successfully');
    }
    catch (error) {
        console.error('Error seeding database:', error);
    }
    finally {
        mongoose_1.default.connection.close();
    }
});
const runSeed = () => __awaiter(void 0, void 0, void 0, function* () {
    yield connectDB();
    yield seedDatabase();
});
runSeed();
