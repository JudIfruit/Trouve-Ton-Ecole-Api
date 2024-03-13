// Import
const express = require('express'); 
const cors = require('cors');
const connectDB = require('./database/database');
const cookieParser = require('cookie-parser');

// App - Port
const app = express(); 
const port = process.env.PORT || 3000;

const corsOptions = {
    origin: "http://localhost:8080",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders: "Content-Type, Authorization, X-Requested-With"
}

// Enable CORS for all origins
app.use(cors(corsOptions));
app.use(cookieParser());
// Middleware pour parser les requêtes JSON
app.use(express.json()); 

// Importez les routers
const ecolesRouter = require('./routes/ecoles');
const authRouter = require('./routes/auth');

// Utilisez les routers
app.use('/ecoles', ecolesRouter);
app.use('/auth', authRouter);

// Status de l'API
app.get('/', (req, res) => {
    res.send('API démarrée Julien!');
});

// Connexion à la DB et démarrage du serveur
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
});
