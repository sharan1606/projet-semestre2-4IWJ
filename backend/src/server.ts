import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import cors from 'cors';

dotenv.config();
connectDB();

const app = express();

// Middleware pour accepter les requêtes CORS
app.use(cors());

app.use(express.json());

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
