import mongoose from 'mongoose';
import User from './models/userModel';
import Accessory from './models/accessoryModel';
import Category from './models/categoryModel';
import Order from './models/orderModel';
import OrderDetail from './models/orderDetailModel';
import Basket from './models/basketModel';
import Article from './models/articleModel';
import Payment from './models/paymentModel';
import Address from './models/addressModel';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    // Insertion d'un document dans chaque collection pour les créer
    await User.create({ lastname: 'John', firstname: 'Doe', email: 'jdoe@example.com', password: 'password1234&', is_admin: false });
    await Accessory.create({ name: 'Chargeur Samsung', description: 'Chargeur Samsung Type-C compatible appareil Android et nouveau Iphone (iphone 15, iphone 16)', price: 10, stock: 5, color: 'Rouge', material: 'Plastique', compatibility: 'Type C', id_categorie: new mongoose.Types.ObjectId() });
    await Category.create({ name: 'Chargeur' });
    await Order.create({ order_date: new Date(), total_amount: 100, status: 'En attente', id_user: new mongoose.Types.ObjectId() });
    await OrderDetail.create({ quantity: 2, unit_price: 50, id_accessory: new mongoose.Types.ObjectId(), id_order: new mongoose.Types.ObjectId() });
    await Basket.create({ id_user: new mongoose.Types.ObjectId() });
    await Article.create({ quantity: 1, id_accessory: new mongoose.Types.ObjectId(), id_basket: new mongoose.Types.ObjectId() });
    await Payment.create({ payment_date: new Date(), amount: 100, average_payment: 'CB', payment_status: 'Payé', id_order: new mongoose.Types.ObjectId() });
    await Address.create({ address_l1: '1 avenue Foche', address_l2: 'digicode : 1234, 3ème étage', city: 'Paris', zip_code: '75001', country: 'France', id_user: new mongoose.Types.ObjectId() });

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

const runSeed = async () => {
  await connectDB();
  await seedDatabase();
};

runSeed();