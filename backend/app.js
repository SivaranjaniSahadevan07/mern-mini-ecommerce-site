//app.js
// const express = require('express');
// const app = express();
// const dotenv = require('dotenv');
// const path = require('path');
// const cors = require('cors');
// const connectDatabase = require('./config/connectDatabase');
// dotenv.config({path: path.join(__dirname, 'config', 'config.env')})

// const products = require('./routes/product');
// const orders = require('./routes/order');

// connectDatabase();

// app.use(express.json());
// app.use(cors());
// app.use('/api/v1',products);
// app.use('/api/v1',orders);

// app.listen(process.env.PORT, () => {
//     console.log(`Server listening to Port ${process.env.PORT} in ${process.env.NODE_ENV}`)
// });

const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const connectDatabase = require('./config/connectDatabase');

// Load environment variables from config.env
dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

// Import routes
const products = require('./routes/product');
const orders = require('./routes/order');

// Connect to the database
connectDatabase();

// Middleware to parse JSON
app.use(express.json());

// Enable CORS for all origins
app.use(cors());

// Optionally, enable CORS only for specific origins (for security in production)
// const corsOptions = {
//     origin: 'https://webmaxstore-ecommerce-frontend.vercel.app',
//     optionsSuccessStatus: 200
// };
// app.use(cors(corsOptions));

// Mount the routes
app.use('/api/v1/products', products);  // Explicitly map 'products' to /api/v1/products
app.use('/api/v1/orders', orders);      // Explicitly map 'orders' to /api/v1/orders

// Fallback route for invalid paths (helps avoid 404 errors in case of undefined routes)
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Resource not found"
    });
});

// Error handling middleware for catching errors and giving useful responses
app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
});

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server listening on Port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});
