const express = require('express');
const router = express.Router();
const connectToDatabase = require('../models/db');

// Search for gifts with multi-filter support
router.get('/', async (req, res, next) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("gifts");
        let query = {};

        // Name filter: partial, case-insensitive match
        if (req.query.name && req.query.name.trim() !== '') {
            query.name = { $regex: req.query.name, $options: "i" };
        }

        // Category filter
        if (req.query.category) {
            query.category = req.query.category;
        }

        // Condition filter
        if (req.query.condition) {
            query.condition = req.query.condition;
        }

        // Age filter (less than or equal)
        if (req.query.age_years) {
            query.age_years = { $lte: parseInt(req.query.age_years, 10) };
        }

        const gifts = await collection.find(query).toArray();
        res.json(gifts);
    } catch (e) {
        next(e);
    }
});

module.exports = router;
