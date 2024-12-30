"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));

dotenv_1.default.config();
(0, db_1.default)();

const app = (0, express_1.default)();

// Middleware pour accepter les requêtes CORS
app.use((0, cors_1.default)());
app.use(express_1.default.json());

// Connexion à MongoDB
const CONNECTION_URL = process.env.MONGODB_URI || 'mongodb+srv://<username>:<password>@cluster.mongodb.net/challenge_S2?retryWrites=true&w=majority';
mongoose_1.default.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connecté à MongoDB'))
  .catch((error) => console.error('Erreur de connexion à MongoDB:', error));

// Modèle pour les articles
const articleSchema = new mongoose_1.default.Schema({
  name: String,
  price: Number,
  image: String,
});
const Article = mongoose_1.default.model('articles', articleSchema);

// Route pour récupérer les articles
app.get('/api/products', async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Routes pour les utilisateurs
app.use('/api/users', userRoutes_1.default);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
