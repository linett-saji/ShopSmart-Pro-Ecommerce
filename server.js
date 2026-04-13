const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

// 1. MIDDLEWARE
app.use(express.json()); // Allows the server to understand JSON
app.use(cors()); // CRITICAL: Allows your React app (port 3000) to talk to this server (port 5000)

// 2. STATIC FOLDER FOR IMAGES
// This makes the 'uploads' folder public so your website can display the laptop photos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 3. ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// 4. DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/shopsmart-pro')
    .then(() => console.log('✅ MongoDB Connected Successfully'))
    .catch(err => console.log('❌ MongoDB Connection Error:', err));

// 5. SERVER INITIALIZATION
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is sprinting on port ${PORT}`);
    console.log(`📂 Image path: http://localhost:${PORT}/uploads/`);
});