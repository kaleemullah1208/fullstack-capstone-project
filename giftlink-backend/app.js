/*jshint esversion: 8 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pinoHttp = require('pino-http');
const logger = require('./logger');
const connectToDatabase = require('./models/db');
const { loadData } = require("./util/import-mongo/index");

const app = express();
app.use(cors());
const port = process.env.PORT || 3060;

// Connect to MongoDB
connectToDatabase()
    .then(async () => {
        logger.info('Connected to DB');
        await loadData();
    })
    .catch((e) => console.error('Failed to connect to DB', e));

app.use(express.json());
app.use(pinoHttp({ logger }));

// Route files
const giftRoutes = require('./routes/giftRoutes');
const authRoutes = require('./routes/authRoutes');
const searchRoutes = require('./routes/searchRoutes');

// Use Routes
app.use('/api/gifts', giftRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/search', searchRoutes);

// Root route
app.get("/", (req, res) => {
    res.send("Inside the server");
});

// Global Error Handler
app.use((err, req, res, next) => {
    logger.error(err);
    res.status(500).send('Internal Server Error');
});

app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
});

module.exports = app;
